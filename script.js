
export default function HuntifiedLanding() {
  return 
    
}
document.querySelectorAll('.relative button').forEach(button => {
   const icon = button.querySelector('[data-lucide="heart"]') || button.querySelector('svg'); 
  if (icon && button.querySelector('[data-lucide="heart"], svg')) {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      button.classList.toggle('text-red-500');
      const svgIcon = button.querySelector('svg');
      if (svgIcon) {
        svgIcon.classList.toggle('text-red-500');
        svgIcon.classList.toggle('fill-red-500');
      }
    });
  }
});
document.querySelectorAll('.favorite-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    btn.classList.toggle('text-red-500');
    const svg = btn.querySelector('svg');
    if (svg) {
      svg.classList.toggle('fill-red-500');
    }
  });
});