let formContext = null;
let executionContext = null;
let studentData = null;
const apiEndpoint = 'https://cfainternship.api.crm.dynamics.com/api/data/v9.2/in23gl_students';

function onLoad(context) {
    executionContext = context;
    formContext = context.getFormContext();
    console.log("formContextOnLoad: ", formContext);

    const  universityName = formContext.getAttribute("in23gl_universityname").getValue();
    const filter = `?$filter=in23gl_universityname eq '${universityName}'`;
    // filter applies String value of selected university to get the id to create idFilter
    Xrm.WebApi.retrieveMultipleRecords("in23gl_university", filter).then (
        function success(universityRows) {
            const universityId = universityRows.entities[0].in23gl_universityid;
            const idFilter = `?$filter=_in23gl_university_value eq '${universityId}'`;
            //idFilter is used to show only students belonging to the selected university
            Xrm.WebApi.retrieveMultipleRecords("in23gl_student", idFilter).then(
                function success(students) {
                    // perform additional operations on retrieved records
                    studentData = students;
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
        console.log("StudentData: ", students);
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

        //access the data from the entities and assign to corresponding cell within the table
        idCell.textContent = student.in23gl_studentid;
        firstNameCell.textContent = student.in23gl_firstname;
        lastNameCell.textContent = student.in23gl_lastname;
        dobCell.textContent = student.in23gl_dob;
        emailCell.textContent = student.in23gl_email;

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
            deleteRow(deleteButton);
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
    // Remove record from dataverse table
    // on success remove record from table
    row.parentNode.removeChild(row);
}


