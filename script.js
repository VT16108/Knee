// =========================================
// MEDISCAN AI - MAIN JAVASCRIPT
// =========================================


// =========================================
// 1. SIDEBAR TOGGLE FUNCTIONALITY
// =========================================

// Get HTML elements

const openSidebarBtn = document.getElementById('openSidebarBtn');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');
const sidebarMenu = document.getElementById('sidebarMenu');
const sidebarOverlay = document.getElementById('sidebarOverlay');


// Open sidebar

function openSidebar() {

    if (sidebarMenu) {
        sidebarMenu.classList.add('active');
    }

    if (sidebarOverlay) {
        sidebarOverlay.classList.add('active');
    }

    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
}


// Close sidebar

function closeSidebar() {

    if (sidebarMenu) {
        sidebarMenu.classList.remove('active');
    }

    if (sidebarOverlay) {
        sidebarOverlay.classList.remove('active');
    }

    // Allow background scrolling again
    document.body.style.overflow = '';
}


// Button events

if (openSidebarBtn) {
    openSidebarBtn.addEventListener('click', openSidebar);
}

if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener('click', closeSidebar);
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
}


// =========================================
// 2. CLOSE SIDEBAR WITH ESCAPE KEY
// =========================================

document.addEventListener('keydown', function (event) {

    if (event.key === 'Escape') {
        closeSidebar();
    }

});


// =========================================
// 3. CLOSE SIDEBAR WHEN NAVIGATION LINK
//    IS CLICKED
// =========================================

const sidebarLinks = document.querySelectorAll(
    '.sidebar-nav-links a'
);

sidebarLinks.forEach(function (link) {

    link.addEventListener('click', function () {

        closeSidebar();

    });

});


// =========================================
// 4. CT SCAN UPLOAD FUNCTIONALITY
// =========================================

// Find the Upload CT Scan button

const uploadCTButton = document.querySelector(
    '.btn-primary'
);


// Create a hidden file input using JavaScript

const ctFileInput = document.createElement('input');

ctFileInput.type = 'file';

ctFileInput.accept =
    '.png,.jpg,.jpeg,.webp,.pdf,.dcm';

ctFileInput.style.display = 'none';

document.body.appendChild(ctFileInput);


// When Upload CT Scan button is clicked

if (uploadCTButton) {

    uploadCTButton.addEventListener('click', function () {

        ctFileInput.click();

    });

}


// =========================================
// 5. HANDLE SELECTED CT FILE
// =========================================

ctFileInput.addEventListener('change', function () {

    const file = this.files[0];

    if (!file) {
        return;
    }


    // Maximum file size = 50 MB

    const maxSize = 50 * 1024 * 1024;


    if (file.size > maxSize) {

        alert(
            'File is too large. Please select a file smaller than 50 MB.'
        );

        ctFileInput.value = '';

        return;
    }


    // Allowed file types

    const allowedTypes = [

        'image/png',
        'image/jpeg',
        'image/webp',
        'application/pdf'

    ];


    // DICOM files may have an empty MIME type

    const fileExtension =
        file.name.split('.').pop().toLowerCase();


    const allowedExtensions = [
        'png',
        'jpg',
        'jpeg',
        'webp',
        'pdf',
        'dcm'
    ];


    if (
        !allowedTypes.includes(file.type) &&
        !allowedExtensions.includes(fileExtension)
    ) {

        alert(
            'Please upload a valid CT scan file (PNG, JPG, WEBP, PDF or DICOM).'
        );

        ctFileInput.value = '';

        return;
    }


    // Show successful upload message

    showNotification(
        `CT Scan "${file.name}" selected successfully.`,
        'success'
    );


    console.log('Selected CT Scan:');
    console.log('File name:', file.name);
    console.log('File size:', formatFileSize(file.size));
    console.log('File type:', file.type);


    // Show file information

    showUploadedFile(file);

});


