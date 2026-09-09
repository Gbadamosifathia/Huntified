document.addEventListener('DOMContentLoaded', () => {

  const roleCards = document.querySelectorAll('input[name="account_type"]');
  const submitButton = document.querySelector('button[type="submit"]');

  roleCards.forEach(radio => {

    radio.addEventListener('change', (e) => {
      const selectedLabel = e.target.closest('label');
      
      roleCards.forEach(r => {
        const label = r.closest('label');
        label.classList.remove('border-emerald-500', 'bg-emerald-50/40');
        label.classList.add('border-slate-200', 'bg-white');
        
        const badge = label.querySelector('.absolute.top-4.right-4');
        if (badge) badge.remove();
      });

      selectedLabel.classList.remove('border-slate-200', 'bg-white');
      selectedLabel.classList.add('border-emerald-500', 'bg-emerald-50/40');

      if (!selectedLabel.querySelector('.absolute.top-4.right-4')) {
        const checkBadge = document.createElement('div');
        checkBadge.className = 'absolute top-4 right-4 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs';
        checkBadge.innerHTML = '✓';
        selectedLabel.appendChild(checkBadge);
      }

      const isHunter = selectedLabel.textContent.includes('Hunter');
      if (submitButton) {
        submitButton.innerHTML = isHunter 
          ? `Create Hunter Account <i data-lucide="arrow-right" class="w-4 h-4"></i>` 
          : `Create Landlord Portal Account <i data-lucide="arrow-right" class="w-4 h-4"></i>`;
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }
    });
  });
  const passwordInput = document.querySelector('input[type="password"], input[type="text"][class*="pr-12"]');
  const toggleBtn = passwordInput ? passwordInput.parentElement.querySelector('button') : null;

  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      toggleBtn.textContent = isPassword ? 'Hide' : 'Show';
    });
  }

  const signupForm = document.querySelector('form');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = `Creating Account... <span class="animate-spin ml-2">⏳</span>`;
      submitButton.disabled = true;

      setTimeout(() => {
        alert('Account successfully created! Redirecting to dashboard...');
        window.location.href = 'dashboard.html';
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      }, 1500);
    });
  }

});
