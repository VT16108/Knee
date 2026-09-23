from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from PIL import Image
import shutil
import uuid

# --------------------------------------------------
# App Configuration
# --------------------------------------------------

app = FastAPI(
    title="MediScan AI Backend",
    description="Backend for medical image upload and JPEG conversion",
    version="1.0.0"
)

# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# Folders
# --------------------------------------------------

UPLOAD_DIR = Path("uploads")
CONVERTED_DIR = Path("converted")

UPLOAD_DIR.mkdir(exist_ok=True)
CONVERTED_DIR.mkdir(exist_ok=True)

# --------------------------------------------------
# Allowed file types
# --------------------------------------------------

ALLOWED_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".pdf",
    ".dcm",
}

MAX_FILE_SIZE = 50 * 1024 * 1024  # 50 MB


# --------------------------------------------------
# Root endpoint
# --------------------------------------------------

@app.get("/")
def root():
    return {
        "message": "MediScan AI Backend is running",
        "status": "online"
    }


# --------------------------------------------------
# Health check
# --------------------------------------------------

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


# --------------------------------------------------
# Upload endpoint
# --------------------------------------------------

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    # Get file extension
    file_extension = Path(file.filename).suffix.lower()

    # Check extension
    if file_extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=(
                "Unsupported file type. "
                "Allowed: JPG, JPEG, PNG, WEBP, PDF, DICOM"
            )
        )

    # Generate unique filename
    unique_id = uuid.uuid4().hex

    original_filename = Path(file.filename).name

    saved_filename = f"{unique_id}{file_extension}"

    upload_path = UPLOAD_DIR / saved_filename

    # --------------------------------------------------
    # Save uploaded file
    # --------------------------------------------------

    try:
        with upload_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Could not save uploaded file: {str(e)}"
        )

    # --------------------------------------------------
    # Check file size
    # --------------------------------------------------

    file_size = upload_path.stat().st_size

    if file_size > MAX_FILE_SIZE:
        upload_path.unlink(missing_ok=True)

        raise HTTPException(
            status_code=413,
            detail="File is too large. Maximum allowed size is 50 MB."
        )

    # --------------------------------------------------
    # Convert to JPEG
    # --------------------------------------------------

    jpeg_filename = f"{unique_id}.jpg"
    jpeg_path = CONVERTED_DIR / jpeg_filename

    try:

        # PDF is not directly handled by Pillow.
        # PDF conversion will be implemented separately.
        if file_extension == ".pdf":

            upload_path.unlink(missing_ok=True)

            raise HTTPException(
                status_code=501,
                detail="PDF conversion will be added in the next backend version."
            )

        # DICOM conversion requires pydicom.
        # It will be implemented in the next version.
        elif file_extension == ".dcm":

            upload_path.unlink(missing_ok=True)

            raise HTTPException(
                status_code=501,
                detail="DICOM conversion will be added in the next backend version."
            )

        else:

            image = Image.open(upload_path)

            # Convert image to RGB
            if image.mode != "RGB":
                image = image.convert("RGB")

            # Save as JPEG
            image.save(
                jpeg_path,
                format="JPEG",
                quality=95
            )

    except HTTPException:
        raise

    except Exception as e:

        upload_path.unlink(missing_ok=True)

        raise HTTPException(
            status_code=400,
            detail=f"Could not convert file to JPEG: {str(e)}"
        )

    # --------------------------------------------------
    # Response
    # --------------------------------------------------

    return {
        "success": True,
        "message": "File uploaded and converted successfully",
        "original_filename": original_filename,
        "uploaded_file": str(upload_path),
        "converted_file": str(jpeg_path),
        "file_size_bytes": file_size,
        "ml_ready": True
    }