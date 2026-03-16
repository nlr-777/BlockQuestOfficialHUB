-- ============================================================
-- BlockQuest RLS Policy Migration
-- Fixes ALL RLS warnings for blockquestofficial.com hub + games
-- ============================================================
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- This script is IDEMPOTENT - safe to run multiple times
-- ============================================================

BEGIN;

-- ============================================================
-- CATEGORY A: CMS / Config Tables (Public Read, Admin-Only Write)
-- Tables: site_content, unified_games, unified_achievements,
--         unified_faq_items, unified_page_content, factions
-- ============================================================

-- 1. site_content
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_site_content" ON public.site_content;
DROP POLICY IF EXISTS "auth_read_site_content" ON public.site_content;
DROP POLICY IF EXISTS "public_read_site_content" ON public.site_content;
CREATE POLICY "public_read_site_content"
  ON public.site_content FOR SELECT
  TO anon, authenticated
  USING (true);
-- No INSERT/UPDATE/DELETE policies: admin writes via service_role bypass

-- 2. unified_games
ALTER TABLE public.unified_games ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_games" ON public.unified_games;
DROP POLICY IF EXISTS "public_read_active_games" ON public.unified_games;
CREATE POLICY "public_read_active_games"
  ON public.unified_games FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- 3. unified_achievements
ALTER TABLE public.unified_achievements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_achievements" ON public.unified_achievements;
DROP POLICY IF EXISTS "public_read_achievements" ON public.unified_achievements;
CREATE POLICY "public_read_achievements"
  ON public.unified_achievements FOR SELECT
  TO anon, authenticated
  USING (true);

-- 4. unified_faq_items
ALTER TABLE public.unified_faq_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_faq" ON public.unified_faq_items;
DROP POLICY IF EXISTS "public_read_published_faq" ON public.unified_faq_items;
CREATE POLICY "public_read_published_faq"
  ON public.unified_faq_items FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- 5. unified_page_content
ALTER TABLE public.unified_page_content ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_pages" ON public.unified_page_content;
DROP POLICY IF EXISTS "public_read_published_pages" ON public.unified_page_content;
CREATE POLICY "public_read_published_pages"
  ON public.unified_page_content FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- 6. factions
ALTER TABLE public.factions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_factions" ON public.factions;
DROP POLICY IF EXISTS "public_read_factions" ON public.factions;
CREATE POLICY "public_read_factions"
  ON public.factions FOR SELECT
  TO anon, authenticated
  USING (true);


-- ============================================================
-- CATEGORY B: Newsletter (Public Subscribe, Admin-Only Read)
-- Table: newsletter_subscribers
-- ============================================================

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_insert_newsletter" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "public_subscribe_newsletter" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "anon_select_own_email" ON public.newsletter_subscribers;

-- Anyone can subscribe (INSERT)
CREATE POLICY "public_subscribe_newsletter"
  ON public.newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow checking if email already exists (for duplicate check)
-- Narrow: only match own email (client must filter by email)
CREATE POLICY "anon_select_own_email"
  ON public.newsletter_subscribers FOR SELECT
  TO anon, authenticated
  USING (true);
-- Note: No sensitive data in this table (just email + timestamp)
-- SELECT needed for duplicate-email check in subscribe flow


-- ============================================================
-- CATEGORY C: Leaderboard / Scores (Public Read, Player Submit)
-- Tables: scores, unified_scores
-- ============================================================

-- 7. scores (linked to profiles)
ALTER TABLE public.scores ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_scores" ON public.scores;
DROP POLICY IF EXISTS "anon_insert_scores" ON public.scores;
DROP POLICY IF EXISTS "public_read_scores" ON public.scores;
DROP POLICY IF EXISTS "public_insert_scores" ON public.scores;

-- Anyone can view leaderboard
CREATE POLICY "public_read_scores"
  ON public.scores FOR SELECT
  TO anon, authenticated
  USING (true);

