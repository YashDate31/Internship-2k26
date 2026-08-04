// Error handler for error pages
function initializeErrorHandler() {
    // Get the JSON data from the script tag
    var errorScript = document.getElementById('error-data');
    if (!errorScript) return;
    
    try {
        var errorData = JSON.parse(errorScript.textContent);
        
        // Log error details to console for debugging
        console.error('Error ' + errorData.statusCode + ': ' + errorData.title);
        console.error('Message: ' + errorData.message);
        
        if (errorData.exception) {
            console.error('Exception: ' + errorData.exception);
        }
    } catch (e) {
        console.error('Error initializing error handler:', e);
    }
}

// Call the handler when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeErrorHandler);
