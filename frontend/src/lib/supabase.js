import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;

// Create Supabase client (only if credentials are available)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return supabase !== null;
};

// Fetch site content by type
export const fetchSiteContent = async (type = null) => {
  if (!supabase) {
    console.warn('Supabase not configured, using fallback data');
    return [];
  }
  
  try {
    let query = supabase.from('site_content').select('*');
    
    if (type) {
      query = query.eq('type', type);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching site content:', error);
    return [];
  }
};

// Fetch videos
export const fetchVideos = () => fetchSiteContent('video');

// Fetch books
export const fetchBooks = () => fetchSiteContent('book');

// Fetch games
export const fetchGames = () => fetchSiteContent('game');

// Subscribe to newsletter
export const subscribeNewsletter = async (email) => {
  if (!supabase) {
    console.warn('Supabase not configured');
    return { success: false, message: 'Newsletter service unavailable' };
  }
  
  try {
    // Check if already subscribed
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();
    
    if (existing) {
      return { 
        success: true, 
        message: "You're already subscribed! Thanks for being part of the BlockQuest crew! 🎮" 
      };
    }
    
    // Insert new subscriber
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ 
        email: email.toLowerCase(),
        created_at: new Date().toISOString()
      });
    
    if (error) throw error;
    
    return { 
      success: true, 
      message: "Welcome to the BlockQuest crew! 🚀 You'll be the first to know about new chaos!" 
    };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return { success: false, message: 'Failed to subscribe. Please try again!' };
  }
};

// Game Stats functions
export const getGameStats = async (userId) => {
  if (!supabase) return null;
  
  try {
    const { data, error } = await supabase
      .from('game_stats')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
    return data;
  } catch (error) {
    console.error('Error fetching game stats:', error);
    return null;
  }
};

export const saveGameStats = async (userId, stats) => {
  if (!supabase) return null;
  
  try {
    const { data: existing } = await supabase
      .from('game_stats')
      .select('id')
      .eq('user_id', userId)
      .single();
    
    const payload = {
      user_id: userId,
      score: stats.score || 0,
      inventory: stats.inventory || { xp: 0, badges: [], faction: null },
      last_played: new Date().toISOString()
    };
    
    if (existing) {
      // Update existing
      const { data, error } = await supabase
        .from('game_stats')
        .update(payload)
        .eq('user_id', userId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } else {
      // Insert new
      const { data, error } = await supabase
        .from('game_stats')
        .insert(payload)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error('Error saving game stats:', error);
    return null;
  }
};

export default supabase;
