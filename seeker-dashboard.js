const API_BASE_URL = 'https://huntified.onrender.com';

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  attachEventListeners();
  initFilterPills();
  fetchInitialProperties();
});

function viewPropertyDetails(propertyId) {
  window.location.href = `property-detail.html?id=${propertyId}`;
}

const activeFilters = {
  bedrooms: "",
  bathrooms: ""
};
let wishlist = [];
function attachEventListeners() {
  const searchBtn = document.getElementById('search-action-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', handleSearch);
  }
  const inputs = ['search-location', 'search-budget'];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
      });
    }
  });
  const aiInput = document.getElementById('ai-chat-input');
  if (aiInput) {
    aiInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendAIMessage();
    });
  }
}


function initFilterPills() {
  document.querySelectorAll('.bed-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetBtn = e.target.closest('.bed-btn');
      if (!targetBtn) return;
      
      document.querySelectorAll('.bed-btn').forEach(b => {
        b.classList.remove('bg-slate-900', 'text-white', 'rounded', 'shadow-sm', 'bg-white', 'text-slate-900');
        b.classList.add('text-slate-600');
      });
      targetBtn.classList.remove('text-slate-600');
      targetBtn.classList.add('bg-slate-900', 'text-white', 'rounded', 'shadow-sm');
      activeFilters.bedrooms = targetBtn.getAttribute('data-value');
    });
  });

  document.querySelectorAll('.bath-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetBtn = e.target.closest('.bath-btn');
      if (!targetBtn) return;
      
      document.querySelectorAll('.bath-btn').forEach(b => {
        b.classList.remove('bg-slate-900', 'text-white', 'rounded', 'shadow-sm', 'bg-white', 'text-slate-900');
        b.classList.add('text-slate-600');
      });
      targetBtn.classList.remove('text-slate-600');
      targetBtn.classList.add('bg-slate-900', 'text-white', 'rounded', 'shadow-sm');
      activeFilters.bathrooms = targetBtn.getAttribute('data-value');
    });
  });
}

