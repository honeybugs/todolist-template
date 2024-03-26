import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv';
config()

// Supabase 모듈 기본 설정 
const supabase = createClient(process.env.SUPABASSE_URI, process.env.SUPABASE_KEY)
export default supabase;