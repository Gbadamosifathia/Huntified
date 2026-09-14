document.addEventListener('DOMContentLoaded', () => {

  const API_BASE_URL = 'https://huntified.onrender.com';
  const roleCards = document.querySelectorAll('input[name="account_type"]');
  const submitButton = document.querySelector('button[type="submit"]');
  const countrySelect = document.getElementById('country');
  const signupForm = document.querySelector('form');
  const passwordInput = document.getElementById('password');
  const toggleBtn = passwordInput ? passwordInput.parentElement.querySelector('button') : null;

  async function loadCountries() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/get_countries/`);
      if (!response.ok) throw new Error('Failed to fetch countries');
      
      const countries = await response.json();
      countrySelect.innerHTML = '<option value="">Select Country</option>';
      
      countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.id;
        option.textContent = `${country.name} (${country.currency_symbol || ''} ${country.dialing_code || ''})`;
        countrySelect.appendChild(option);
      });
    } catch (error) {
      console.error('Error loading countries, using fallbacks:', error);
    }
  }

  loadCountries();
  roleCards.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const selectedLabel = e.target.closest('label');
      
      roleCards.forEach(r => {
        const label = r.closest('label');
        label.classList.remove('border-emerald-500', 'bg-emerald-50/40');
        label.classList.add('border-slate-200', 'bg-white');
        
        const badge = label.querySelector('.absolute.top-4.right-4');
        if (badge) badge.remove();
        
        const upperSpan = label.querySelector('span:first-child');
        if (upperSpan) {
          upperSpan.classList.remove('text-emerald-700');
          upperSpan.classList.add('text-slate-400');
        }
      });

      selectedLabel.classList.remove('border-slate-200', 'bg-white');
      selectedLabel.classList.add('border-emerald-500', 'bg-emerald-50/40');

      const upperSpan = selectedLabel.querySelector('span:first-child');
      if (upperSpan) {
        upperSpan.classList.remove('text-slate-400');
        upperSpan.classList.add('text-emerald-700');
      }

      if (!selectedLabel.querySelector('.absolute.top-4.right-4')) {
        const checkBadge = document.createElement('div');
        checkBadge.className = 'absolute top-4 right-4 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold';
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
  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      toggleBtn.textContent = isPassword ? 'Hide' : 'Show';
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = `Creating Account... <span class="animate-spin ml-2">⏳</span>`;
      submitButton.disabled = true;

      const firstNameInput = document.getElementById('first_name')?.value.trim() || '';
      const lastNameInput = document.getElementById('last_name')?.value.trim() || '';
      const usernameInput = document.getElementById('username')?.value.trim() || '';
      const emailInput = document.getElementById('email')?.value.trim() || '';
      const countryValue = countrySelect.value;
      const phoneInput = document.getElementById('phone_number')?.value.trim() || '';
      const passwordValue = passwordInput ? passwordInput.value : '';

      const checkedRoleRadio = document.querySelector('input[name="account_type"]:checked');
      const selectedRoleText = checkedRoleRadio ? checkedRoleRadio.closest('label').textContent : 'Hunter';
      const role = selectedRoleText.includes('Hunter') ? 'seeker' : 'landlord';

      const payload = {
        username: usernameInput,
        email: emailInput,
        password: passwordValue,
        first_name: firstNameInput,
        last_name: lastNameInput,
        phone_number: phoneInput,
        country: countryValue,
        role: role
      };

      try {
        const response = await fetch(`${API_BASE_URL}/api/signup/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
          alert('Account successfully created! Redirecting to your dashboard...');
          if (role === 'landlord') {
            window.location.href = 'dashboard.html'; 
          } else {
            window.location.href = 'seeker-dashboard.html';
          }
        } else {
          alert('Signup failed: ' + (data.detail || JSON.stringify(data)));
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
        }
      } catch (error) {
        console.error('Network or server error during signup:', error);
        alert('An error occurred. Please check your network connection.');
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      }
    });
  }

});