// =========================================
// 6. FORMAT FILE SIZE
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

    const i = Math.floor(
        Math.log(bytes) / Math.log(1024)
    );

    return (
        parseFloat(
            (bytes / Math.pow(1024, i)).toFixed(2)
        )
        + ' '
        + units[i]
    );
}


// =========================================
// 7. SHOW UPLOADED FILE INFORMATION
// =========================================

function showUploadedFile(file) {

    // Remove previous file information

    const oldFileInfo =
        document.getElementById('uploadedFileInfo');

    if (oldFileInfo) {
        oldFileInfo.remove();
    }


    // Create new information box

    const fileInfo =
        document.createElement('div');

    fileInfo.id = 'uploadedFileInfo';

    fileInfo.innerHTML = `

        <strong>CT Scan Selected</strong>

        <br>

        <span>
            ${file.name}
        </span>

        <br>

        <small>
            Size: ${formatFileSize(file.size)}
        </small>

    `;


    // Basic styling

    fileInfo.style.marginTop = '20px';

    fileInfo.style.padding = '15px';

    fileInfo.style.background = 'rgba(255,255,255,0.9)';

    fileInfo.style.borderRadius = '12px';

    fileInfo.style.fontSize = '14px';

    fileInfo.style.color = '#0F172A';

    fileInfo.style.boxShadow =
        '0 5px 15px rgba(0,0,0,0.08)';


    // Add after hero buttons

    const heroButtons =
        document.querySelector('.hero-buttons');

    if (heroButtons) {

        heroButtons.parentNode.insertBefore(
            fileInfo,
            heroButtons.nextSibling
        );

    }

}


// =========================================
// 8. VIEW HOSPITALS BUTTON
// =========================================

const hospitalsButton = document.querySelector(
    '.btn-secondary'
);


if (hospitalsButton) {

    hospitalsButton.addEventListener(
        'click',
        function () {

            showHospitals();

        }
    );

}


// =========================================
// 9. HOSPITAL INFORMATION
// =========================================

function showHospitals() {

    // Example hospital data
    // You can later replace this with
    // real API/database information.

    const hospitals = [

        {
            name: 'Government Hospital',
            type: 'Government',
            wait: 'Check availability',
            distance: 'Nearby'
        },

        {
            name: 'City Orthopedic Center',
            type: 'Private',
            wait: 'Check availability',
            distance: 'Nearby'
        },

        {
            name: 'Advanced Bone & Joint Hospital',
            type: 'Private',
            wait: 'Check availability',
            distance: 'Nearby'
        }

    ];


    // Remove existing modal

    const oldModal =
        document.getElementById('hospitalModal');

    if (oldModal) {
        oldModal.remove();
    }


    // Create modal

    const modal =
        document.createElement('div');

    modal.id = 'hospitalModal';


    modal.innerHTML = `

        <div class="hospital-modal-box">

            <button
                id="closeHospitalModal"
                class="hospital-close"
            >
                ×
            </button>

            <h2>Nearby Hospitals</h2>

            <p>
                Compare available hospital options.
            </p>

            <div class="hospital-list">

                ${hospitals.map(function (hospital) {

                    return `

                        <div class="hospital-item">

                            <h3>
                                ${hospital.name}
                            </h3>

                            <p>
                                ${hospital.type} Hospital
                            </p>

                            <span>
                                ${hospital.distance}
                            </span>

                            <button
                                class="hospital-check-btn"
                            >
                                ${hospital.wait}
                            </button>

                        </div>

                    `;

                }).join('')}

            </div>

        </div>

    `;


    // Modal styling

    modal.style.position = 'fixed';

    modal.style.inset = '0';

    modal.style.background =
        'rgba(15,23,42,0.45)';

    modal.style.display = 'flex';

    modal.style.alignItems = 'center';

    modal.style.justifyContent = 'center';

    modal.style.zIndex = '2000';

    modal.style.padding = '20px';


    document.body.appendChild(modal);


    // Close button

    const closeButton =
        document.getElementById(
            'closeHospitalModal'
        );


    if (closeButton) {

        closeButton.addEventListener(
            'click',
            function () {

                modal.remove();

            }
        );

    }


    // Close when clicking outside

    modal.addEventListener(
        'click',
        function (event) {

            if (event.target === modal) {

                modal.remove();

            }

        }
    );

}


