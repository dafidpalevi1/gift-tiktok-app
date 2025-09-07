const giftButtonsContainer = document.getElementById('gift-buttons');
const animationContainer = document.getElementById('gift-animation');
const giftNameEl = document.getElementById('gift-name');
const audioPlayer = document.getElementById('audio-player');
let currentAnimation = null;

// Supabase config
const SUPABASE_URL = 'https://shqbxnfuztkkuifxmtqu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNocWJ4bmZ1enRra3VpZnhtdHF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyODA2NTQsImV4cCI6MjA3Mjg1NjY1NH0.WbuHAVvVaH6GUX_NB-Uprh7lCamhe4ojvxmvYcoWKXk';
const SUPABASE_TABLE = 'gifts';

async function fetchGifts() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}?select=*`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`
    }
  });
  const gifts = await res.json();
  displayGiftButtons(gifts);
}

function displayGiftButtons(gifts) {
  giftButtonsContainer.innerHTML = '';
  gifts.forEach(gift => {
    const btn = document.createElement('div');
    btn.className = 'gift-btn';
    btn.innerHTML = `
      <img src="${gift.image}" alt="${gift.name}">
      <div class="gift-name">${gift.name}</div>
      <div class="gift-coins">
        <span>${gift.coins}</span>
        <img src="https://cdn3d.iconscout.com/3d/free/thumb/free-tiktok-coin-3d-icon-png-download-6220601.png" alt="coin">
      </div>`;
    btn.addEventListener('click', () => triggerDance(gift));
    giftButtonsContainer.appendChild(btn);
  });
}

function triggerDance(gift) {
  // Stop audio
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
  
  // Stop animasi lama
  if (currentAnimation) currentAnimation.destroy();
  animationContainer.innerHTML = '';

  giftNameEl.textContent = `${gift.name} (${gift.coins} koin)`;
  giftNameEl.classList.remove('hidden');

  // Load animasi (gunakan contoh Lottie)
  const animUrl = gift.animation || 'https://assets6.lottiefiles.com/packages/lf20_touohxv0.json';
  currentAnimation = lottie.loadAnimation({
    container: animationContainer,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: animUrl
  });
  animationContainer.classList.remove('hidden');

  // Play musik online
  audioPlayer.src = gift.audio || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  audioPlayer.play();

  // Stop setelah 5 detik
  setTimeout(() => {
    if (currentAnimation) currentAnimation.destroy();
    animationContainer.classList.add('hidden');
    giftNameEl.classList.add('hidden');
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  }, 5000);
}

// Jalankan
fetchGifts();
fetch('/.netlify/functions/gifts')
  .then(res => res.json())
  .then(gifts => console.log(gifts));
