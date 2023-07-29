
/**
 * The onLoad function retrieves university and student data based on a filter, and then passes the student data to an HTML
 * web resource control.
 * @param context - The `context` parameter is the execution context of the form. It provides access to various properties
 * and methods related to the form and its controls. In this code, it is used to get the form context using the
 * `getFormContext()` method.
 */
async function onLoad(context) {
    context.getEventArgs().disableAsyncTimeout(); // test: use with caution could effect performance
    const formContext = context.getFormContext();
    const universityName = formContext.getAttribute("in23gl_universityname").getValue();
    const universityFilter = `?$filter=in23gl_universityname eq '${universityName}'`;

    try {
        const universityResult = await Xrm.WebApi.retrieveMultipleRecords("in23gl_university", universityFilter);
        const universityId = universityResult.entities[0].in23gl_universityid;

        const studentFilter = `?$filter=_in23gl_university_value eq '${universityId}'`;
        const studentsResult = await Xrm.WebApi.retrieveMultipleRecords("in23gl_student", studentFilter);
        const studentData = studentsResult.entities;

        const htmlControl = formContext.getControl("WebResource_Student");
        const contentWindow = await htmlControl.getContentWindow();
        contentWindow.fetchStudents(studentData);
    } catch (error) {
        console.log(error);
    }
    return Promise.resolve();
}

