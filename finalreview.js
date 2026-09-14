document.addEventListener('DOMContentLoaded', () => {
  const RING_CIRCUMFERENCE = 263.9; // 2 * PI * r(42)
  const TRUST_SCORE = 99.4; // out of 100

  const ring = document.getElementById('trust-ring');
  const scoreLabel = document.getElementById('trust-score');

  if (ring && scoreLabel) {
    const targetOffset = RING_CIRCUMFERENCE * (1 - TRUST_SCORE / 100);

    requestAnimationFrame(() => {
      ring.style.transition = 'stroke-dashoffset 1.1s ease-out';
      ring.style.strokeDashoffset = targetOffset;
    });

    const duration = 1100;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = (TRUST_SCORE * eased).toFixed(1);
      scoreLabel.textContent = current;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const hashEl = document.getElementById('audit-hash');
  if (hashEl) {
    hashEl.style.cursor = 'pointer';
    hashEl.title = 'Click to copy full hash';
    hashEl.addEventListener('click', async () => {
      const fullHash = '0x8F9C1A2B3C4D5E6F7081920304A5B6C7D8E9F0A1B2C3D4E5F6071829304A5B6E4A1';
      try {
        await navigator.clipboard.writeText(fullHash);
        toast('Cryptographic hash copied to clipboard');
      } catch (err) {
        toast('Could not copy hash');
      }
    });
  }
  document.querySelectorAll('[data-action]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;

      switch (action) {
        case 'download-cert':
          toast('Preparing verification certificate for download…');
          break;
        case 'share-audit':
          if (navigator.share) {
            navigator.share({
              title: 'Huntified Verification Audit — Listing #HN-99420-LK',
              text: 'Contemporary 3-Bedroom Waterfront Serviced Apartment — AI Trust Score 99.4',
              url: window.location.href,
            }).catch(() => {});
          } else {
            toast('Audit link copied to clipboard');
            navigator.clipboard?.writeText(window.location.href).catch(() => {});
          }
          break;
        case 'publish-live':
          publishListing(btn);
          break;
        case 'view-registry':
          toast('Opening certified registry excerpt…');
          break;
        case 'browse-stills':
          toast('Loading the 18 geotagged inspection photos…');
          break;
        default:
          break;
      }
    });
  });

  function publishListing(btn) {
    const originalLabel = btn.innerHTML;
    btn.disabled = true;
    btn.classList.add('opacity-70', 'cursor-not-allowed');
    btn.innerHTML = 'Publishing…';

    setTimeout(() => {
      btn.innerHTML = '✓ Live on Huntified Search';
      btn.classList.remove('bg-emerald-500', 'hover:bg-emerald-600');
      btn.classList.add('bg-slate-900');
      toast('Listing #HN-99420-LK is now live to Huntified Search');
    }, 1200);
  }

  function toast(message) {
    const el = document.createElement('div');
    el.textContent = message;
    el.className = [
      'fixed', 'bottom-6', 'left-1/2', '-translate-x-1/2', 'z-50',
      'rounded-lg', 'bg-slate-900', 'text-white', 'text-sm', 'font-medium',
      'px-4', 'py-3', 'shadow-lg', 'transition-opacity', 'duration-300',
    ].join(' ');
    document.body.appendChild(el);

    requestAnimationFrame(() => { el.style.opacity = '1'; });
    setTimeout(() => {
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 300);
    }, 2200);
  }
});