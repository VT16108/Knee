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


                <!-- ============================== -->
        <!-- PATIENT INFORMATION -->
        <!-- ============================== -->

        <div style="
            border-top: 1px solid #E2E8F0;
            margin-top: 15px;
            padding-top: 15px;
        ">

            <h3 style="
                margin-bottom: 15px;
                font-size: 16px;
            ">
                Patient Information
            </h3>


            <!-- PATIENT NAME -->

            <label style="
                display: block;
                margin-bottom: 5px;
                font-weight: 600;
            ">
                Patient Name
            </label>

            <input
                type="text"
                id="patientName"
                placeholder="Enter patient name"
                style="
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 12px;
                    border: 1px solid #CBD5E1;
                    border-radius: 7px;
                "
            >


            <!-- DATE OF OPERATION -->

            <label style="
                display: block;
                margin-bottom: 5px;
                font-weight: 600;
            ">
                Date of Operation
            </label>

            <input
                type="date"
                id="operationDate"
                max="${new Date().toISOString().split('T')[0]}"
                style="
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 12px;
                    border: 1px solid #CBD5E1;
                    border-radius: 7px;
                "
            >


            <!-- STUDY INSTANCE UID -->

            <label style="display:block;font-weight:600;margin-bottom:6px;">
                StudyInstanceUID
            </label>

            <input
                type="text"
                id="studyInstanceUID"
                placeholder="e.g. 1.2.826.0.1.3680043.8.498.100048732290990538690933"
                style="
                    width:100%;
                    padding:10px;
                    margin-bottom:5px;
                    border:1px solid #CBD5E1;
                    border-radius:7px;
                    box-sizing:border-box;
                "
            >

<small style="color:#64748B;">
    Example: 1.2.826.0.1.3680043.8.498.100048732290990538690933
</small>


            <!-- SAVE BUTTON -->

            <button
                id="savePatientDetails"
                style="
                    width: 100%;
                    padding: 12px;
                    background: #2563EB;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                "
            >
                Save Patient Details
            </button>


            <!-- AI BUTTON WILL APPEAR HERE -->

            <div id="aiButtonContainer"></div>

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


// =====================================
// SAVE PATIENT DETAILS
// =====================================

const savePatientDetails =
    document.getElementById(
        'savePatientDetails'
    );


if (savePatientDetails) {

    savePatientDetails.addEventListener(
        'click',
        function () {


            // Get patient information

            const patientName =
                document
                    .getElementById('patientName')
                    .value
                    .trim();


            const operationDate =
                document
                    .getElementById('operationDate')
                    .value;


            const studyInstanceUID =
                document
                    .getElementById('studyInstanceUID')
                    .value
                    .trim();

            const studyUIDPattern = /^[0-9]+(\.[0-9]+)+$/;

                if (!studyInstanceUID) {
                    showNotification(
                        'Please enter the StudyInstanceUID.',
                        'error'
                    );
                    return;
                }

                if (
                    !studyUIDPattern.test(studyInstanceUID) ||
                    studyInstanceUID.length > 64
                ) {
                    showNotification(
                        'Please enter a valid StudyInstanceUID in DICOM format.',
                        'error'
                    );
                    return;
                }

            // =================================
            // VALIDATE PATIENT NAME
            // =================================

            if (!patientName) {

                showNotification(
                    'Please enter the patient name.',
                    'error'
                );

                return;
            }


            // =================================
            // VALIDATE OPERATION DATE
            // =================================

            if (!operationDate) {

                showNotification(
                    'Please enter the date of operation.',
                    'error'
                );

                return;
            }


            const today =
                new Date().toISOString().split('T')[0];


            if (operationDate > today) {

                showNotification(
                    'Date of operation cannot be a future date.',
                    'error'
                );

                return;
            }


            // =================================
            // VALIDATE STUDY INSTANCE UID
            // =================================

            if (!studyInstanceUID) {

                showNotification(
                    'Please enter the StudyInstanceUID.',
                    'error'
                );

                return;
            }


            // =================================
            // SAVE DATA
            // =================================

            sessionStorage.setItem(
                'patientName',
                patientName
            );

            sessionStorage.setItem(
                'operationDate',
                operationDate
            );

            sessionStorage.setItem(
                'studyInstanceUID',
                studyInstanceUID
            );

            // Save CT file information

            sessionStorage.setItem(
                'ctFileName',
                file.name
            );

            sessionStorage.setItem(
                'ctFileSize',
                file.size
            );

            sessionStorage.setItem(
                'ctFileType',
                fileType
            );


            // =================================
            // SHOW SUCCESS
            // =================================

            savePatientDetails.textContent =
                '✓ Patient Details Saved';

            savePatientDetails.style.background =
                '#16A34A';


            // =================================
            // CREATE AI BUTTON
            // =================================

            const aiButtonContainer =
                document.getElementById(
                    'aiButtonContainer'
                );


            aiButtonContainer.innerHTML = `

                <button
                    id="readyAIButton"
                    style="
                        width: 100%;
                        margin-top: 12px;
                        padding: 13px;
                        background: #2563EB;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                    "
                >
                    Ready for AI Analysis
                </button>

            `;


            // =================================
            // READY FOR AI ANALYSIS
            // =================================

            const readyAIButton =
                document.getElementById(
                    'readyAIButton'
                );


            readyAIButton.addEventListener(
                'click',
                function () {

                    window.location.href =
                        'ai-results.html';

                }
            );


            showNotification(
                'Patient details saved successfully!',
                'success'
            );

        }
    );

}

}