async function fetchInitialProperties() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/home/`);
    if (!response.ok) throw new Error('Failed to load public property inventory.');
    const data = await response.json();
    console.log('Fetched public inventory:', data);
  } catch (error) {
    console.error('Error fetching home properties:', error);
  }
}
async function handleSearch() {
  const locationField = document.getElementById('search-location');
  const budgetField = document.getElementById('search-budget');
  const propertyTypeField = document.getElementById('search-type');
  const bedroomsField = document.getElementById('search-beds');

  const location = locationField ? locationField.value.trim() : '';
  const budget = budgetField ? budgetField.value.trim() : '';
  const propertyType = propertyTypeField ? propertyTypeField.value : '';
  const bedroomsInput = bedroomsField ? bedroomsField.value : '';
  const maxBudget = budget ? parseBudgetInput(budget) : null;
  const token = getToken();
  const params = new URLSearchParams();
  if (location) params.append('location', location);
  if (maxBudget) params.append('price', maxBudget);
  if (propertyType) params.append('name', propertyType);

  console.log('Dispatching Search Query:', params.toString());

  toggleLoadingState(true);

  try {
    const headers = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/api/search_filter/?${params.toString()}`, {
      method: 'GET',
      headers: headers
    });
    if (!response.ok) throw new Error('Search request failed.');
    const results = await response.json();
    console.log('Search Results:', results);
    alert(`Search successfully completed! Found ${Array.isArray(results) ? results.length : 'matching'} properties.`);
  } catch (error) {
    console.error('Error executing search API:', error);
    alert('Failed to execute search. Please ensure you are logged in or check your connection.');
  } finally {
    toggleLoadingState(false);
  }
}
async function uploadImagesToCloudinary(fileList) {
  const cloudName = 'nvte2bmp';
  const uploadPreset = 'huntified';
  const uploadedUrls = [];

  for (const file of fileList) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Cloudinary image upload failed.');
      const data = await response.json();
      if (data.secure_url) {
        uploadedUrls.push(data.secure_url);
      }
    } catch (err) {
      console.error('Error uploading image to Cloudinary:', err);
    }
  }

  return uploadedUrls;
}
async function createNewPropertyListing(propertyDataPayload, imageFiles) {
  const token = getToken();
  if (!token) {
    alert('Authentication required to list a property.');
    return;
  }
  toggleLoadingState(true);
  try {
    const cloudinaryUrls = await uploadImagesToCloudinary(imageFiles);
    const finalPayload = {
      ...propertyDataPayload,
      images: cloudinaryUrls
    };
    const response = await fetch(`${API_BASE_URL}/api/list_property_create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(finalPayload)
    });

    if (!response.ok) throw new Error('Failed to create property listing.');

    const result = await response.json();
    console.log('Property listed successfully:', result);
    alert('Property listed successfully and AI fraud verification completed!');
    return result;

  } catch (error) {
    console.error('Error creating property:', error);
    alert('Error submitting property listing.');
  } finally {
    toggleLoadingState(false);
  }
}
function parseBudgetInput(budgetString) {
  const cleaned = budgetString.replace(/[^0-9]/g, '');
  return cleaned ? parseInt(cleaned, 10) : null;
}
function toggleLoadingState(isLoading) {
  const mainBtn = document.getElementById('search-action-btn');
  const headerBtn = document.getElementById('header-search-btn');
  
  const buttons = [mainBtn, headerBtn].filter(Boolean);
  if (buttons.length === 0) return;

  buttons.forEach(btn => {
    if (isLoading) {
      btn.dataset.originalHtml = btn.innerHTML;
      btn.innerHTML = `<span class="inline-block animate-spin">⏳</span>`;
      btn.disabled = true;
      btn.classList.add('opacity-75', 'cursor-not-allowed');
    } else {
      btn.innerHTML = btn.dataset.originalHtml || `<i data-lucide="search" class="w-5 h-5"></i>`;
      btn.disabled = false;
      btn.classList.remove('opacity-75', 'cursor-not-allowed');
    }
  });
  
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function getToken() {
  return localStorage.getItem('accessToken') || '';
}

function toggleWishlist(id, title, price, image) {
  const index = wishlist.findIndex(item => item.id === id);
  const buttons = document.querySelectorAll(`.wishlist-btn-${id}`);
  
  if (index > -1) {
    wishlist.splice(index, 1);
    buttons.forEach(btn => {
      btn.innerHTML = '♡';
      btn.classList.remove('text-red-500', 'fill-red-500');
    });
  } else {
    wishlist.push({ id, title, price, image });
    buttons.forEach(btn => {
      btn.innerHTML = '♥';
      btn.classList.add('text-red-500');
    });
  }
  updateWishlistBadge();
}

function updateWishlistBadge() {
  const badge = document.getElementById('wishlist-badge');
  if (badge) {
    badge.innerText = wishlist.length;
    if (wishlist.length > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }
}

function openWishlistModal() {
  const modal = document.getElementById('wishlist-modal');
  const container = document.getElementById('wishlist-items-container');
  const countLabel = document.getElementById('wishlist-count-label');
  
  if (!modal || !container) return;

  container.innerHTML = '';
  countLabel.innerText = `${wishlist.length} propert${wishlist.length === 1 ? 'y' : 'ies'} saved`;

  if (wishlist.length === 0) {
    container.innerHTML = `
      <div class="py-12 text-center space-y-2">
        <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <i data-lucide="heart" class="w-6 h-6"></i>
        </div>
        <p class="font-bold text-sm text-slate-800">Your wishlist is empty</p>
        <p class="text-xs text-slate-500">Click the heart icon on any property card to save it here.</p>
      </div>
    `;
  } else {
    wishlist.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'flex items-center gap-3 pt-3 first:pt-0';
      itemEl.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="w-16 h-16 rounded-xl object-cover bg-slate-100 shadow-sm">
        <div class="flex-1 min-w-0">
          <h4 class="font-bold text-xs text-slate-900 truncate">${item.title}</h4>
          <p class="text-xs font-extrabold text-slate-700 mt-0.5">${item.price}</p>
        </div>
        <button onclick="toggleWishlist('${item.id}', '${item.title}', '${item.price}', '${item.image}')" class="p-2 text-slate-400 hover:text-red-500 transition-colors cursor-pointer" title="Remove">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      `;
      container.appendChild(itemEl);
    });
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  if (typeof lucide !== 'undefined') lucide.createIcons();
}
function closeWishlistModal() {
  const modal = document.getElementById('wishlist-modal');
  if (modal) {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  }
}

function openLandlordMessages() {
  window.location.href = 'messages.html';
}
function toggleAIAssistant() {
  const modal = document.getElementById('ai-assistant-modal');
  if (!modal) return;
  
  if (modal.classList.contains('hidden')) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  } else {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function sendAIMessage() {
  const input = document.getElementById('ai-chat-input');
  const container = document.getElementById('ai-chat-messages');
  
  if (!input || !container) return;
  
  const text = input.value.trim();
  if (!text) return;

  container.innerHTML += `
    <div class="ml-auto bg-slate-900 text-white p-3 rounded-xl max-w-[85%] text-xs shadow-sm">
      ${text}
    </div>
  `;
  
  input.value = '';
  container.scrollTop = container.scrollHeight;

  setTimeout(() => {
    container.innerHTML += `
      <div class="bg-slate-100 p-3 rounded-xl max-w-[85%] text-xs text-slate-700 shadow-sm">
        I am analyzing verified listings matching your request. Let me check escrow and availability status for you!
      </div>
    `;
    container.scrollTop = container.scrollHeight;
  }, 800);
}
function initializePropertyChatSocket(propertyId, otherUserId) {
  const token = getToken();
  if (!token) {
    console.warn('Authentication token required for WebSocket chat connection.');
    return null;
  }

  const wsUrl = `wss://huntified.onrender.com/ws/chat/${propertyId}/${otherUserId}/?token=${token}`;
  const chatSocket = new WebSocket(wsUrl);

  chatSocket.onopen = () => {
    console.log('Connected to Huntified real-time chat socket.');
  };

  chatSocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('New message received from server:', data.message);
  };

  chatSocket.onclose = () => {
    console.log('Chat WebSocket connection closed.');
  };

  return chatSocket;
}