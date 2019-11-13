//Student class
class Student {
    constructor(id, firstName, lastName, dateOfBirth, tuitionFees) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.tuitionFees = tuitionFees;
    }


}

//Teacher class
class Teacher {
    constructor(id, firstName, lastName, subject) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.subject=subject;
    }


}


//Course class
class Course {
    constructor(id, title, stream, type, startDate, endDate) {
        this.id = id;
        this.title = title;
        this.stream = stream;
        this.type = type;
        this.startDate = startDate;
        this.endDate = endDate;
    }


}


//Assignment class
class Assignment {
    constructor(id, title, description, submissionDate) {
        this.id =id;
        this.title = title;
        this.description=description;
        this.submissionDate=submissionDate;
        this.oralMark=0;
        this.totalMark=0;
    }
    setOralMark(mark){
        this.oralMark=mark;
    }
    setTotalMark(mark){
        this.totalMark=mark;
    }


}


//class to restore and save to Local Storage
class Save {
    constructor(itemType) {
        this.itemType = itemType;
    }

    //get from local storage
    fetchItems() {
        let items = [];
        if (localStorage.getItem(this.itemType) === null) {
            items = [];
        }
        else {
            items = JSON.parse(localStorage.getItem(this.itemType));
        }
        return items;
    };

    getItemTypeId(order){
        const id = this.itemType.split("_")[order];
        return id;
    }

    returnItem(itemID) {
        const items = this.fetchItems();
        let retrievableItem=null;
            items.forEach(
                function (itemInList, index) {
                    if (itemInList.id === itemID) {
                        retrievableItem= itemInList;
                    }
                }
            )
            return retrievableItem;
        }
    retrieveListIds(){
        const items = this.fetchItems();
        let retrievableList=[];
        items.forEach(
            function(itemInList){
                retrievableList.push(itemInList.id);
            }
        )
        return retrievableList;
    }
    

    displayItemsToUI(ui,action) {
        const items = this.fetchItems();

        items.forEach(
            function (item) {
                //callback function
                ui(item,action);
            }
        )
    };

    displayItemsToUIMenu(ui,elementId){
        const items = this.fetchItems();
        items.forEach(
            function (item) {
                //callback function
                ui(item,elementId);
            }
        )
    }

    addItem(item) {
        const items = this.fetchItems();
        items.push(item);
        localStorage.setItem(this.itemType, JSON.stringify(items));

    }

    validateUniqueItemID(item) {
        const items = this.fetchItems();
        let uniqueFlag = true;
        items.forEach(
            function (itemInList) {
                if (itemInList.id === item.id) {
                    uniqueFlag = false;
                }
            }
        )
        return uniqueFlag;
    };

    editItem(item) {
        const items = this.fetchItems();
        items.forEach(
            function (itemInList, index) {
                if (itemInList.id === item.id) {
                    items[index] = item;
                }
            }
        )
        localStorage.setItem(this.itemType, JSON.stringify(items));
    }

    removeItem(itemID) {
        const items = this.fetchItems();
        items.forEach(
            function (item, index) {

                if (item.id === itemID) {
                    items.splice(index, 1);
                }
            }
        )
        localStorage.setItem(this.itemType, JSON.stringify(items));
    };



}


class Update{
    constructor(outDated, upDated){
        this.outDated=outDated;
        this.upDated =upDated;
    }

    updateItemList(){
        let outDatedItem = new Save(this.outDated);
        let upDatedItem = new Save(this.upDated);

        let upDatedList = upDatedItem.fetchItems();
        upDatedList.forEach(
            function(item){
                outDatedItem.editItem(item);
            }
        )
    }

    static updateKeyValues(prefixKeyToUpdate, updateFromKey){
        let items = [];
        Object.keys(localStorage).filter(
            function(key){
                const prefix = key.split("_")[0];
                if(prefix===prefixKeyToUpdate){
                    items.push(key);
                }
            }
        )        
        if(items !== null){
            items.forEach(
                function(item){
                    let update = new Update(item ,updateFromKey);
                    update.updateItemList();
                }
            )
        }
    }

