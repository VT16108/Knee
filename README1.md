# MediScan AI Backend

Backend API for MediScan AI knee CT diagnostic application.

## Current Workflow

Frontend
   ↓
FastAPI Backend
   ↓
File Upload
   ↓
File Validation
   ↓
JPEG Conversion
   ↓
ML-Ready Image

## Current Features

- FastAPI backend
- File upload API
- File type validation
- Maximum file size validation
- JPG conversion
- PNG to JPEG conversion
- WEBP to JPEG conversion
- Unique file naming
- CORS support
- Health check endpoint

## Supported Input Formats

- JPG
- JPEG
- PNG
- WEBP

Planned:

- PDF
- DICOM (.dcm)

## Project Structure

mediscan-backend/
│
├── main.py
├── requirements.txt
├── README.md
├── .gitignore
│
├── uploads/
│   └── .gitkeep
│
└── converted/
    └── .gitkeep

## Installation

Create a virtual environment:

```bash
python -m venv venv