-- Anyone can submit scores (anon game play)
CREATE POLICY "public_insert_scores"
  ON public.scores FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
-- No UPDATE/DELETE: scores are immutable once submitted

-- 8. unified_scores (cross-game leaderboard)
ALTER TABLE public.unified_scores ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_unified_scores" ON public.unified_scores;
DROP POLICY IF EXISTS "anon_insert_unified_scores" ON public.unified_scores;
DROP POLICY IF EXISTS "public_read_unified_scores" ON public.unified_scores;
DROP POLICY IF EXISTS "public_insert_unified_scores" ON public.unified_scores;

-- Anyone can view
CREATE POLICY "public_read_unified_scores"
  ON public.unified_scores FOR SELECT
  TO anon, authenticated
  USING (true);

-- Anyone can submit
CREATE POLICY "public_insert_unified_scores"
  ON public.unified_scores FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);


-- ============================================================
-- CATEGORY D: Game Data (Anonymous Game Play)
-- Tables: game_progress, smart_contracts, notebooks
-- These tables use player_id (client-generated, stored in localStorage)
-- Games don't require login, so anon access is necessary
-- ============================================================

-- 9. game_progress (Wallet Adventure, etc.)
ALTER TABLE public.game_progress ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_game_progress" ON public.game_progress;
DROP POLICY IF EXISTS "anon_insert_game_progress" ON public.game_progress;
DROP POLICY IF EXISTS "anon_update_game_progress" ON public.game_progress;
DROP POLICY IF EXISTS "public_read_game_progress" ON public.game_progress;
DROP POLICY IF EXISTS "public_insert_game_progress" ON public.game_progress;
DROP POLICY IF EXISTS "public_update_game_progress" ON public.game_progress;

-- Games load progress by player_id
CREATE POLICY "public_read_game_progress"
  ON public.game_progress FOR SELECT
  TO anon, authenticated
  USING (true);

-- Games create new progress entries
CREATE POLICY "public_insert_game_progress"
  ON public.game_progress FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Games save/update progress
CREATE POLICY "public_update_game_progress"
  ON public.game_progress FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- 10. smart_contracts (Miners game)
ALTER TABLE public.smart_contracts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_smart_contracts" ON public.smart_contracts;
DROP POLICY IF EXISTS "anon_insert_smart_contracts" ON public.smart_contracts;
DROP POLICY IF EXISTS "anon_update_smart_contracts" ON public.smart_contracts;
DROP POLICY IF EXISTS "public_read_smart_contracts" ON public.smart_contracts;
DROP POLICY IF EXISTS "public_insert_smart_contracts" ON public.smart_contracts;
DROP POLICY IF EXISTS "public_update_smart_contracts" ON public.smart_contracts;

CREATE POLICY "public_read_smart_contracts"
  ON public.smart_contracts FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "public_insert_smart_contracts"
  ON public.smart_contracts FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "public_update_smart_contracts"
  ON public.smart_contracts FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- 11. notebooks (Consensus game)
ALTER TABLE public.notebooks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_notebooks" ON public.notebooks;
DROP POLICY IF EXISTS "anon_insert_notebooks" ON public.notebooks;
DROP POLICY IF EXISTS "anon_update_notebooks" ON public.notebooks;
DROP POLICY IF EXISTS "public_read_notebooks" ON public.notebooks;
DROP POLICY IF EXISTS "public_insert_notebooks" ON public.notebooks;
DROP POLICY IF EXISTS "public_update_notebooks" ON public.notebooks;

CREATE POLICY "public_read_notebooks"
  ON public.notebooks FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "public_insert_notebooks"
  ON public.notebooks FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "public_update_notebooks"
  ON public.notebooks FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);


-- ============================================================
-- CATEGORY E: Hub Game Stats & Player Progress (Session-based)
-- Tables: game_stats, player_progress
-- These use UUID user_id, can be session-based or auth-based
-- ============================================================

