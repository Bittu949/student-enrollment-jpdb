var jpdbToken = "JPDB_TOKEN_HERE";
var dbName = "SCHOOL-DB";
var relName = "STUDENT-TABLE";
var recordNo = 0;

$(document).ready(function () {
    resetForm();
});

function resetForm() {
    $("#studentForm")[0].reset();

    $("#rollNo").prop("disabled", false).focus();
    $("#fullName, #className, #birthDate, #address, #enrollDate").prop("disabled", true);

    $("#saveBtn").prop("disabled", true);
    $("#updateBtn").prop("disabled", true);
    $("#resetBtn").prop("disabled", true);
}

function enableFields() {
    $("#fullName, #className, #birthDate, #address, #enrollDate").prop("disabled", false);
}

function validateAndGetFormData() {
    var rollNo = $("#rollNo").val().trim();
    var fullName = $("#fullName").val().trim();
    var className = $("#className").val().trim();
    var birthDate = $("#birthDate").val();
    var address = $("#address").val().trim();
    var enrollDate = $("#enrollDate").val();

    if (!rollNo || !fullName || !className || !birthDate || !address || !enrollDate) {
        alert("All fields are required");
        return "";
    }

    return JSON.stringify({
        rollNo: rollNo,
        fullName: fullName,
        className: className,
        birthDate: birthDate,
        address: address,
        enrollDate: enrollDate
    });
}

function getStudent() {
    var rollNo = $("#rollNo").val().trim();
    if (!rollNo) return;

    var getReqStr = createGET_BY_KEYRequest(
        jpdbToken,
        dbName,
        relName,
        JSON.stringify({ rollNo: rollNo }),
        true,
        true
    );

    $.ajaxSetup({ async: false });
    var res = executeCommand(getReqStr, "/api/irl");
    $.ajaxSetup({ async: true });

    $("#resetBtn").prop("disabled", false);

    if (res.status === 200 && res.data) {
        var dataObj = JSON.parse(res.data);
        recordNo = dataObj.rec_no;
        var record = dataObj.record;

        enableFields();

        $("#fullName").val(record.fullName);
        $("#className").val(record.className);
        $("#birthDate").val(record.birthDate);
        $("#address").val(record.address);
        $("#enrollDate").val(record.enrollDate);

        $("#rollNo").prop("disabled", true);
        $("#saveBtn").prop("disabled", true);
        $("#updateBtn").prop("disabled", false);
    } else {
        enableFields();
        $("#saveBtn").prop("disabled", false);
        $("#updateBtn").prop("disabled", true);
        $("#fullName").focus();
    }
}

function saveStudent() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") return;

    var putReqStr = createPUTRequest(jpdbToken, jsonStr, dbName, relName);

    $.ajaxSetup({ async: false });
    executeCommand(putReqStr, "/api/iml");
    $.ajaxSetup({ async: true });

    alert("Student record saved successfully");
    resetForm();
}

function updateStudent() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") return;

    var updateReqStr = createUPDATERecordRequest(jpdbToken, jsonStr, dbName, relName, recordNo);

    $.ajaxSetup({ async: false });
    executeCommand(updateReqStr, "/api/iml");
    $.ajaxSetup({ async: true });

    alert("Student record updated successfully");
    resetForm();
}