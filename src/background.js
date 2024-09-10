chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'fetch') {
        fetch(message.url, {
            method: message.method,
            headers: message.headers,
            body: message.body
        })
        .then(response => response.json())
        .then(data => sendResponse(data))
        .catch(error => sendResponse({ error: error.message }));
        return true;  // Keep the message channel open for sendResponse
    }
});