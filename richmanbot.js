// richmanbot.js

const apiUrl = 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions'; // Base URL
const apiKey = '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'; // Replace with your actual API key

// Function to send a message to ChatGPT
function sendMessage(userInput) {
    // Create a request object with user input
    const requestObject = {
        prompt: userInput,
        max_tokens: 50, // Adjust as needed for response length
    };

    // Create headers with API key
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`, // Include your API key in the headers
    });

    // Make a POST request to the ChatGPT endpoint
    fetch(apiUrl, {
        method: 'POST',
        headers: headers, // Use the headers created above
        body: JSON.stringify(requestObject),
    })
        .then((response) => response.json())
        .then((data) => {
            // Handle the response from ChatGPT here
            const botResponse = data.choices[0].text;
            displayBotResponse(botResponse, userInput);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Function to display the bot's response
function displayBotResponse(responseText, userInput) {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div>User: ${userInput}</div>`;
    chatBox.innerHTML += `<div>Bot: ${responseText}</div>`;
}

// Function to handle user input and trigger sendMessage
function handleUserInput() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== '') {
        displayBotResponse(userInput, userInput);
        sendMessage(userInput);
        document.getElementById('user-input').value = ''; // Clear the input field
    }
}

// Event listener for the send button
document.getElementById('send-button').addEventListener('click', handleUserInput);

// Event listener for pressing Enter key
document.getElementById('user-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default form submission
        handleUserInput();
    }
});
