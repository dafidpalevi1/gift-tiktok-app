import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://shqbxnfuztkkuifxmtqu.supabase.co';
const supabaseKey = 'MASUKKAN_ANON_KEY_KAMU';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function handler(event, context) {
  const { data, error } = await supabase.from('gifts').select('*');
  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}
