1. Ganti YOUR_SUPABASE_ANON_KEY di script.js dengan anon key Supabase Anda.
2. Deploy folder ini ke Netlify (drag & drop).
3. Pastikan tabel 'gifts' di Supabase punya kolom:
   - id (integer, primary key)
   - name (text)
   - coins (integer)
   - image (text, URL gambar)
   - animation (text, URL Lottie animasi)
   - audio (text, URL musik)
4. Buka index.html di browser. Semua gift akan muncul, klik gift untuk animasi + musik.
