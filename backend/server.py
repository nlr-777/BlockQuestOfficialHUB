from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import re


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Newsletter Models
class NewsletterSubscriber(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    subscribed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    source: str = "website"

class NewsletterSubscribeRequest(BaseModel):
    email: str

class NewsletterSubscribeResponse(BaseModel):
    success: bool
    message: str

# Email validation helper
def is_valid_email(email: str) -> bool:
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Newsletter endpoint
@api_router.post("/newsletter/subscribe", response_model=NewsletterSubscribeResponse)
async def subscribe_newsletter(request: NewsletterSubscribeRequest):
    email = request.email.strip().lower()
    
    # Validate email
    if not email or not is_valid_email(email):
        raise HTTPException(status_code=400, detail="Please enter a valid email address")
    
    # Check if already subscribed
    existing = await db.newsletter_subscribers.find_one({"email": email}, {"_id": 0})
    if existing:
        return NewsletterSubscribeResponse(
            success=True,
            message="You're already subscribed! Thanks for being part of the BlockQuest crew! 🎮"
        )
    
    # Create subscriber
    subscriber = NewsletterSubscriber(email=email)
    doc = subscriber.model_dump()
    doc['subscribed_at'] = doc['subscribed_at'].isoformat()
    
    await db.newsletter_subscribers.insert_one(doc)
    
    logger.info(f"New newsletter subscriber: {email}")
    
    return NewsletterSubscribeResponse(
        success=True,
        message="Welcome to the BlockQuest crew! 🚀 You'll be the first to know about new chaos!"
    )

@api_router.get("/newsletter/subscribers", response_model=List[NewsletterSubscriber])
async def get_subscribers():
    subscribers = await db.newsletter_subscribers.find({}, {"_id": 0}).to_list(10000)
    for sub in subscribers:
        if isinstance(sub['subscribed_at'], str):
            sub['subscribed_at'] = datetime.fromisoformat(sub['subscribed_at'])
    return subscribers

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()