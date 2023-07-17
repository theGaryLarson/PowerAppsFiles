let formContext = null;
let executionContext = null;
const apiEndpoint = 'https://cfainternship.api.crm.dynamics.com/api/data/v9.2/in23gl_students';

function onLoad(context) {
    executionContext = context;
    formContext = context.getFormContext();
    console.log("formContextOnLoad: ", formContext);
    Xrm.WebApi.retrieveMultipleRecords("in23gl_student").then(
        function success(result) {
            for (var i = 0; i < result.entities.length; i++) {
                console.log("result: ", result.entities[i]);
            }
            // perform additional operations on retrieved records
        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );
    fetchStudents(formContext); //todo: get this reading without throwing: Cannot read properties of null (reading 'insertRow')
}

function fetchStudents(formContext) {
        console.log("formContextFetchStudents: ", formContext)
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
