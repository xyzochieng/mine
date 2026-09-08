// ==========================================
// Mineral Verification Admin System
// ==========================================


// ==========================================
// SETTINGS
// ==========================================

// First Report ID
const STARTING_REPORT_ID = 2350;


// Verification page
const BASE_URL =
    "https://laboratorymining.co.ke/index.html";


// ==========================================
// GET NEXT REPORT ID
// ==========================================

function getNextReportId() {

    let storedId =
        localStorage.getItem(
            "nextMineralReportId"
        );


    // First time using the system

    if (!storedId) {

        storedId =
            STARTING_REPORT_ID;

        localStorage.setItem(
            "nextMineralReportId",
            storedId
        );

    }


    return parseInt(storedId, 10);

}


// ==========================================
// SAVE NEXT REPORT ID
// ==========================================

function setNextReportId(id) {

    localStorage.setItem(
        "nextMineralReportId",
        id
    );

}


// ==========================================
// GENERATE SAMPLE REFERENCE
// ==========================================
//
// Report ID 2350
// becomes
// MCL-2026-002350
//
// Report ID 2351
// becomes
// MCL-2026-002351
//
// The numeric part is EXACTLY the same
// as the Report ID, only padded to 6 digits.
//

function generateSampleReference(reportId) {

    const year =
        new Date().getFullYear();


    const paddedId =
        String(reportId).padStart(6, "0");


    return `MCL-${year}-${paddedId}`;

}


// ==========================================
// SET TODAY'S DATE
// ==========================================

function getTodayDate() {

    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(today.getMonth() + 1)
            .padStart(2, "0");


    const day =
        String(today.getDate())
            .padStart(2, "0");


    return `${year}-${month}-${day}`;

}


// ==========================================
// INITIALIZE FORM
// ==========================================

function initializeForm() {


    // Get next report number

    const reportId =
        getNextReportId();


    // Generate matching sample reference

    const sampleReference =
        generateSampleReference(
            reportId
        );


    // Fill Report ID

    document.getElementById(
        "reportId"
    ).value =
        reportId;


    // Fill Sample Reference

    document.getElementById(
        "sampleReference"
    ).value =
        sampleReference;


    // Fill Approved By

    document.getElementById(
        "approvedBy"
    ).value =
        "MICAH KEREU";


    // Fill today's date

    document.getElementById(
        "reportDate"
    ).value =
        getTodayDate();

}


// ==========================================
// REPORT ID CHANGED
// ==========================================

document
    .getElementById("reportId")
    .addEventListener(
        "input",
        function () {


            const reportId =
                this.value.trim();


            // Only automatically change the
            // Sample Reference when the Report ID
            // is a valid number.

            if (
                reportId !== "" &&
                !isNaN(reportId)
            ) {


                document.getElementById(
                    "sampleReference"
                ).value =
                    generateSampleReference(
                        reportId
                    );

            }

        }
    );


// ==========================================
// GENERATE REPORT
// ==========================================

