# Day 70 - College Sahayak Architecture & API Specification

**Date:** 13th August 2026 (Thu)  
**Task:** System Architecture Documentation & Technical Summary

## 1. System Overview
College Sahayak is an integrated educational web platform built with React, Node.js/Express, Flask, MySQL, and Google Gemini API.

## 2. API Endpoints Summary
- `POST /api/auth/login` (Authentication & Session JWT)
- `POST /api/auth/send-otp` (Brevo SMTP 2-Step Verification)
- `GET /api/resources/types` (10 Resource Types Catalogue)
- `POST /api/mydoc/save` ("My Document" Personal Storage)
- `POST /api/chatbot/ask` (Gemini 1.5 Flash AI Assistant)
