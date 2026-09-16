javascript
document.addEventListener("DOMContentLoaded", () => {

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const workspace =
        document.getElementById("chat-workspace");
    if (!workspace) {
        console.error(
            "Landlord chat: #chat-workspace was not found."
        );
        return;
    }

    const propertyId =
        workspace.dataset.propertyId;
    const otherUserId =
        workspace.dataset.otherUserId;
    const currentUserId =
        workspace.dataset.currentUserId;
    const accessToken =
        localStorage.getItem("token");
    if (!accessToken) {
        console.warn(
            "Landlord chat: No access token found."
        );
    }

    if (!propertyId) {
        console.error(
            "Landlord chat: Missing property ID."
        );
        return;
    }
    if (!otherUserId) {
        console.error(
            "Landlord chat: Missing tenant ID."
        );
        return;
    }

    const wsUrl =
        `wss://huntified.onrender.com/ws/chat/` +
        `${encodeURIComponent(propertyId)}/` +
        `${encodeURIComponent(otherUserId)}/` +
        `?token=${encodeURIComponent(accessToken || "")}`;
    console.log(
        "Landlord WebSocket URL:",
        wsUrl
    );
    let socket;
    try {
        socket =
            new WebSocket(wsUrl);
    } catch (error) {
        console.error(
            "Landlord chat: Could not create WebSocket.",
            error
        );
        return;
    }

    socket.onopen = () => {
        console.log(
            "Landlord chat: WebSocket connected successfully."
        );
    };

    socket.onmessage = (event) => {
        try {
            const data =
                JSON.parse(event.data);
            console.log(
                "Landlord chat received:",
                data
            );
            if (!data.message) {
                return;
            }

            if (
                currentUserId &&
                String(data.sender_id) ===
                String(currentUserId)
            ) {
                return;
            }

            appendLandlordMessage(
                data.message,
                "received"
            );
        } catch (error) {
            console.error(
                "Landlord chat: Invalid WebSocket message.",
                error
            );
        }
    };
    socket.onerror = (error) => {
        console.error(
            "Landlord chat: WebSocket error.",
            error
        );
    };

    socket.onclose = (event) => {
        console.log(
            "Landlord chat: WebSocket disconnected.",
            event
        );
    };

    const sendButton =
        document.getElementById(
            "landlord-send-btn"
        );
    const chatInput =
        document.getElementById(
            "landlord-chat-input"
        );
    const messageFeed =
        document.getElementById(
            "landlord-message-feed"
        );
    if (
        !sendButton ||
        !chatInput ||
        !messageFeed
    ) {
        console.error(
            "Landlord chat: Required chat elements are missing."
        );
        return;
    }

    function handleSend() {
        const text =
            chatInput.value.trim();
        if (!text) {
            return;
        }

        if (
            !socket ||
            socket.readyState !== WebSocket.OPEN
        ) {
            console.warn(
                "Landlord chat: WebSocket is not connected."
            );
            return;
        }

        socket.send(
            JSON.stringify({
                message: text
            })
        );

        appendLandlordMessage(
            text,
            "sent"
        );
        chatInput.value = "";
        chatInput.focus();
    }

    sendButton.addEventListener(
        "click",
        handleSend
    );

    chatInput.addEventListener(
        "keydown",
        (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                handleSend();
            }
        }
    );

    const chatTabs =
        document.querySelectorAll(
            ".flex.gap-1 button"
        );
    chatTabs.forEach((tab) => {
        tab.addEventListener(
            "click",
            function () {
                chatTabs.forEach((item) => {
                    item.classList.remove(
                        "bg-slate-900",
                        "text-white"
                    );

                    item.classList.add(
                        "bg-slate-100",
                        "text-slate-600"
                    );
                });

                this.classList.remove(
                    "bg-slate-100",
                    "text-slate-600"
                );
                this.classList.add(
                    "bg-slate-900",
                    "text-white"
                );
            }
        );
    });
});

function appendLandlordMessage(
    text,
    type
) {
    const messageFeed =
        document.getElementById(
            "landlord-message-feed"
        );
    if (!messageFeed) {
        return;
    }
    const messageDiv =
        document.createElement("div");

    if (type === "sent") {
        messageDiv.className =
            "flex items-end justify-end gap-1.5";
        messageDiv.innerHTML = `
            <div>
                <div class="bg-slate-900 text-white p-2.5 rounded-xl rounded-br-none max-w-sm text-[9.5px] leading-relaxed shadow-sm">
                    ${escapeHTML(text)}
                </div>
                <span class="text-[8px] text-slate-400 mt-0.5 block text-right">
                    Just now ✓
                </span>
            </div>
        `;

    }

    else {
        messageDiv.className =
            "flex items-end gap-1.5";
        messageDiv.innerHTML = `
            <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                class="w-5 h-5 rounded-full object-cover mb-1"
                alt="Tenant"
            >
            <div>
                <div class="bg-white border border-slate-200 text-slate-800 p-2.5 rounded-xl rounded-bl-none max-w-sm text-[9.5px] leading-relaxed shadow-sm">
                    ${escapeHTML(text)}
                </div>
                <span class="text-[8px] text-slate-400 mt-0.5 block">
                    Just now
                </span>
            </div>
        `;
    }


    messageFeed.appendChild(
        messageDiv
    );
    messageFeed.scrollTop =
        messageFeed.scrollHeight;

}


function escapeHTML(str) {
    return String(str).replace(
        /[&<>'"]/g,
        (tag) => {
            const entities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "'": "&#39;",
                '"': "&quot;"
            };
            return entities[tag] || tag;
        }
    );
}
``