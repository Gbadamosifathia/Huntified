document.addEventListener('DOMContentLoaded', () => {
  const API_BASE_URL = 'https://huntified.onrender.com';
  const loginForm = document.getElementById('login-form');
  const submitBtn = document.getElementById('submit-btn');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('toggle-password');

  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      togglePasswordBtn.textContent = isPassword ? 'Hide' : 'Show';
    });
  }
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `Signing in... <span class="animate-spin ml-2">⏳</span>`;
      submitBtn.disabled = true;

      const username = document.getElementById('username').value.trim();
      const password = passwordInput.value;

      try {
        const response = await fetch(`${API_BASE_URL}/api/login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
          alert('Successfully signed in!');
          if (data.role === 'landlord') {
            window.location.href = 'dashboard.html';
          } else {
            window.location.href = 'seeker-dashboard.html';
          }
        } else {
          alert('Sign in failed: ' + (data.detail || JSON.stringify(data)));
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }
      } catch (error) {
        console.error('Network or server error during sign in:', error);
        alert('An error occurred. Please check your network connection.');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});