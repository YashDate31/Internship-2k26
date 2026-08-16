// Day 44: Registration & Login Validation Middleware

function validateRegistration(req, res, next) {
    const { name, email, password } = req.body;
    const errors = [];

    if (!name || name.trim().length < 3) {
        errors.push("Name must be at least 3 characters long.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push("Please provide a valid email address.");
    }

    if (!password || password.length < 6) {
        errors.push("Password must be at least 6 characters long.");
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    next();
}

module.exports = { validateRegistration };
