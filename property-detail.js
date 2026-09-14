
const currentProperty = {
    id: "prop-current-01",
    title: "Contemporary 3-Bedroom Waterfront Serviced Apartment",
    price: "₦12,000,000",
    location: "Admiralty Way, Lekki Phase 1",
    image: "image/pic 1 landing page.png"
};

document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    setupEventListeners();
    updateWishlistUI();
    syncCurrentPropertySaveButton();
    syncPropertyCardWishlistStates();
});

function setupEventListeners() {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    const modalBody = document.getElementById('modal-body-content');
    const closeModalBtn = document.getElementById('close-modal');

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    if (modalContainer) {
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) closeModal();
        });
    }
    const scheduleBtn = document.getElementById('schedule-inspection-btn');
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', () => {
            modalBody.innerHTML = `
                <div class="space-y-4">
                    <div class="flex items-center gap-3">
                        <div class="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
                            <i data-lucide="calendar-check" class="w-6 h-6"></i>
                        </div>
                        <div>
                            <h3 class="text-lg font-extrabold text-slate-900">Schedule Verified Inspection</h3>
                            <p class="text-xs text-slate-500">Admiralty Way, Lekki Phase 1</p>
                        </div>
                    </div>
                    <form id="inspection-form" class="space-y-3 pt-2">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-1">Select Date</label>
                            <input type="date" required class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-1">Preferred Time Slot</label>
                            <select class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                                <option>Morning (10:00 AM - 12:00 PM)</option>
                                <option>Afternoon (1:00 PM - 3:00 PM)</option>
                                <option>Evening (4:00 PM - 6:00 PM)</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-1">Inspection Type</label>
                            <div class="grid grid-cols-2 gap-3">
                                <label class="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs cursor-pointer">
                                    <input type="radio" name="type" checked class="text-emerald-600"> Physical Tour
                                </label>
                                <label class="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs cursor-pointer">
                                    <input type="radio" name="type" class="text-emerald-600"> Live Video Tour
                                </label>
                            </div>
                        </div>
                        <button type="submit" class="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all text-xs mt-2">
                            Confirm Inspection Request
                        </button>
                    </form>
                </div>
            `;
            openModal();
            if (typeof lucide !== 'undefined') lucide.createIcons();

            document.getElementById('inspection-form').addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Inspection successfully scheduled! A Huntified field agent and Engr. Babatunde Alabi have been notified.');
                closeModal();
            });
        });
    }

    const messageBtn = document.getElementById('message-landlord-btn');
    if (messageBtn) {
        messageBtn.addEventListener('click', () => {
            modalBody.innerHTML = `
                <div class="space-y-4">
                    <div class="flex items-center gap-3 border-b border-slate-100 pb-4">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Host" class="w-12 h-12 rounded-full object-cover">
                        <div>
                            <h3 class="text-sm font-extrabold text-slate-900">Chat with Engr. Babatunde Alabi</h3>
                            <p class="text-[11px] text-emerald-600 font-semibold">Online • Usually replies in 15 mins</p>
                        </div>
                    </div>
                    <div class="bg-slate-50 p-4 rounded-2xl h-48 overflow-y-auto space-y-3 text-xs border border-slate-200">
                        <div class="bg-white p-3 rounded-xl border border-slate-100 shadow-sm max-w-[80%]">
                            <span class="font-bold block text-[10px] text-slate-400 mb-0.5">Engr. Babatunde</span>
                            Hello! Welcome to my Admiralty Way listing. Let me know if you have questions about the power schedule or move-in escrow terms.
                        </div>
                    </div>
                    <form id="chat-form" class="flex gap-2">
                        <input type="text" id="chat-input" placeholder="Type your message..." required class="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                        <button type="submit" class="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs">Send</button>
                    </form>
                </div>
            `;
            openModal();
            if (typeof lucide !== 'undefined') lucide.createIcons();

            document.getElementById('chat-form').addEventListener('submit', (e) => {
                e.preventDefault();
                const input = document.getElementById('chat-input');
                if (input.value.trim() !== "") {
                    alert(`Message sent to Engr. Babatunde Alabi: "${input.value}"`);
                    closeModal();
                }
            });
        });
    }

    const galleryTrigger = document.getElementById('gallery-trigger');
    if (galleryTrigger) {
        galleryTrigger.addEventListener('click', () => {
            alert('Opening full screen Huntified property media archive (16 verified images)...');
        });
    }

    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', toggleCurrentPropertySave);
    }
}

