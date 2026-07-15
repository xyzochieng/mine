// ==========================================
// Mineral Verification Admin System
// ==========================================

// Generate Verification Reference
function generateVerificationReference(id){

    const year = new Date().getFullYear();

    return `MCL-${year}-${id.padStart(6,"0")}`;

}

// ----------------------------------
// Generate Report
// ----------------------------------

document.getElementById("generateBtn").addEventListener("click", function(){

    const reportId = document.getElementById("reportId").value.trim();

    const clientName = document.getElementById("clientName").value.trim();

    const clientType = document.getElementById("clientType").value;

    const sampleType = document.getElementById("sampleType").value;

    const sampleReference = document.getElementById("sampleReference").value.trim();

    const reportDate = document.getElementById("reportDate").value;

    const approvedBy = document.getElementById("approvedBy").value.trim();


    // Validation

    if(

        reportId==="" ||

        clientName==="" ||

        sampleReference==="" ||

        reportDate==="" ||

        approvedBy===""


    ){

        alert("Please complete all fields.");

        return;

    }

    // Automatic Verification Reference

    const verification = generateVerificationReference(reportId);

    // Create JSON

    const report = {

        verification,

        laboratoryNumber:reportId,

        clientName,

        clientType,

        sampleType,

        sampleReference,

        reportDate,

        approvedBy,


    };

    // Download JSON

    const blob = new Blob(

        [JSON.stringify(report,null,4)],

        {

            type:"application/json"

        }

    );

    const link=document.createElement("a");

    link.href=URL.createObjectURL(blob);

    link.download=`${reportId}.json`;

    // Generate URL

    const baseURL = "https://xyzochieng.github.io/mine/index.html";

    document.getElementById("generatedUrl").value =
        `${baseURL}?id=${reportId}`;

    // Store link so we can download later

    window.generatedFile = link;

});

// ----------------------------------
// Download JSON
// ----------------------------------

document.getElementById("downloadJson").addEventListener("click",function(){

    if(!window.generatedFile){

        alert("Generate the report first.");

        return;

    }

    window.generatedFile.click();

});

// ----------------------------------
// Copy URL
// ----------------------------------

document.getElementById("copyURL").addEventListener("click",function(){

    const url = document.getElementById("generatedUrl").value;

    if(url===""){

        alert("Generate the report first.");

        return;

    }

    navigator.clipboard.writeText(url);

    alert("Verification URL copied.");

});
