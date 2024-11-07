let studentObj;

function populateDropdown(node, options) {

    options.forEach(option => {
        const addOption = document.createElement("option");
        addOption.textContent = option;

        node.append(addOption);
    })
}

function findStudentInfo(studentID) {
    fetch(`http://localhost:3000/roster/${studentID}`)
    .then(res => res.json())
    .then(student => {studentObj=student})
}

function findRoster() {
    fetch(`http://localhost:3000/roster`)
    .then(res => res.json())
    .then(roster => {
        const studentDropdown = document.querySelector("#student-select");

        const students = roster.map(student => `${student.lastName}, ${student.firstName} [ID: ${student.id}]`);

        populateDropdown(studentDropdown, students);

        studentDropdown.addEventListener("change", ()=> {
            const currStudent = studentDropdown.value;
        
            const studentID = currStudent.match(/\[ID: (\d+)\]/)[1];
            findStudentInfo(studentID);
        })
    })
}

function populateDOM() {

}

findRoster();