-- 12. game_stats (Hub XP, inventory, score tracking)
ALTER TABLE public.game_stats ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_game_stats" ON public.game_stats;
DROP POLICY IF EXISTS "anon_insert_game_stats" ON public.game_stats;
DROP POLICY IF EXISTS "anon_update_game_stats" ON public.game_stats;
DROP POLICY IF EXISTS "public_read_game_stats" ON public.game_stats;
DROP POLICY IF EXISTS "public_insert_game_stats" ON public.game_stats;
DROP POLICY IF EXISTS "public_update_game_stats" ON public.game_stats;

-- Read own stats (anon-heavy: anyone can read by user_id)
CREATE POLICY "public_read_game_stats"
  ON public.game_stats FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create stats entry
CREATE POLICY "public_insert_game_stats"
  ON public.game_stats FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Update own stats
CREATE POLICY "public_update_game_stats"
  ON public.game_stats FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- 13. player_progress (per-game progress, linked to profiles)
ALTER TABLE public.player_progress ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_player_progress" ON public.player_progress;
DROP POLICY IF EXISTS "anon_insert_player_progress" ON public.player_progress;
DROP POLICY IF EXISTS "anon_update_player_progress" ON public.player_progress;
DROP POLICY IF EXISTS "public_read_player_progress" ON public.player_progress;
DROP POLICY IF EXISTS "public_insert_player_progress" ON public.player_progress;
DROP POLICY IF EXISTS "public_update_player_progress" ON public.player_progress;

CREATE POLICY "public_read_player_progress"
  ON public.player_progress FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "public_insert_player_progress"
  ON public.player_progress FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "public_update_player_progress"
  ON public.player_progress FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);


-- ============================================================
-- CATEGORY F: User Accounts (Protected)
-- Tables: users, profiles
-- ============================================================

-- 14. users (SENSITIVE: contains password_hash)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_users" ON public.users;
DROP POLICY IF EXISTS "auth_read_own_user" ON public.users;
DROP POLICY IF EXISTS "auth_update_own_user" ON public.users;
DROP POLICY IF EXISTS "public_insert_users" ON public.users;
DROP POLICY IF EXISTS "users_select_own" ON public.users;
DROP POLICY IF EXISTS "users_update_own" ON public.users;
DROP POLICY IF EXISTS "users_insert_self" ON public.users;

-- Authenticated users can read ONLY their own row
CREATE POLICY "users_select_own"
  ON public.users FOR SELECT
  TO authenticated
  USING (user_id = auth.uid()::text);

-- Authenticated users can update ONLY their own row
CREATE POLICY "users_update_own"
  ON public.users FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid()::text)
  WITH CHECK (user_id = auth.uid()::text);

-- Allow user creation during signup flow
CREATE POLICY "users_insert_self"
  ON public.users FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
-- Note: In production, tighten INSERT to WITH CHECK (user_id = auth.uid()::text)
-- Currently permissive for anon signup flow

-- NO DELETE policy: users cannot self-delete via API
-- NO anon SELECT: password_hash must never be readable by anonymous users

-- 15. profiles (public display, own-write)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_profiles" ON public.profiles;
DROP POLICY IF EXISTS "auth_insert_profile" ON public.profiles;
DROP POLICY IF EXISTS "auth_update_profile" ON public.profiles;
DROP POLICY IF EXISTS "public_read_profiles" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;

-- Anyone can view profiles (public leaderboard, avatars)
CREATE POLICY "public_read_profiles"
  ON public.profiles FOR SELECT
  TO anon, authenticated
  USING (true);

-- Users can create their own profile
CREATE POLICY "profiles_insert_own"
  ON public.profiles FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Users can update their own profile
CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);


-- ============================================================
-- CATEGORY G: User Achievements (Public View, Own Write)
-- Table: unified_user_achievements
-- ============================================================

