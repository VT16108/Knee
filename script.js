// =========================================
// CT SCAN UPLOAD FUNCTIONALITY
// =========================================

const uploadCTButton = document.querySelector('.btn-primary');


// Create hidden file input

const ctFileInput = document.createElement('input');

ctFileInput.type = 'file';

// Accepted formats

ctFileInput.accept = '.jpg,.jpeg,.png,.dcm';

ctFileInput.style.display = 'none';

document.body.appendChild(ctFileInput);


// =========================================
// OPEN FILE SELECTOR
// =========================================

if (uploadCTButton) {

    uploadCTButton.addEventListener(
        'click',
        function () {

            ctFileInput.click();

        }
    );

}


// =========================================
// HANDLE SELECTED FILE
// =========================================

ctFileInput.addEventListener(
    'change',
    function () {

        const file = this.files[0];

        if (!file) {
            return;
        }


        // =================================
        // MAXIMUM FILE SIZE = 100 MB
        // =================================

        const maxSize =
            100 * 1024 * 1024;


        if (file.size > maxSize) {

            showNotification(
                'File is too large. Maximum file size is 100 MB.',
                'error'
            );

            ctFileInput.value = '';

            return;
        }


        // =================================
        // GET FILE EXTENSION
        // =================================

        const fileExtension =
            file.name
                .split('.')
                .pop()
                .toLowerCase();


        // =================================
        // ACCEPTED FORMATS
        // =================================

        const imageFormats = [
            'jpg',
            'jpeg',
            'png'
        ];

        const dicomFormats = [
            'dcm'
        ];


        // =================================
        // CHECK FORMAT
        // =================================

        const isImage =
            imageFormats.includes(fileExtension);

        const isDicom =
            dicomFormats.includes(fileExtension);


        // =================================
        // INVALID FILE
        // =================================

        if (!isImage && !isDicom) {

            showNotification(
                'Invalid format. Please upload JPG, JPEG, PNG or DICOM (.dcm).',
                'error'
            );

            ctFileInput.value = '';

            return;
        }


        // =================================
        // DETERMINE FILE TYPE
        // =================================

        let fileType;

        if (isDicom) {

            fileType = 'DICOM';

        } else {

            fileType = 'Image';

        }


        // =================================
        // SHOW FILE INFORMATION
        // =================================

        showUploadedFile(
            file,
            fileType
        );


        // =================================
        // SUCCESS MESSAGE
        // =================================

        showNotification(
            'CT Scan selected successfully!',
            'success'
        );

    }
);


// =========================================
// FORMAT FILE SIZE
// =========================================

function formatFileSize(bytes) {

    if (bytes === 0) {
        return '0 Bytes';
    }


    const units = [
        'Bytes',
        'KB',
        'MB',
        'GB'
    ];


    const i =
        Math.floor(
            Math.log(bytes) /
            Math.log(1024)
        );


    return (
        parseFloat(
            (
                bytes /
                Math.pow(1024, i)
            ).toFixed(2)
        )
        +
        ' '
        +
        units[i]
    );

}


// =========================================
// SHOW UPLOADED FILE
// =========================================

function showUploadedFile(
    file,
    fileType
) {

    // Remove previous file information

    const oldFileInfo =
        document.getElementById(
            'uploadedFileInfo'
        );

    if (oldFileInfo) {
        oldFileInfo.remove();
    }


    // =====================================
    // CREATE FILE INFORMATION BOX
    // =====================================

    const fileInfo =
        document.createElement('div');

    fileInfo.id =
        'uploadedFileInfo';


    fileInfo.innerHTML = `

        <div style="
            font-size: 17px;
            font-weight: 700;
            margin-bottom: 10px;
        ">
            ✓ CT Scan Ready
        </div>


        <div style="margin-bottom: 5px;">
            <strong>File:</strong>
            ${file.name}
        </div>


        <div style="margin-bottom: 5px;">
            <strong>Format:</strong>
            ${fileType}
        </div>


        <div style="margin-bottom: 12px;">
            <strong>Size:</strong>
            ${formatFileSize(file.size)}
        </div>


        <div style="
            border-top: 1px solid #E2E8F0;
            padding-top: 10px;
            margin-bottom: 10px;
            color: #475569;
        ">
            <strong>Accepted formats:</strong>
            JPG, JPEG, PNG, DICOM (.dcm)
            <br>

            <strong>Maximum file size:</strong>
            100 MB
        </div>


        <div style="
            color: #2563EB;
            font-weight: 600;
        ">
            Ready for AI analysis
        </div>

    `;


    // =====================================
    // STYLE FILE INFORMATION BOX
    // =====================================

    fileInfo.style.marginTop =
        '15px';

    fileInfo.style.padding =
        '16px 18px';

    fileInfo.style.background =
        'rgba(255,255,255,0.95)';

    fileInfo.style.border =
        '1px solid #BFDBFE';

    fileInfo.style.borderRadius =
        '12px';

    fileInfo.style.fontSize =
        '14px';

    fileInfo.style.color =
        '#0F172A';

    fileInfo.style.boxShadow =
        '0 6px 18px rgba(0,0,0,0.08)';

    fileInfo.style.maxWidth =
        '450px';


    // =====================================
    // ADD TO PAGE
    // =====================================

    const heroButtons =
        document.querySelector('.hero-buttons');


    if (heroButtons) {

        heroButtons.parentNode.insertBefore(
            fileInfo,
            heroButtons.nextSibling
        );

    }

}