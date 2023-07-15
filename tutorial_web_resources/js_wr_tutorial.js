let formContext = null;
let executionContext = null;
const apiEndpoint = 'https://cfainternship.api.crm.dynamics.com/api/data/v9.2/in23gl_students';

function onLoad(context) {
    executionContext = context;
    formContext = context.getFormContext();
    console.log("formContextOnLoad: ", formContext);
    // fetchStudents(); //todo: get this reading without throwing: Cannot read properties of null (reading 'insertRow')
}

function fetchStudents(formContext) {
    // this returns null, why?
    console.log("formContextFetchStudents: ", formContext);
    // in23gl_js_wr_student:16 Uncaught ReferenceError: Xrm is not defined
    // at fetchStudents at HTMLButtonElement.onclick
    // Xrm.WebApi.retrieveMultipleRecords('in23gl_student')
    //     .then( studentData => {
    //         console.log("StudentData: ", studentData);
    //         console.log("studentData.entities: ", studentData.entities);
    //     })
    //     .catch(error => {
    //         console.error(error)
    //         console.log("ERROR");
    //     });


    // Process the result
    const table = document.getElementById('studentsTable');

    // Loop through the data and create a table row for each student
    students.forEach( student => {

        const row = table.insertRow();
        const idCell = row.insertCell()
        const firstNameCell = row.insertCell();
        const lastNameCell = row.insertCell();
        const dobCell = row.insertCell();
        const emailCell = row.insertCell();
        const universityCell = row.insertCell();
        const actionCell = row.insertCell();

        idCell.textContent = student.pKey;
        firstNameCell.textContent = student.firstname;
        lastNameCell.textContent = student.lastname;
        dobCell.textContent = student.dob;
        emailCell.textContent = student.email;
        universityCell.textContent = student.university;

        // Make the cells editable
        idCell.contentEditable = 'true';
        firstNameCell.contentEditable = 'true';
        lastNameCell.contentEditable = 'true';
        dobCell.contentEditable = 'true';
        emailCell.contentEditable = 'true';
        universityCell.contentEditable = 'true';

        // Create update button
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.onclick = () => {
            // Handle update operation
            console.log('Update button clicked for student', student);
        };

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            // Handle delete operation



            // Delete the record from the database
            // Xrm.WebApi.deleteRecord('in23gl_students', idCell.textContent).then(
            //     function success(result) {
            //         console.log("Record deleted successfully");
            //         // Perform operations on record deletion
             deleteRow(deleteButton);
            //     },
            //     function(error) {
            //         console.log(error.message);
            //         // Handle the error
            //     }
            // );
        };

        // Add buttons to action cell
        actionCell.appendChild(updateButton);
        actionCell.appendChild(deleteButton);
    });
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
    // Remove the row from the table
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
