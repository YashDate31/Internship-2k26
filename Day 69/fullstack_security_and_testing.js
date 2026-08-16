// Day 69: Full-Stack Security, Input Sanitization & Error Handling (12 Aug 2026)
function sanitizeInput(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[<>]/g, '');
}

function globalErrorHandler(err, req, res, next) {
    console.error('API Error:', err.stack);
    res.status(err.status || 500).json({
        success: false,
        error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
    });
}

module.exports = { sanitizeInput, globalErrorHandler };
