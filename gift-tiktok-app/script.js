const animationContainer = document.getElementById('gift-animation');
const giftNameEl = document.getElementById('gift-name');
const giftButtonsContainer = document.getElementById('gift-buttons');
let currentAnimation = null;

// Fetch gifts dari backend Supabase via Netlify Function
fetch('/.netlify/functions/gifts')
  .then(res => res.json())
  .then(gifts => {
    gifts.forEach(gift => {
      const btn = document.createElement('div');
      btn.className = 'gift-btn';
      btn.innerHTML = `
        <img src="${gift.image}" alt="${gift.name}">
        <div class="gift-name">${gift.name}</div>
        <div class="gift-coins">
          <span>${gift.coins}</span>
          <img src="https://cdn3d.iconscout.com/3d/free/thumb/free-tiktok-coin-3d-icon-png-download-6220601.png" alt="coin">
        </div>
      `;
      btn.onclick = () => triggerDance(gift);
      giftButtonsContainer.appendChild(btn);
    });
  });

function triggerDance(gift) {
  // hentikan animasi & audio lama
  if (currentAnimation) currentAnimation.destroy();
  animationContainer.innerHTML = '';
  animationContainer.classList.add('hidden');
  giftNameEl.classList.add('hidden');

  // Tampilkan nama gift
  giftNameEl.textContent = `${gift.name} (${gift.coins} koin)`;
  giftNameEl.classList.remove('hidden');

  // Load animasi (gunakan Lottie random contoh)
  currentAnimation = lottie.loadAnimation({
    container: animationContainer,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: gift.animation || "https://assets6.lottiefiles.com/packages/lf20_touohxv0.json"
  });
  animationContainer.classList.remove('hidden');

  // Audio jika ada
  if (gift.audio) {
    const audio = new Audio(gift.audio);
    audio.play();
    setTimeout(() => audio.pause(), 5000);
  }

  // Stop setelah 5 detik
  setTimeout(() => {
    if (currentAnimation) {
      currentAnimation.destroy();
      animationContainer.classList.add('hidden');
      giftNameEl.classList.add('hidden');
    }
  }, 5000);
}