document
    .getElementById("generateBtn")
    .addEventListener(
        "click",
        function () {


            // ==================================
            // GET FORM VALUES
            // ==================================

            const reportId =
                document
                    .getElementById("reportId")
                    .value
                    .trim();


            const clientName =
                document
                    .getElementById("clientName")
                    .value
                    .trim();


            const clientType =
                document
                    .getElementById("clientType")
                    .value;


            const sampleType =
                document
                    .getElementById("sampleType")
                    .value;


            const sampleReference =
                document
                    .getElementById(
                        "sampleReference"
                    )
                    .value
                    .trim();


            const reportDate =
                document
                    .getElementById("reportDate")
                    .value;


            const approvedBy =
                document
                    .getElementById("approvedBy")
                    .value
                    .trim();


            // ==================================
            // VALIDATION
            // ==================================

            if (

                reportId === "" ||

                clientName === "" ||

                sampleReference === "" ||

                reportDate === "" ||

                approvedBy === ""

            ) {

                alert(
                    "Please complete all fields."
                );

                return;

            }


            // Make sure Report ID is numeric

            if (isNaN(reportId)) {

                alert(
                    "Report ID must be a number."
                );

                return;

            }


            // ==================================
            // GENERATE VERIFICATION URL
            // ==================================

            const verificationUrl =
                `${BASE_URL}?id=${encodeURIComponent(
                    reportId
                )}`;


            // ==================================
            // CREATE REPORT DATA
            // ==================================

            const report = {

                verification:
                    verificationUrl,

                laboratoryNumber:
                    reportId,

                clientName:
                    clientName,

                clientType:
                    clientType,

                sampleType:
                    sampleType,

                sampleReference:
                    sampleReference,

                reportDate:
                    reportDate,

                approvedBy:
                    approvedBy,

                verificationUrl:
                    verificationUrl

            };


            // ==================================
            // DISPLAY URL
            // ==================================

            document.getElementById(
                "generatedUrl"
            ).value =
                verificationUrl;


            // ==================================
            // GENERATE QR CODE
            // ==================================

            const qrContainer =
                document.getElementById(
                    "qrcode"
                );


            // Remove previous QR code

            qrContainer.innerHTML = "";


            // Create new QR code

            new QRCode(

                qrContainer,

                {

                    text:
                        verificationUrl,

                    width:
                        220,

                    height:
                        220,

                    correctLevel:
                        QRCode.CorrectLevel.H

                }

            );


            // ==================================
            // CREATE JSON DOWNLOAD
            // ==================================

            const blob =
                new Blob(

                    [
                        JSON.stringify(
                            report,
                            null,
                            4
                        )
                    ],

                    {
                        type:
                            "application/json"
                    }

                );


            const link =
                document.createElement(
                    "a"
                );


            link.href =
                URL.createObjectURL(
                    blob
                );


            link.download =
                `${reportId}.json`;


            // Store download link

            window.generatedFile =
                link;


            // ==================================
            // SAVE NEXT REPORT ID
            // ==================================

            const nextId =
                parseInt(reportId, 10) + 1;


            setNextReportId(
                nextId
            );


            // ==================================
            // PREPARE NEXT REPORT
            // ==================================

            document.getElementById(
                "reportId"
            ).value =
                nextId;


            // Automatically create:

            // MCL-2026-002351

            document.getElementById(
                "sampleReference"
            ).value =
                generateSampleReference(
                    nextId
                );


            // Reset Approved By to default

            document.getElementById(
                "approvedBy"
            ).value =
                "MICAH KEREU";


            // ==================================
            // SUCCESS MESSAGE
            // ==================================

            alert(
                `Report ${reportId} generated successfully.`
            );

        }
    );


// ==========================================
// DOWNLOAD JSON
// ==========================================

document
    .getElementById("downloadJson")
    .addEventListener(
        "click",
        function () {


            if (!window.generatedFile) {

                alert(
                    "Generate the report first."
                );

                return;

            }


            window.generatedFile.click();

        }
    );


// ==========================================
// COPY URL
// ==========================================

document
    .getElementById("copyURL")
    .addEventListener(
        "click",
        async function () {


            const url =
                document
                    .getElementById(
                        "generatedUrl"
                    )
                    .value;


            if (url === "") {

                alert(
                    "Generate the report first."
                );

                return;

            }


            try {


                await navigator
                    .clipboard
                    .writeText(url);


                alert(
                    "Verification URL copied."
                );


            } catch (error) {


                alert(
                    "Unable to copy the URL."
                );


            }

        }
    );


// ==========================================
// COPY QR CODE
// ==========================================

document
    .getElementById("copyQR")
    .addEventListener(
        "click",
        async function () {


            // Find QR canvas

            const qrCanvas =
                document.querySelector(
                    "#qrcode canvas"
                );


            // QR hasn't been generated

            if (!qrCanvas) {

                alert(
                    "Generate the report first."
                );

                return;

            }


            try {


                // Convert QR canvas to PNG

                qrCanvas.toBlob(
                    async function (blob) {


                        if (!blob) {

                            alert(
                                "Unable to create QR code image."
                            );

                            return;

                        }


                        // Create clipboard item

                        const clipboardItem =
                            new ClipboardItem({

                                "image/png":
                                    blob

                            });


                        // Copy image

                        await navigator
                            .clipboard
                            .write([
                                clipboardItem
                            ]);


                        alert(
                            "QR code copied to clipboard."
                        );


                    }
                );


            } catch (error) {


                console.error(
                    "QR copy error:",
                    error
                );


                alert(
                    "Your browser does not allow copying the QR code directly."
                );


            }

        }
    );


// ==========================================
// INITIALIZE ADMIN PAGE
// ==========================================

initializeForm();
