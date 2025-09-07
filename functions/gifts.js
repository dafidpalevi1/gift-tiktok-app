import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://shqbxnfuztkkuifxmtqu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNocWJ4bmZ1enRra3VpZnhtdHF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyODA2NTQsImV4cCI6MjA3Mjg1NjY1NH0.WbuHAVvVaH6GUX_NB-Uprh7lCamhe4ojvxmvYcoWKXk'; // ganti dengan anon key-mu
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