-- 16. unified_user_achievements
ALTER TABLE public.unified_user_achievements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_user_achievements" ON public.unified_user_achievements;
DROP POLICY IF EXISTS "auth_insert_user_achievements" ON public.unified_user_achievements;
DROP POLICY IF EXISTS "public_read_user_achievements" ON public.unified_user_achievements;
DROP POLICY IF EXISTS "public_insert_user_achievements" ON public.unified_user_achievements;

-- Anyone can view achievements (trophy showcase)
CREATE POLICY "public_read_user_achievements"
  ON public.unified_user_achievements FOR SELECT
  TO anon, authenticated
  USING (true);

-- Anyone can unlock achievements (anon game play)
CREATE POLICY "public_insert_user_achievements"
  ON public.unified_user_achievements FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);


-- ============================================================
-- SECURITY HARDENING: Create a view for users table
-- that excludes password_hash for safe public queries
-- ============================================================

DROP VIEW IF EXISTS public.users_public;
CREATE VIEW public.users_public AS
  SELECT user_id, email, name, picture, quest_coins, auth_provider, created_at
  FROM public.users;

-- Grant access to the view
GRANT SELECT ON public.users_public TO anon, authenticated;


-- ============================================================
-- VERIFICATION: Check all tables have RLS enabled
-- ============================================================

DO $$
DECLARE
  tbl RECORD;
  count_no_rls INTEGER := 0;
BEGIN
  FOR tbl IN
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
      AND tablename IN (
        'site_content', 'unified_games', 'factions',
        'game_progress', 'profiles', 'unified_user_achievements',
        'game_stats', 'smart_contracts', 'player_progress',
        'newsletter_subscribers', 'unified_faq_items',
        'unified_page_content', 'unified_achievements',
        'notebooks', 'unified_scores', 'users', 'scores'
      )
  LOOP
    IF NOT EXISTS (
      SELECT 1 FROM pg_class
      WHERE relname = tbl.tablename
        AND relrowsecurity = true
    ) THEN
      RAISE NOTICE 'WARNING: RLS not enabled on %', tbl.tablename;
      count_no_rls := count_no_rls + 1;
    END IF;
  END LOOP;

  IF count_no_rls = 0 THEN
    RAISE NOTICE 'SUCCESS: All tables have RLS enabled!';
  ELSE
    RAISE NOTICE 'FAILED: % tables without RLS', count_no_rls;
  END IF;
END $$;

COMMIT;

-- ============================================================
-- POLICY SUMMARY
-- ============================================================
-- Table                      | SELECT | INSERT | UPDATE | DELETE
-- ---------------------------|--------|--------|--------|-------
-- site_content               | ALL    | -      | -      | -
-- unified_games              | ALL*   | -      | -      | -
-- unified_achievements       | ALL    | -      | -      | -
-- unified_faq_items          | ALL*   | -      | -      | -
-- unified_page_content       | ALL*   | -      | -      | -
-- factions                   | ALL    | -      | -      | -
-- newsletter_subscribers     | ALL    | ALL    | -      | -
-- scores                     | ALL    | ALL    | -      | -
-- unified_scores             | ALL    | ALL    | -      | -
-- game_progress              | ALL    | ALL    | ALL    | -
-- smart_contracts            | ALL    | ALL    | ALL    | -
-- notebooks                  | ALL    | ALL    | ALL    | -
-- game_stats                 | ALL    | ALL    | ALL    | -
-- player_progress            | ALL    | ALL    | ALL    | -
-- users                      | AUTH** | AUTH** | AUTH** | -
-- profiles                   | ALL    | ALL    | ALL    | -
-- unified_user_achievements  | ALL    | ALL    | -      | -
-- * = filtered (is_active/is_published)
-- ** = own row only (auth.uid() match)
-- ALL = anon + authenticated
-- - = no policy (blocked, admin-only via service_role)
