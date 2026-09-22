// ----------------------------------
// SHOW UPLOADED FILE NAME
// ----------------------------------

const fileName = sessionStorage.getItem('ctFileName');

if (fileName) {

    document.getElementById('fileName').textContent =
        `Uploaded file: ${fileName}`;

}



// ----------------------------------
// DOCTOR INFORMATION
// ----------------------------------

const doctors = {

    doctor1: {

        name: "Dr. Rahul Sharma",

        specialty: "Orthopedic Specialist",

        experience: "12+ Years",

        hospital: "MediCare Orthopedic Centre",

        location: "New Delhi",

        qualification: "MBBS, MS Orthopedics",

        consultation: "₹800",

        description:
            "Specializes in diagnosis and treatment of joint, bone and musculoskeletal conditions."

    },


    doctor2: {

        name: "Dr. Priya Mehta",

        specialty: "Orthopedic Surgeon",

        experience: "10+ Years",

        hospital: "City Orthopedic Hospital",

        location: "Mumbai",

        qualification: "MBBS, MS Orthopedics",

        consultation: "₹1000",

        description:
            "Provides orthopedic consultations and surgical treatment for various joint conditions."

    },


    doctor3: {

        name: "Dr. Arjun Verma",

        specialty: "Joint Replacement Specialist",

        experience: "15+ Years",

        hospital: "Advanced Joint Care Centre",

        location: "Bangalore",

        qualification: "MBBS, DNB Orthopedics",

        consultation: "₹1200",

        description:
            "Focuses on joint replacement procedures and management of orthopedic conditions."

    }

};



// ----------------------------------
// SHOW DOCTOR DETAILS
// ----------------------------------

function showDoctor(doctorId) {

    const doctor = doctors[doctorId];

    if (!doctor) return;


    const details = document.getElementById('doctorDetails');


    details.innerHTML = `

        <div class="large-doctor-avatar">
            👨‍⚕️
        </div>

        <h2>
            ${doctor.name}
        </h2>

        <p class="doctor-specialty">
            ${doctor.specialty}
        </p>


        <div class="doctor-detail-list">

            <p>
                <strong>Experience:</strong>
                ${doctor.experience}
            </p>

            <p>
                <strong>Qualification:</strong>
                ${doctor.qualification}
            </p>

            <p>
                <strong>Hospital:</strong>
                ${doctor.hospital}
            </p>

            <p>
                <strong>Location:</strong>
                ${doctor.location}
            </p>

            <p>
                <strong>Consultation Fee:</strong>
                ${doctor.consultation}
            </p>

        </div>


        <div class="doctor-description">

            ${doctor.description}

        </div>


        <button class="appointment-button">
            Book Consultation
        </button>

    `;


    document
        .getElementById('doctorModal')
        .classList.add('active');
}



// ----------------------------------
// CLOSE DOCTOR DETAILS
// ----------------------------------

function closeDoctor() {

    document
        .getElementById('doctorModal')
        .classList.remove('active');

}



// Close modal when clicking outside
document
    .getElementById('doctorModal')
    .addEventListener('click', function(event) {

        if (event.target === this) {

            closeDoctor();

        }

    });