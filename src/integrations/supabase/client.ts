import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qbesxgkkplveteqzldng.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiZXN4Z2trcGx2ZXRlcXpsZG5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0ODg0NzAsImV4cCI6MjAyMzA2NDQ3MH0.qDJ7HwqL_6e8OYq2lQHG3RTQRQdKwQRqn-O_dZoYZfY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    // Configure session timeout to 1 hour (in seconds)
    storage: {
      getItem: (key) => {
        const item = localStorage.getItem(key);
        if (!item) return null;
        
        const { value, timestamp } = JSON.parse(item);
        const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
        
        if (Date.now() - timestamp > oneHour) {
          localStorage.removeItem(key);
          return null;
        }
        
        return value;
      },
      setItem: (key, value) => {
        const item = JSON.stringify({
          value,
          timestamp: Date.now()
        });
        localStorage.setItem(key, item);
      },
      removeItem: (key) => localStorage.removeItem(key)
    }
  }
});