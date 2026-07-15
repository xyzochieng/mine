// ============================================
// Mineral Verification System
// ============================================

// Read the ID from the URL
const params = new URLSearchParams(window.location.search);
const reportId = params.get("id");

// Main
if (!reportId) {

    showError(
        "No Report ID",
        "No report ID was supplied in the URL."
    );

} else {

    loadReport(reportId);

}

// ============================================
// Load Report
// ============================================

async function loadReport(id){

    try{

        const response = await fetch(`reports/${id}.json`);

        if(!response.ok){

            throw new Error("Not Found");

        }

        const report = await response.json();

        displayReport(report);

    }

    catch(error){

        showError(

            "Report Not Found",

            `No report exists with Report ID ${id}.`

        );

    }

}

// ============================================
// Display Report
// ============================================

function displayReport(report){

    document.getElementById("verification").textContent =
    report.verification;

    document.getElementById("labNumber").textContent =
    report.laboratoryNumber;

    document.getElementById("clientName").textContent =
    report.clientName;

    document.getElementById("clientType").textContent =
    report.clientType;

    document.getElementById("sampleType").textContent =
    report.sampleType;

    document.getElementById("sampleReference").textContent =
    report.sampleReference;

    document.getElementById("reportDate").textContent =
    formatDate(report.reportDate);

    document.getElementById("approvedBy").textContent =
    report.approvedBy;

    document.getElementById("verificationDate").textContent =
    formatDateTime(new Date());

    document.getElementById("footerReference").textContent =
    report.verification;

}

// ============================================
// Error Screen
// ============================================

function showError(title,message){

    document.getElementById("app").innerHTML = `

    <div class="not-found">

        <h1>${title}</h1>

        <p>${message}</p>

    </div>

    `;

}

// ============================================
// Format Date
// ============================================

function formatDate(dateString){

    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB",{

        day:"2-digit",

        month:"short",

        year:"numeric"

    });

}

// ============================================
// Format Date & Time
// ============================================

function formatDateTime(dateString){

    const date = new Date(dateString);

    const datePart = date.toLocaleDateString("en-GB",{

        day:"2-digit",

        month:"short",

        year:"numeric"

    });

    const timePart = date.toLocaleTimeString([],{

        hour:"2-digit",

        minute:"2-digit",

        hour12:false

    });

    return `${datePart} ${timePart}`;

}