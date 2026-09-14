document.addEventListener("DOMContentLoaded", () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    const chatTabs = document.querySelectorAll('.flex.gap-1 button');
    chatTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            chatTabs.forEach(t => {
                t.classList.remove('bg-slate-900', 'text-white');
                t.classList.add('bg-slate-100', 'text-slate-600');
            });
            this.classList.remove('bg-slate-100', 'text-slate-600');
            this.classList.add('bg-slate-900', 'text-white');
        });
    });
    const propertyId = "123"; 
    const otherUserId = "456"; 
    const accessToken = localStorage.getItem('token') || 'YOUR_ACCESS_TOKEN';

    const wsProtocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const wsUrl = `${wsProtocol}huntified.onrender.com/ws/chat/${propertyId}/${otherUserId}/?token=${accessToken}`;
    
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
        console.log('Chat WebSocket connected successfully.');
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const currentUserId = localStorage.getItem('userId'); 
        const messageType = String(data.sender_id) === String(currentUserId) ? 'sent' : 'received';
        
     
        if (messageType === 'received') {
            appendMessageToUI(data.message, 'received');
        }
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
        console.log('Chat WebSocket disconnected.');
    };

    const sendBtn = document.querySelector('button:has(i[data-lucide="send"])') || document.querySelector('#send-btn');
    const chatInput = document.querySelector('input[placeholder*="Type your message"]');
    const messageFeed = document.querySelector('.flex-1.overflow-y-auto.p-6.space-y-4');

    if (sendBtn && chatInput && messageFeed) {
        const handleSend = () => {
            const text = chatInput.value.trim();
            if (!text) return;
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ message: text }));
                
                
                appendMessageToUI(text, 'sent');
                chatInput.value = '';
                messageFeed.scrollTop = messageFeed.scrollHeight;
            } else {
                alert('Chat connection is not open. Please refresh the page.');
            }
        };

        sendBtn.addEventListener('click', handleSend);

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSend();
            }
        });
    }
});

function appendMessageToUI(text, type) {
    const messageFeed = document.querySelector('.flex-1.overflow-y-auto.p-6.space-y-4');
    if (!messageFeed) return;

    const msgDiv = document.createElement('div');
    
    if (type === 'sent') {
        msgDiv.className = 'flex items-end justify-end gap-1.5';
        msgDiv.innerHTML = `
            <div class="bg-slate-900 text-white p-2 rounded-xl rounded-br-none max-w-sm text-[9.5px] leading-relaxed shadow-sm">
                ${escapeHTML(text)}
            </div>
            <span class="text-[8px] text-slate-400">Just now ✓</span>
        `;
    } else {
        msgDiv.className = 'flex items-end gap-1.5';
        msgDiv.innerHTML = `
            <div class="bg-white border border-slate-200 text-slate-800 p-2 rounded-xl rounded-bl-none max-w-sm text-[9.5px] leading-relaxed shadow-sm">
                ${escapeHTML(text)}
            </div>
            <span class="text-[8px] text-slate-400">Just now</span>
        `;
    }
    
    messageFeed.appendChild(msgDiv);
    messageFeed.scrollTop = messageFeed.scrollHeight;
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}