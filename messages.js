javascript
document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // LUCIDE ICONS
    // =========================================================

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }


    // =========================================================
    // CHAT WORKSPACE
    // =========================================================

    const workspace = document.getElementById("chat-workspace");

    if (!workspace) {
        console.error("Tenant chat: #chat-workspace was not found.");
        return;
    }


    // =========================================================
    // TEMPORARY FRONTEND VALUES
    //
    // These currently come from the HTML:
    //
    // property ID  = 17
    // landlord ID  = 42
    // tenant ID    = 89
    //
    // BACKEND TEAM:
    // Replace these values with real dynamic values when
    // the API is deployed.
    // =========================================================

    const propertyId = workspace.dataset.propertyId;
    const otherUserId = workspace.dataset.otherUserId;
    const currentUserId = workspace.dataset.currentUserId;


    // =========================================================
    // ACCESS TOKEN
    // =========================================================

    const accessToken = localStorage.getItem("token");


    if (!accessToken) {
        console.warn(
            "Tenant chat: No access token found in localStorage."
        );
    }


    // =========================================================
    // VALIDATE CHAT INFORMATION
    // =========================================================

    if (!propertyId) {
        console.error("Tenant chat: Missing property ID.");
        return;
    }

    if (!otherUserId) {
        console.error("Tenant chat: Missing landlord ID.");
        return;
    }


    // =========================================================
    // WEBSOCKET URL
    // =========================================================

    const wsUrl =
        `wss://huntified.onrender.com/ws/chat/` +
        `${encodeURIComponent(propertyId)}/` +
        `${encodeURIComponent(otherUserId)}/` +
        `?token=${encodeURIComponent(accessToken || "")}`;


    console.log("Tenant WebSocket URL:", wsUrl);


    // =========================================================
    // CREATE WEBSOCKET CONNECTION
    // =========================================================

    let socket;

    try {

        socket = new WebSocket(wsUrl);

    } catch (error) {

        console.error(
            "Tenant chat: Could not create WebSocket.",
            error
        );

        return;
    }


    // =========================================================
    // WEBSOCKET CONNECTED
    // =========================================================

    socket.onopen = () => {

        console.log(
            "Tenant chat: WebSocket connected successfully."
        );

    };


    // =========================================================
    // RECEIVE MESSAGE
    // =========================================================

    socket.onmessage = (event) => {

        try {

            const data = JSON.parse(event.data);

            console.log(
                "Tenant chat received:",
                data
            );


            if (!data.message) {
                return;
            }


            // If backend sends the tenant's own message back,
            // don't display it twice.

            if (
                currentUserId &&
                String(data.sender_id) === String(currentUserId)
            ) {
                return;
            }


            // This is a message from the landlord.

            appendTenantMessage(
                data.message,
                "received"
            );


        } catch (error) {

            console.error(
                "Tenant chat: Invalid WebSocket message.",
                error
            );

        }

    };


    // =========================================================
    // WEBSOCKET ERROR
    // =========================================================

    socket.onerror = (error) => {

        console.error(
            "Tenant chat: WebSocket error.",
            error
        );

    };


    // =========================================================
    // WEBSOCKET CLOSED
    // =========================================================

    socket.onclose = (event) => {

        console.log(
            "Tenant chat: WebSocket disconnected.",
            event
        );

    };


    // =========================================================
    // ELEMENTS
    // =========================================================

    const sendButton =
        document.getElementById("tenant-send-btn");

    const chatInput =
        document.getElementById("tenant-chat-input");

    const messageFeed =
        document.getElementById("tenant-message-feed");


    if (!sendButton || !chatInput || !messageFeed) {

        console.error(
            "Tenant chat: Required chat elements are missing."
        );

        return;
    }


    // =========================================================
    // SEND MESSAGE
    // =========================================================

    function handleSend() {

        const text = chatInput.value.trim();

        if (!text) {
            return;
        }


        // Make sure WebSocket is connected.

        if (
            !socket ||
            socket.readyState !== WebSocket.OPEN
        ) {

            console.warn(
                "Tenant chat: WebSocket is not connected."
            );

            return;
        }


        // =====================================================
        // SEND TO BACKEND
        // =====================================================

        socket.send(
            JSON.stringify({
                message: text
            })
        );


        // =====================================================
        // SHOW MESSAGE IMMEDIATELY
        // =====================================================

        appendTenantMessage(
            text,
            "sent"
        );


        // Clear input.

        chatInput.value = "";

        chatInput.focus();

    }


    // =========================================================
    // SEND BUTTON
    // =========================================================

    sendButton.addEventListener(
        "click",
        handleSend
    );


    // =========================================================
    // ENTER KEY
    // =========================================================

    chatInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                event.preventDefault();

                handleSend();

            }

        }
    );


    // =========================================================
    // TAB SWITCHING
    // =========================================================

    const chatTabs =
        document.querySelectorAll(".flex.gap-1 button");

    chatTabs.forEach((tab) => {

        tab.addEventListener("click", function () {

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

        });

    });

});


// =============================================================
// ADD TENANT MESSAGE TO UI
// =============================================================

function appendTenantMessage(text, type) {

    const messageFeed =
        document.getElementById("tenant-message-feed");

    if (!messageFeed) {
        return;
    }


    const messageDiv =
        document.createElement("div");


    // =========================================================
    // SENT MESSAGE
    // =========================================================

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


    // =========================================================
    // RECEIVED MESSAGE
    // =========================================================

    else {

        messageDiv.className =
            "flex items-end gap-1.5";


        messageDiv.innerHTML = `
            <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                class="w-5 h-5 rounded-full object-cover mb-1"
                alt="Landlord"
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


    messageFeed.appendChild(messageDiv);


    // Automatically scroll to newest message.

    messageFeed.scrollTop =
        messageFeed.scrollHeight;

}


// =============================================================
// ESCAPE HTML
// =============================================================

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
