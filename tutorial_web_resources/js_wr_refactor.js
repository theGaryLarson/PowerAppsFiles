const XRM = {
    WebApi: Xrm.WebApi
};

const lookUpValue = {};

let formContext = null;
let executionContext = null;

function handleWindowContent(contentWindow) {
    contentWindow.xrm = XRM;
    contentWindow.lookupData = lookUpValue;
    console.log('lookUpValue', lookUpValue)
    console.log("CNTWIN: ", contentWindow)
    contentWindow.fetchStudents(studentData);
}

function handleError(error) {
    console.log(error.message);
    const alertStrings = { confirmButtonLabel: "Ok",
        text: "Created Student Successfully with ID " + result.id,
        title: "Update Alert" };
    Xrm.Navigation.openErrorDialog({ message: error.message }).then(
        function (success) {
            console.log("Error dialog closed");
        },
        function (error) {
            console.log("An error occurred while opening the error dialog: ", error.message);
        }
    );
}

function handleStudentRecords(students) {
    studentData = students;
    console.log("STUDENT DATA ONLOAD: ", students)
    const htmlControl = formContext.getControl("WebResource_Student");
    console.log("HTMLCONTROL: ", htmlControl)
    htmlControl.getContentWindow().then(handleWindowContent, handleError);
}

function handleUniversityRecords(universityRows) {
    lookUpValue.universityEntity = universityRows.entities[0];
    const universityId = universityRows.entities[0].in23gl_universityid;
    const idFilter = `?$filter=_in23gl_university_value eq '${universityId}'`;
    Xrm.WebApi.retrieveMultipleRecords("in23gl_student", idFilter).then(handleStudentRecords, handleError);
}

function onLoad(context) {
    executionContext = context;
    formContext = context.getFormContext();
    console.log("formContextOnLoad: ", formContext);

    const universityName = formContext.getAttribute("in23gl_universityname").getValue();
    const filter = `?$filter=in23gl_universityname eq '${universityName}'`;
    Xrm.WebApi.retrieveMultipleRecords("in23gl_university", filter).then(handleUniversityRecords, handleError);
}