    static deleteKeyValues(prefixKeyToDelete, deleteFromKey){
        let items = [];
        Object.keys(localStorage).filter(
            function(key){
                const prefix = key.split("_")[0];
                if(prefix===prefixKeyToDelete){
                    items.push(key);
                }
            }
        )        
        if(items !== null){
            items.forEach(
                function(item){ 
                    const save = new Save(item);
                    save.removeItem(deleteFromKey);
                }
            )
        }
    }


    static deleteKey(feature, id){
        let items = [];
        Object.keys(localStorage).filter(
            function(key){ 
                if(key===`${feature}_${id}`){
                    items.push(key);
                }
            }
        )        
        if(items !== null){
            items.forEach(
                function(item){
                    localStorage.removeItem(item);
                }
            )
        }
    }



}





/*
End of common classes
*/




//initialize variables
const search = document.getElementById("search");
const students = document.getElementById("students");
const addStudentModal = document.getElementById("addStudent");
const editStudentModal = document.getElementById("editStudent");
const actionSection = document.getElementById("action");
let updateStudentModal = document.getElementById("update");
let deleteStudentModal = document.getElementById("delete");


//UserInterface Class
class UserInterface {


    addStudent(student, action) {

        //create table row
        const row = document.createElement("tr");
        row.className = "student text-white";
        row.innerHTML = `<td>${student.id}</td>
                       <td>${student.firstName}</td>
                       <td>${student.lastName}</td>
                       <td>${student.dateOfBirth}</td>
                       <td>${student.tuitionFees}</td>
                       <td>
                            <a href="#" class="btn custom-text-secondary custom-border" data-toggle="modal"
                                data-target="#editStudent">${action}
                            </a>
                       </td>`


        //append row 
        const tableBody = students.querySelector("tbody");
        tableBody.appendChild(row);
    };


    clearAddStudentModalFields() {
        document.getElementById("add-student-id").value = "";
        document.getElementById("add-student-first-name").value = "";
        document.getElementById("add-student-last-name").value = "";
        document.getElementById("add-student-date-of-birth").value = "";
        document.getElementById("add-student-fees").value = "";
    };

    static validateDate(student) {
        const dateOfBirth = new Date(student.dateOfBirth);
        const diff = Date.now() - dateOfBirth.getTime();
        const ageDate = new Date(diff);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);       

        if (age > 0 && age < 100) {
            return true;
        }
        return false;
    }

    static validateFees(student) {
        const fees = student.tuitionFees;
        if (isNaN(fees)) {
            return false;
        }
        if (fees > 0 && fees < 9999.99) {
            return true;
        }
        else {
            return false;
        }
    }


    static displayMessage(message) {
        const body = document.querySelector("body");
        const div = document.createElement("div");

        div.className = "container alert custom-primary custom-border";

        div.appendChild(document.createTextNode(message));

        body.insertBefore(div, actionSection);

        window.setTimeout(
            function () {
                div.remove();
            }, 2000
        )
    }

    static displayMessageModal(message, modal) {
        const modalContent = modal.querySelector(".modal-content");
        const modalBody = modal.querySelector(".modal-body");
        const div = document.createElement("div");

        div.className = "container alert custom-primary custom-border";

        div.appendChild(document.createTextNode(message));

        modalContent.insertBefore(div, modalBody);

        window.setTimeout(
            function () {
                div.remove();
            }, 2000
        )

    };



    static searchStudentId(textInput) {
        const textToLowerCase = textInput.toLowerCase();

        students.querySelectorAll(".student").forEach(
            function (row) {
                const td = row.getElementsByTagName("td")[0];
                const tdContent = td.textContent;

                if (tdContent.toLowerCase().indexOf(textToLowerCase) !== -1) {
                    row.className = "student text-white";

                }
                else {
                    row.className = "student text-white d-none";
                }
            }
        )
    }


}


//Event listeners

//load DOM 
document.addEventListener("DOMContentLoaded",
    function () {
        const ui = new UserInterface();
        const save = new Save("students");
        save.displayItemsToUI(ui.addStudent, "Edit");
    }
)


//search event listener
search.addEventListener("keyup",
    function (e) {
        e.preventDefault();
        let text = search.querySelector("input").value;
        UserInterface.searchStudentId(text);
    }
)



