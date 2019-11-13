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



//assign variables
const search = document.getElementById("search");
const assignmentCard = document.getElementById("assignments");
const selectCourse = document.getElementById("select-course");
const selectStudent = document.getElementById("select-student");
const editAssignmentModal = document.getElementById("editAssignment");
let updateAssignmentModal = document.getElementById("update");

let currentCourse;
let currentStudentId;
let currentAssignment;

//UserInterface Class
class UserInterface {


    addAssignment(assignment, action) {

        //create table row
        const row = document.createElement("tr");
        row.className = "assignment text-white";
        row.innerHTML = `<td>${assignment.id}</td>
                       <td>${assignment.title}</td>
                       <td>${assignment.description}</td>
                       <td>${assignment.submissionDate}</td>
                       <td>${assignment.oralMark}</td>
                       <td>${assignment.totalMark}</td>
                       <td>
                            <a href="#" class="btn custom-text-secondary custom-border" data-toggle="modal"
                                data-target="#editAssignment">${action}
                            </a>
                       </td>`


        //append row 
        const tableBody = assignments.querySelector("tbody");
        tableBody.appendChild(row);
    };
    removeAssignment(assignment) {

        const tableBody = assignmentCard.querySelectorAll("tbody")[0];
        const rows = tableBody.querySelectorAll("tr");
        
        rows.forEach(
            function (row, index) {
                const id = row.querySelectorAll("td")[0];
                
                if (id.textContent === assignment.id) {
                    row.remove();
                }
            }
        )
    }

    clearTable() {
        const tableBody = assignmentCard.querySelectorAll("tbody")[0];
        const rows = tableBody.querySelectorAll("tr");
        
        rows.forEach(
            function (row) {
                row.remove();
            }
        )
    }

    loadItemToSelectMenu(item, elementId) {
        const link = document.createElement("a");
        link.className = "dropdown-item";
        link.textContent = (`ID# ${item.id}`);
        const dropdown = document.getElementById(elementId);
        const menu = dropdown.querySelector(".dropdown-menu");
        menu.appendChild(link);
    }

    renameHeader(title) {
        const header = document.querySelectorAll(".card-header")[0];
        header.querySelector("h4").textContent = title;

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

    static searchAssignmentId(textInput) {
        const textToLowerCase = textInput.toLowerCase();

        assignmentCard.querySelectorAll(".assignment").forEach(
            function (row) {
                const td = row.getElementsByTagName("td")[0];
                const tdContent = td.textContent;

                if (tdContent.toLowerCase().indexOf(textToLowerCase) !== -1) {
                    row.className = "assignment text-white";

                }
                else {
                    row.className = "assignment text-white d-none";
                }
            }
        )
    }

    static enableShowOptions(switcher) {
        const link = selectStudent.getElementsByTagName("a")[0];
        
        if (switcher) {
            link.className = "dropdown-toggle btn custom-text-secondary custom-border text-white";            
        }
        else {
            link.className = "dropdown-toggle btn custom-text-secondary custom-border text-white disabled";            
        }
    }


}


//EVENT listeners

//load DOM 
document.addEventListener("DOMContentLoaded",
    function (e) {
        const loader = new Save("courses");
        const ui = new UserInterface();
        loader.displayItemsToUIMenu(ui.loadItemToSelectMenu, "select-course");

        //update
        Update.updateKeyValues("CA", "assignments");

    }
)




//search event listener
search.addEventListener("keyup",
    function (e) {
        e.preventDefault();
        let text = search.querySelector("input").value;
        UserInterface.searchAssignmentId(text);
    }
)

selectCourse.addEventListener("click",
    function (e) {
        e.preventDefault();

        if (e.target.classList.contains("dropdown-item")) {

            const selectedOption = e.target.textContent;

            const id = selectedOption.split(" ")[1];

            const save = new Save("courses");

            const ui = new UserInterface();
            ui.clearTable();
            const course = save.returnItem(id);

            if (course !== null) {
                const header = `Course ID#${course.id}`
                ui.renameHeader(header);
                UserInterface.enableShowOptions(true);

                //CA_id Course_assignment_Id (id of course)
                currentCourse = new Save(`CS_${course.id}`);
                currentCourse.displayItemsToUIMenu(ui.loadItemToSelectMenu, "select-student");
            }
            else {
                ui.renameHeader("List Of Assignments");
                UserInterface.enableShowOptions(false);
            }
        }
    }
)


selectStudent.addEventListener("click",
    function (e) {
        e.preventDefault();


        if (e.target.classList.contains("dropdown-item")) {
            const selectedOption = e.target.textContent;
            const id = selectedOption.split(" ")[1];
            currentStudentId=id;
            const studentAssignments = new Save(`CSA_${currentCourse.getItemTypeId(1)}_${id}`);
            
            const ui = new UserInterface();
            ui.clearTable();

            const header = `Course ID#${currentCourse.getItemTypeId(1)} Student ID#${id}`;
            ui.renameHeader(header);
            studentAssignments.fetchItems().forEach(
                function (assignment) {
                    ui.addAssignment(assignment, "Edit");
                }
            )
        }
    }
)



assignmentCard.addEventListener("click",
    function (e) {

        if (e.target.classList.contains("btn")) {
            let row = e.target.parentElement.parentElement;

            let oralMark = document.getElementById("edit-assignment-oral");
            let totalMark = document.getElementById("edit-assignment-total");
            oralMark.value = row.getElementsByTagName("td")[4].textContent;
            totalMark.value = row.getElementsByTagName("td")[5].textContent;


            let id =row.getElementsByTagName("td")[0].textContent;
            let title =row.getElementsByTagName("td")[1].textContent;
            let description =row.getElementsByTagName("td")[2].textContent;
            let submissionDate =row.getElementsByTagName("td")[3].textContent;
            currentAssignment = new Assignment(id,title,description,submissionDate);

        }
    }
)

updateAssignmentModal.addEventListener("click",
    function (e) {
        e.preventDefault();


        let oralMark = document.getElementById("edit-assignment-oral");
        let totalMark = document.getElementById("edit-assignment-total");

        const ui = new UserInterface();
        
        currentAssignment.setOralMark(oralMark.value);
        currentAssignment.setTotalMark(totalMark.value);
        
        if (isNaN(oralMark.value) || isNaN(totalMark.value)) {
            UserInterface.displayMessageModal("Please enter a numeric value!", editAssignmentModal);
        }
        else if(oralMark.value==="" || totalMark.value===""){
            UserInterface.displayMessageModal("Please fill in the fields!", editAssignmentModal);
        }
        else if(oralMark.value<0 || oralMark.value >10 || totalMark.value<0 || totalMark.value >10){
            UserInterface.displayMessageModal("Please enter mark between 0 and 10!", editAssignmentModal);
        }
        else {
            //save to local storage
            
            const save = new Save(`CSA_${currentCourse.getItemTypeId(1)}_${currentStudentId}`);
            save.editItem(currentAssignment);
            //reload page to exit modal
            location.reload();

        }
    }
)
