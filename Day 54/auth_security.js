// Day 54: Bcrypt Password Hashing & Registration Validation for College Sahayak
const bcrypt = require('bcryptjs');

async function registerCollegeUser(email, rawPassword, fullName) {
  // 1. Password complexity validation
  if (!rawPassword || rawPassword.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters long' };
  }

  if (!email.includes('@')) {
    return { success: false, message: 'Invalid email address' };
  }

  // 2. Hash password using salt rounds
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(rawPassword, saltRounds);

  console.log('User Registered:');
  console.log('Name:', fullName);
  console.log('Email:', email);
  console.log('Hashed Password (stored in MySQL):', hashedPassword);

  return { success: true, user: { email, fullName, hashedPassword } };
}

registerCollegeUser('student@college.edu', 'SecurePass123', 'Rahul Sharma');