//modal event listeners 
addStudentModal.addEventListener("submit",
    function (e) {
        e.preventDefault();

        let id = document.getElementById("add-student-id");
        let firstName = document.getElementById("add-student-first-name");
        let lastName = document.getElementById("add-student-last-name");
        let dateOfBirth = document.getElementById("add-student-date-of-birth");
        let tuitionFees = document.getElementById("add-student-fees");


        const ui = new UserInterface();
        const student = new Student(id.value, firstName.value, lastName.value, dateOfBirth.value, tuitionFees.value);
        const save = new Save("students");

        if (id === "" || firstName === "" || lastName === "" || dateOfBirth === "" || tuitionFees === "") {
            UserInterface.displayMessageModal("Please fill in the form!", addStudentModal);
            ui.clearAddStudentModalFields();
        }
        else if (!save.validateUniqueItemID(student)) {
            UserInterface.displayMessageModal("Insert unique ID!", addStudentModal);
            ui.clearAddStudentModalFields();
        }
        else if (!UserInterface.validateDate(student)) {
            UserInterface.displayMessageModal("Please validate date!", addStudentModal);
            ui.clearAddStudentModalFields();
        }
        else if (!UserInterface.validateFees(student)) {
            UserInterface.displayMessageModal("Please enter valid fees!", addStudentModal);
            ui.clearAddStudentModalFields();
        }
        else {
            //save to local storage
            save.addItem(student);

            ui.clearAddStudentModalFields();
            //reload page to exit modal
            location.reload();
        }
    }
)

students.addEventListener("click",
    function (e) {

        if (e.target.classList.contains("btn")) {
            let row = e.target.parentElement.parentElement;

            let id = document.getElementById("edit-student-id");
            let firstName = document.getElementById("edit-student-first-name");
            let lastName = document.getElementById("edit-student-last-name");
            let dateOfBirth = document.getElementById("edit-student-date-of-birth");
            let tuitionFees = document.getElementById("edit-student-fees");

            id.value = row.getElementsByTagName("td")[0].textContent;
            firstName.value = row.getElementsByTagName("td")[1].textContent;
            lastName.value = row.getElementsByTagName("td")[2].textContent;
            dateOfBirth.value = row.getElementsByTagName("td")[3].textContent;
            tuitionFees.value = row.getElementsByTagName("td")[4].textContent;


        }
    }
)




updateStudentModal.addEventListener("click",
    function (e) {
        e.preventDefault();


        let id = document.getElementById("edit-student-id");
        let firstName = document.getElementById("edit-student-first-name");
        let lastName = document.getElementById("edit-student-last-name");
        let dateOfBirth = document.getElementById("edit-student-date-of-birth");
        let tuitionFees = document.getElementById("edit-student-fees");

        const ui = new UserInterface();
        const student = new Student(id.value, firstName.value, lastName.value, dateOfBirth.value, tuitionFees.value);

        if (id.value === "" || firstName.value === "" || lastName.value === "" || dateOfBirth.value === "" || tuitionFees.value === "") {
            UserInterface.displayMessageModal("Please fill in the form!", editStudentModal);

        }
        else if (!UserInterface.validateDate(student)) {
            UserInterface.displayMessageModal("Please validate date!", editStudentModal);

        }
        else if (!UserInterface.validateFees(student)) {
            UserInterface.displayMessageModal("Please enter valid fees!", editStudentModal);

        }
        else {
            //save to local storage
            const save = new Save("students");
            save.editItem(student);
            //reload page to exit modal
            location.reload();

        }
    }
)



deleteStudentModal.addEventListener("click",
    function (e) {
        e.preventDefault();

        const id = document.getElementById("edit-student-id");
        const ui = new UserInterface();

        //local storage
        //delete student from all courses

        const courses = new Save(`courses`);
        courses.retrieveListIds().forEach(
            function (courseId) {
                Update.deleteKey(`CSA_${courseId}`, id.value);
            }
        )


        Update.deleteKeyValues("CS", id.value);

        const save = new Save("students");
        save.removeItem(id.value);

        location.reload();
    }
)

