/*
  # Create Practice Audit Leads Table

  1. New Tables
    - `practice_audit_leads`
      - `id` (uuid, primary key)
      - `full_name` (text, required)
      - `email` (text, required)
      - `phone` (text, optional)
      - `clinic_name` (text, required)
      - `message` (text, optional)
      - `created_at` (timestamptz, default now)
  
  2. Security
    - Enable RLS on `practice_audit_leads` table
    - Add policy for inserting leads (public access for form submissions)
    - No read policies (admin only access)

  3. Notes
    - This table stores lead information from the practice audit request form
    - Public insert access is intentional for form submissions
    - No public read access to protect lead privacy
*/

CREATE TABLE IF NOT EXISTS practice_audit_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  clinic_name text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE practice_audit_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit audit request"
  ON practice_audit_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);