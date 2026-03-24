"""
Test suite for BlockQuest Leaderboard and Profile features (Iteration 4)
Tests:
- Profile name setting (GET/PUT /api/profile/{device_id})
- Score submission (POST /api/leaderboard/submit)
- Leaderboard retrieval with real player badges (GET /api/leaderboard)
- Game filter functionality
"""
import pytest
import requests
import os
import uuid
from datetime import datetime

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Test device IDs - prefixed with TEST_ for cleanup
def get_test_device_id():
    return f"TEST_{uuid.uuid4().hex[:12]}"


class TestHealthCheck:
    """Basic API health check"""
    
    def test_api_health(self):
        """Verify API is healthy and database is connected"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert data["database"] == "supabase"
        print("✓ API health check passed")


class TestProfileEndpoints:
    """Profile display name management tests"""
    
    def test_get_profile_new_device(self):
        """GET /api/profile/{device_id} returns empty display_name for new device"""
        device_id = get_test_device_id()
        response = requests.get(f"{BASE_URL}/api/profile/{device_id}")
        assert response.status_code == 200
        data = response.json()
        assert data["device_id"] == device_id
        assert data["display_name"] == ""
        print(f"✓ GET profile for new device returns empty name")
    
    def test_set_profile_name(self):
        """PUT /api/profile/{device_id} sets display name"""
        device_id = get_test_device_id()
        test_name = "TestExplorer123"
        
        # Set the name
        response = requests.put(
            f"{BASE_URL}/api/profile/{device_id}",
            json={"display_name": test_name}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert data["display_name"] == test_name
        print(f"✓ PUT profile sets display name: {test_name}")
        
        # Verify it persists
        get_response = requests.get(f"{BASE_URL}/api/profile/{device_id}")
        assert get_response.status_code == 200
        get_data = get_response.json()
        assert get_data["display_name"] == test_name
        print(f"✓ GET profile returns persisted name: {test_name}")
    
    def test_update_profile_name(self):
        """PUT /api/profile/{device_id} updates existing display name"""
        device_id = get_test_device_id()
        
        # Set initial name
        requests.put(
            f"{BASE_URL}/api/profile/{device_id}",
            json={"display_name": "InitialName"}
        )
        
        # Update name
        new_name = "UpdatedName"
        response = requests.put(
            f"{BASE_URL}/api/profile/{device_id}",
            json={"display_name": new_name}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["display_name"] == new_name
        
        # Verify update persisted
        get_response = requests.get(f"{BASE_URL}/api/profile/{device_id}")
        assert get_response.json()["display_name"] == new_name
        print(f"✓ Profile name update works")
    
    def test_profile_name_truncation(self):
        """PUT /api/profile/{device_id} truncates name to 20 chars"""
        device_id = get_test_device_id()
        long_name = "ThisNameIsWayTooLongForTheLimit"
        
        response = requests.put(
            f"{BASE_URL}/api/profile/{device_id}",
            json={"display_name": long_name}
        )
        assert response.status_code == 200
        data = response.json()
        assert len(data["display_name"]) <= 20
        print(f"✓ Profile name truncated to 20 chars")
    
    def test_profile_empty_name_rejected(self):
        """PUT /api/profile/{device_id} rejects empty name"""
        device_id = get_test_device_id()
        
        response = requests.put(
            f"{BASE_URL}/api/profile/{device_id}",
            json={"display_name": "   "}  # whitespace only
        )
        assert response.status_code == 400
        print(f"✓ Empty profile name rejected with 400")


class TestScoreSubmission:
    """Score submission to leaderboard tests"""
    
    def test_submit_score_success(self):
        """POST /api/leaderboard/submit creates leaderboard entry"""
        device_id = get_test_device_id()
        
        response = requests.post(
            f"{BASE_URL}/api/leaderboard/submit",
            json={
                "device_id": device_id,
                "game": "Retro Arcade",
                "score": 7500,
                "player_name": "TestPlayer"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert data["entry"]["game"] == "Retro Arcade"
        assert data["entry"]["score"] == 7500
        assert data["entry"]["player_name"] == "TestPlayer"
        print(f"✓ Score submission successful")
    
    def test_submit_score_appears_on_leaderboard(self):
        """Submitted score appears on leaderboard with is_real=True"""
        device_id = get_test_device_id()
        unique_score = 99999  # High score to appear at top
        
        # Submit score
        requests.post(
            f"{BASE_URL}/api/leaderboard/submit",
            json={
                "device_id": device_id,
                "game": "Mini Money Quest",
                "score": unique_score,
                "player_name": "RealPlayerTest"
            }
        )
        
        # Check leaderboard
        response = requests.get(f"{BASE_URL}/api/leaderboard?game=Mini Money Quest&limit=50")
        assert response.status_code == 200
        data = response.json()
        
        # Find our entry
        our_entry = None
        for entry in data["leaderboard"]:
            if entry["player_name"] == "RealPlayerTest" and entry["score"] == unique_score:
                our_entry = entry
                break
        
        assert our_entry is not None, "Submitted score not found on leaderboard"
        assert our_entry["is_real"] == True, "Real player entry should have is_real=True"
        print(f"✓ Submitted score appears on leaderboard with PLAYER badge (is_real=True)")
    
    def test_submit_higher_score_updates(self):
        """Submitting higher score updates existing entry"""
        device_id = get_test_device_id()
        
        # Submit initial score
        requests.post(
            f"{BASE_URL}/api/leaderboard/submit",
            json={
                "device_id": device_id,
                "game": "Miners",
                "score": 1000,
                "player_name": "ScoreUpdater"
            }
        )
        
        # Submit higher score
        response = requests.post(
            f"{BASE_URL}/api/leaderboard/submit",
            json={
                "device_id": device_id,
                "game": "Miners",
                "score": 2000,
                "player_name": "ScoreUpdater"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["entry"]["score"] == 2000
        print(f"✓ Higher score updates existing entry")
    
    def test_submit_lower_score_keeps_higher(self):
        """Submitting lower score keeps existing higher score"""
        device_id = get_test_device_id()
        
        # Submit high score
        requests.post(
            f"{BASE_URL}/api/leaderboard/submit",
            json={
                "device_id": device_id,
                "game": "NFT Studio",
                "score": 5000,
                "player_name": "HighScorer"
            }
        )
        
        # Try to submit lower score
        response = requests.post(
            f"{BASE_URL}/api/leaderboard/submit",
            json={
                "device_id": device_id,
                "game": "NFT Studio",
                "score": 1000,
                "player_name": "HighScorer"
            }
        )
        assert response.status_code == 200
        data = response.json()
        # Should keep the higher score
        assert data["entry"]["score"] == 5000
        assert "Existing score is higher" in data.get("message", "")
        print(f"✓ Lower score submission keeps existing higher score")


class TestLeaderboardRetrieval:
    """Leaderboard data retrieval tests"""
    
    def test_get_leaderboard_all_games(self):
        """GET /api/leaderboard returns all scores sorted by score desc"""
        response = requests.get(f"{BASE_URL}/api/leaderboard?limit=20")
        assert response.status_code == 200
        data = response.json()
        
        assert "leaderboard" in data
        assert "total" in data
        assert len(data["leaderboard"]) > 0
        
        # Verify sorted by score descending
        scores = [e["score"] for e in data["leaderboard"]]
        assert scores == sorted(scores, reverse=True), "Leaderboard should be sorted by score desc"
        
        # Verify rank assignment
        for i, entry in enumerate(data["leaderboard"]):
            assert entry["rank"] == i + 1
        
        print(f"✓ Leaderboard returns {len(data['leaderboard'])} entries sorted by score")
    
    def test_get_leaderboard_with_game_filter(self):
        """GET /api/leaderboard?game=X filters by game"""
        response = requests.get(f"{BASE_URL}/api/leaderboard?game=Retro Arcade&limit=20")
        assert response.status_code == 200
        data = response.json()
        
        assert data["game_filter"] == "Retro Arcade"
        
        # All entries should be for Retro Arcade
        for entry in data["leaderboard"]:
            assert entry["game"] == "Retro Arcade", f"Expected Retro Arcade, got {entry['game']}"
        
        print(f"✓ Game filter works - all entries are for Retro Arcade")
    
    def test_leaderboard_has_demo_and_real_entries(self):
        """Leaderboard contains both demo (is_real=False) and real (is_real=True) entries"""
        # First submit a real score
        device_id = get_test_device_id()
        requests.post(
            f"{BASE_URL}/api/leaderboard/submit",
            json={
                "device_id": device_id,
                "game": "Wallet Adventure",
                "score": 3000,
                "player_name": "RealPlayer"
            }
        )
        
        # Get leaderboard
        response = requests.get(f"{BASE_URL}/api/leaderboard?limit=50")
        assert response.status_code == 200
        data = response.json()
        
        has_demo = any(not e["is_real"] for e in data["leaderboard"])
        has_real = any(e["is_real"] for e in data["leaderboard"])
        
        assert has_demo, "Leaderboard should have demo entries (is_real=False)"
        assert has_real, "Leaderboard should have real player entries (is_real=True)"
        print(f"✓ Leaderboard contains both demo and real player entries")
    
    def test_get_game_list(self):
        """GET /api/leaderboard/games returns list of games"""
        response = requests.get(f"{BASE_URL}/api/leaderboard/games")
        assert response.status_code == 200
        data = response.json()
        
        assert "games" in data
        assert isinstance(data["games"], list)
        assert len(data["games"]) > 0
        
        # Should include standard games
        expected_games = ["Retro Arcade", "Miners", "Wallet Adventure", "NFT Studio", "Mini Money Quest"]
        for game in expected_games:
            assert game in data["games"], f"Expected {game} in games list"
        
        print(f"✓ Games list returned: {data['games']}")


class TestIntegration:
    """Integration tests for profile + leaderboard flow"""
    
    def test_full_flow_set_name_then_submit_score(self):
        """Full flow: Set profile name -> Submit score -> Verify on leaderboard"""
        device_id = get_test_device_id()
        player_name = "IntegrationTester"
        
        # Step 1: Set profile name
        profile_resp = requests.put(
            f"{BASE_URL}/api/profile/{device_id}",
            json={"display_name": player_name}
        )
        assert profile_resp.status_code == 200
        print(f"  Step 1: Profile name set to {player_name}")
        
        # Step 2: Submit score
        score_resp = requests.post(
            f"{BASE_URL}/api/leaderboard/submit",
            json={
                "device_id": device_id,
                "game": "Retro Arcade",
                "score": 8888,
                "player_name": player_name
            }
        )
        assert score_resp.status_code == 200
        print(f"  Step 2: Score 8888 submitted for Retro Arcade")
        
        # Step 3: Verify on leaderboard
        lb_resp = requests.get(f"{BASE_URL}/api/leaderboard?game=Retro Arcade&limit=50")
        assert lb_resp.status_code == 200
        
        entries = lb_resp.json()["leaderboard"]
        our_entry = next((e for e in entries if e["player_name"] == player_name and e["score"] == 8888), None)
        
        assert our_entry is not None, "Entry not found on leaderboard"
        assert our_entry["is_real"] == True
        print(f"  Step 3: Entry found on leaderboard with PLAYER badge")
        print(f"✓ Full integration flow passed")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
