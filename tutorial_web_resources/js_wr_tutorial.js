
/**
 * The code `const xrm = { WebApi: Xrm.WebApi };` is creating a constant variable `xrm` and assigning it an object with a
 * property `WebApi`. The value of the `WebApi` property is `Xrm.WebApi`, which is  a reference to the Xrm library.This
 * allows us to access the Web API functionality through the `xrm` object in the html web resource.
 * */
const XRM = {
    WebApi: Xrm.WebApi
};

/* The line `const lookUpValue = {};` is creating a constant variable `lookUpValue` and assigning it an empty object `{}`.
This object can be used to store lookup values or any other data that needs to be passed between functions or accessed
globally within the code. */
const lookUpValue = {};
/**
 * The onLoad function retrieves university and student data based on a filter, and then passes the student data to an HTML
 * web resource control.
 * @param context - The `context` parameter is the execution context of the form. It provides access to various properties
 * and methods related to the form and its controls. In this code, it is used to get the form context using the
 * `getFormContext()` method.
 */
function onLoad(context) {
    executionContext = context;
    formContext = context.getFormContext();
    console.log("formContextOnLoad: ", formContext);

    const universityName = formContext.getAttribute("in23gl_universityname").getValue();
    const filter = `?$filter=in23gl_universityname eq '${universityName}'`;

    Xrm.WebApi.retrieveMultipleRecords("in23gl_university", filter).then (
        function success(universityRows) {
            lookUpValue.universityEntity = universityRows.entities[0];
            const universityId = universityRows.entities[0].in23gl_universityid;
            const idFilter = `?$filter=_in23gl_university_value eq '${universityId}'`;

            Xrm.WebApi.retrieveMultipleRecords("in23gl_student", idFilter).then(
                function success(students) {
                    studentData = students;
                    console.log("STUDENT DATA ONLOAD: ", students)
                    // Get the HTML web resource control
                    const htmlControl = formContext.getControl("WebResource_Student");
                    console.log("HTMLCONTROL: ", htmlControl)
                    // Use getContentWindow to get the window object of the HTML web resource
                    htmlControl.getContentWindow().then(
                        function success(contentWindow) {
                        // Call the fetchStudents function in the HTML web resource
                            contentWindow.xrm = XRM;
                            contentWindow.lookupData = lookUpValue;
                            contentWindow.fetchStudents(studentData);
                            console.log('lookUpValue', lookUpValue)
                            console.log("CNTWIN: ", contentWindow)
                        },
                        function error(error) {
                            console.log(error.message)
                        });

                },
                function error(error) {
                    console.log(error.message);
                }
            );
        },
        function error(error) {
            console.log(error.message);
        }
    );
}


