let formContext = null;
let executionContext = null;
const apiEndpoint = 'https://cfainternship.api.crm.dynamics.com/api/data/v9.2/in23gl_students';

function onLoad(context) {
    executionContext = context;
    formContext = context.getFormContext();
    console.log("formContextOnLoad: ", formContext);

    const  universityName = formContext.getAttribute("in23gl_universityname").getValue();
    const filter = `?$filter=in23gl_universityname eq '${universityName}'`;
    // console.log(universityName);
    Xrm.WebApi.retrieveMultipleRecords("in23gl_university", filter).then (
        function success(universityRows) {
            const universityId = universityRows.entities[0].in23gl_universityid;
            const idFilter = `?$filter=_in23gl_university_value eq '${universityId}'`;

            Xrm.WebApi.retrieveMultipleRecords("in23gl_student", idFilter).then(
                function success(students) {
                    // perform additional operations on retrieved records
                    fetchStudents(students);

                },
                function (error) {
                    console.log(error.message);
                    // handle error conditions
                }
            );
        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );

}

function fetchStudents(students) {
        console.log("Students: ", students)
        // .then(function success(result) {
        //     console.log("Successfully connected to 'in23gl_student'. Number of records retrieved: ", result.entities.length);
        // }, function(error) {
        //     console.error("Error connecting to 'in23gl_student': ", error.message);
        // });
}



function createStudent() {

}

function updateStudent(id) {

}
function deleteRow(button) {
    // Get the row of the button
    const row = button.parentNode.parentNode;
    // TODO: remove html row after success on removal from db
    const id = row.cells[0].textContent;
    console.log("ID: ", id);
    // Remove record from dataverse table
    // on success remove record from table
    row.parentNode.removeChild(row);
}

let students = [
    {
        pKey: 1,
        firstname: 'John',
        lastname: 'Doe',
        dob: '1990-01-01',
        email: 'john.doe@example.com',
        university: 'University A'
    },
    {
        pKey: 2,
        firstname: 'Jane',
        lastname: 'Doe',
        dob: '1991-02-02',
        email: 'jane.doe@example.com',
        university: 'University B'
    },
    {
        pKey: 3,
        firstname: 'Bob',
        lastname: 'Smith',
        dob: '1992-03-03',
        email: 'bob.smith@example.com',
        university: 'University C'
    },
    {
        pKey: 4,
        firstname: 'Alice',
        lastname: 'Johnson',
        dob: '1993-04-04',
        email: 'alice.johnson@example.com',
        university: 'University D'
    }
];
