class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        };

        this.state = false;
        this.messages = [];
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        if (openButton) {
            openButton.addEventListener('click', () => this.toggleState(chatBox));
        }

        if (sendButton) {
            sendButton.addEventListener('click', () => this.onSendButton(chatBox));
        }

        const node = chatBox.querySelector('input');
        if (node) {
            node.addEventListener('keyup', ({ key }) => {
                if (key === "Enter") {
                    this.onSendButton(chatBox);
                }
            });
        }
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // Show or hide the chatbox
        if (this.state) {
            chatbox.classList.add('chatbox--active');
        } else {
            chatbox.classList.remove('chatbox--active');
        }
    }

    onSendButton(chatbox) {
        const textField = chatbox.querySelector('input');
        const text1 = textField.value.trim();
        if (text1 === "") {
            return;
        }

        const msg1 = { name: "User", message: text1 };
        this.messages.push(msg1);

        fetch('/predict', { // Replace '/predict' with the correct endpoint
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(r => r.json())
            .then(r => {
                const msg2 = { name: "Fitness Bro", message: r.answer };
                this.messages.push(msg2);
                this.updateChatbox(chatbox);
                textField.value = '';
            })
            .catch((error) => {
                console.error('Error:', error);
                this.updateChatbox(chatbox);
                textField.value = '';
            });
    }

    updateChatbox(chatbox) {
        let html = '';
        this.messages.slice().reverse().forEach(function (item) {
            if (item.name === "Fitness Bro") {
                html += `<div class="messages__item messages__item--visitor">
                            <div class="messages__item__content">${item.message}</div>
                         </div>`;
            } else {
                html += `<div class="messages__item messages__item--operator">
                            <div class="messages__item__content">${item.message}</div>
                         </div>`;
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        if (chatmessage) {
            chatmessage.innerHTML = html;
        }
    }
}

const chatbox = new Chatbox();
chatbox.display();