// =========================================
// 10. SEARCH FUNCTIONALITY
// =========================================

const searchInput =
    document.querySelector('.search-input');


if (searchInput) {

    searchInput.addEventListener(
        'keydown',
        function (event) {

            if (event.key === 'Enter') {

                performSearch(
                    searchInput.value.trim()
                );

            }

        }
    );

}


// Search function

function performSearch(query) {

    if (!query) {

        showNotification(
            'Please enter something to search.',
            'warning'
        );

        return;

    }


    console.log(
        'Searching for:',
        query
    );


    showNotification(
        `Searching for "${query}"...`,
        'success'
    );


    // You can later connect this function
    // to your AI/API/backend.
}


// =========================================
// 11. LOGIN BUTTON
// =========================================

const loginButton =
    document.querySelector('.login-btn');


if (loginButton) {

    loginButton.addEventListener(
        'click',
        function () {

            showLoginMessage();

        }
    );

}


function showLoginMessage() {

    showNotification(
        'Login functionality will be available soon.',
        'success'
    );

}


// =========================================
// 12. NOTIFICATION SYSTEM
// =========================================

function showNotification(message, type) {

    // Remove previous notification

    const oldNotification =
        document.getElementById(
            'mediScanNotification'
        );

    if (oldNotification) {
        oldNotification.remove();
    }


    // Create notification

    const notification =
        document.createElement('div');

    notification.id =
        'mediScanNotification';


    notification.textContent =
        message;


    // Basic styling

    notification.style.position =
        'fixed';

    notification.style.right =
        '25px';

    notification.style.bottom =
        '25px';

    notification.style.padding =
        '15px 22px';

    notification.style.borderRadius =
        '12px';

    notification.style.background =
        '#0F172A';

    notification.style.color =
        'white';

    notification.style.fontSize =
        '14px';

    notification.style.fontWeight =
        '500';

    notification.style.boxShadow =
        '0 10px 30px rgba(0,0,0,0.2)';

    notification.style.zIndex =
        '3000';

    notification.style.maxWidth =
        '350px';


    document.body.appendChild(
        notification
    );


    // Automatically remove after 3 seconds

    setTimeout(function () {

        notification.remove();

    }, 3000);

}


// =========================================
// 13. SMOOTH SCROLLING
// =========================================

document.querySelectorAll(
    'a[href^="#"]'
).forEach(function (link) {

    link.addEventListener(
        'click',
        function (event) {

            const targetId =
                this.getAttribute('href');

            if (
                targetId &&
                targetId !== '#'
            ) {

                const target =
                    document.querySelector(
                        targetId
                    );

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: 'smooth'
                    });

                }

            }

        }
    );

});


// =========================================
// 14. KEYBOARD SHORTCUTS
// =========================================

document.addEventListener(
    'keydown',
    function (event) {

        // Ctrl + U
        // Open CT upload

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === 'u'
        ) {

            event.preventDefault();

            if (ctFileInput) {
                ctFileInput.click();
            }

        }

        // "/" focuses search

        if (
            event.key === '/' &&
            document.activeElement !== searchInput
        ) {

            event.preventDefault();

            if (searchInput) {
                searchInput.focus();
            }

        }

    }
);


// =========================================
// 15. PAGE LOAD MESSAGE
// =========================================

window.addEventListener(
    'load',
    function () {

        console.log(
            'MediScan AI loaded successfully.'
        );

        console.log(
            'Available features:'
        );

        console.log(
            '- Sidebar'
        );

        console.log(
            '- CT Scan Upload'
        );

        console.log(
            '- Hospital Search'
        );

        console.log(
            '- Website Search'
        );

        console.log(
            '- Login'
        );

    }
);