function openModal() {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;
    modalContainer.classList.remove('hidden');
    modalContainer.classList.add('flex');
    setTimeout(() => {
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    }, 10);
}

function closeModal() {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
    setTimeout(() => {
        modalContainer.classList.remove('flex');
        modalContainer.classList.add('hidden');
    }, 200);
}

function updateWishlistUI() {
    const wishlist = JSON.parse(localStorage.getItem('user_wishlist')) || [];
    const badge = document.getElementById('wishlist-badge');
    const count = wishlist.length;

    if (badge) {
        if (count > 0) {
            badge.textContent = count;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }
}

function toggleCurrentPropertySave() {
    let wishlist = JSON.parse(localStorage.getItem('user_wishlist')) || [];
    const index = wishlist.findIndex(item => item.id === currentProperty.id);
    
    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push(currentProperty);
    }
    
    localStorage.setItem('user_wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
    syncCurrentPropertySaveButton();
}

function syncCurrentPropertySaveButton() {
    const wishlist = JSON.parse(localStorage.getItem('user_wishlist')) || [];
    const isSaved = wishlist.some(item => item.id === currentProperty.id);
    
    const saveBtn = document.getElementById('save-btn');
    const saveIcon = document.getElementById('save-btn-icon');
    const saveText = document.getElementById('save-btn-text');
    
    if (!saveBtn) return;

    if (isSaved) {
        saveBtn.classList.add('bg-rose-50', 'border-rose-200', 'text-rose-600');
        if (saveIcon) saveIcon.classList.add('fill-rose-500');
        if (saveText) saveText.textContent = 'Saved';
    } else {
        saveBtn.classList.remove('bg-rose-50', 'border-rose-200', 'text-rose-600');
        if (saveIcon) saveIcon.classList.remove('fill-rose-500');
        if (saveText) saveText.textContent = 'Save';
    }
}

function toggleWishlist(button, propertyData) {
    let wishlist = JSON.parse(localStorage.getItem('user_wishlist')) || [];
    const index = wishlist.findIndex(item => item.id === propertyData.id);
    const icon = button.querySelector('svg') || button.querySelector('i');

    if (index > -1) {
        wishlist.splice(index, 1);
        button.classList.remove('text-red-500', 'fill-red-500');
        if (icon) icon.classList.remove('fill-red-500', 'text-red-500');
    } else {
        wishlist.push(propertyData);
        button.classList.add('text-red-500', 'fill-red-500');
        if (icon) icon.classList.add('fill-red-500', 'text-red-500');
    }
    
    localStorage.setItem('user_wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
}

function syncPropertyCardWishlistStates() {
    const wishlist = JSON.parse(localStorage.getItem('user_wishlist')) || [];
    const saveButtons = document.querySelectorAll('.wishlist-toggle-btn');
    
    saveButtons.forEach(btn => {
        const propId = btn.getAttribute('data-property-id');
        const isSaved = wishlist.some(item => item.id === propId);
        const icon = btn.querySelector('svg') || btn.querySelector('i');
        
        if (isSaved) {
            btn.classList.add('text-red-500', 'fill-red-500');
            if (icon) icon.classList.add('fill-red-500', 'text-red-500');
        } else {
            btn.classList.remove('text-red-500', 'fill-red-500');
            if (icon) icon.classList.remove('fill-red-500', 'text-red-500');
        }
    });
}

// Navigate to messages page
function openLandlordMessages() {
    window.location.href = 'message.html';
}