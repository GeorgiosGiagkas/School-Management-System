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
const assignments = document.getElementById("assignments");
const addAssignmentModal = document.getElementById("addAssignment");
const editAssignmentModal = document.getElementById("editAssignment");
const actionSection = document.getElementById("action");
let updateAssignmentModal = document.getElementById("update");
let deleteAssignmentModal = document.getElementById("delete");


//UserInterface Class
class UserInterface {


    addAssignment(assignment,action) {

        //create table row
        const row = document.createElement("tr");
        row.className = "assignment text-white";
        row.innerHTML = `<td>${assignment.id}</td>
                       <td>${assignment.title}</td>
                       <td>${assignment.description}</td>
                       <td>${assignment.submissionDate}</td>
                       <td>
                            <a href="#" class="btn custom-text-secondary custom-border" data-toggle="modal"
                                data-target="#editAssignment">${action}
                            </a>
                       </td>`


        //append row 
        const tableBody = assignments.querySelector("tbody");
        tableBody.appendChild(row);
    };


    clearAddAssignmentModalFields() {
        document.getElementById("add-assignment-id").value = "";
        document.getElementById("add-assignment-title").value = "";
        document.getElementById("add-assignment-description").value = "";
        document.getElementById("add-assignment-submission-date").value = "";
        
    };

    

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

        assignments.querySelectorAll(".assignment").forEach(
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


}


//Event listeners

//load DOM 
document.addEventListener("DOMContentLoaded", 
    function(){
        const ui = new UserInterface();
        const save = new Save("assignments");
        save.displayItemsToUI(ui.addAssignment,"Edit");
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



//modal event listeners 
addAssignmentModal.addEventListener("submit",
    function (e) {
        e.preventDefault();

        let id = document.getElementById("add-assignment-id");
        let title = document.getElementById("add-assignment-title");
        let description = document.getElementById("add-assignment-description");
        let submissionDate = document.getElementById("add-assignment-submission-date");


        const ui = new UserInterface();
        const assignment = new Assignment(id.value, title.value, description.value, submissionDate.value);
        const save = new Save("assignments");

        if (assignment.id === "" || assignment.title === "" || assignment.description === "" || assignment.submissionDate ==="" ) {
            UserInterface.displayMessageModal("Please fill in the form!", addAssignmentModal);
            ui.clearAddAssignmentModalFields();
        }
        else if (!save.validateUniqueItemID(assignment)) {
            UserInterface.displayMessageModal("Insert unique ID!", addAssignmentModal);
            ui.clearAddAssignmentModalFields();
        }
        else {
            //save to local storage
            save.addItem(assignment);

            ui.clearAddAssignmentModalFields();
            //reload page to exit modal
            location.reload();
        }
    }
)

assignments.addEventListener("click",
    function (e) {

        if (e.target.classList.contains("btn")) {
            let row = e.target.parentElement.parentElement;

            let id = document.getElementById("edit-assignment-id");
            let title = document.getElementById("edit-assignment-title");
            let description = document.getElementById("edit-assignment-description");
            let submissionDate = document.getElementById("edit-assignment-submission-date");
            

            id.value = row.getElementsByTagName("td")[0].textContent;
            title.value = row.getElementsByTagName("td")[1].textContent;
            description.value = row.getElementsByTagName("td")[2].textContent;
            submissionDate.value = row.getElementsByTagName("td")[3].textContent;
           

        }
    }
)




updateAssignmentModal.addEventListener("click",
    function (e) {
        e.preventDefault();


        let id = document.getElementById("edit-assignment-id");
        let title = document.getElementById("edit-assignment-title");
        let description = document.getElementById("edit-assignment-description");
        let submissionDate = document.getElementById("edit-assignment-submission-date");
        

        const ui = new UserInterface();
        const assignment = new Assignment(id.value, title.value, description.value, submissionDate.value );

        if (id.value === "" || title.value === "" || description.value === "" || submissionDate.value === "" ) {
            UserInterface.displayMessageModal("Please fill in the form!", editAssignmentModal);

        }
        
        else {
            //save to local storage
            const save = new Save("assignments");
            save.editItem(assignment);
            //reload page to exit modal
            location.reload();

        }
    }
)



deleteAssignmentModal.addEventListener("click",
    function (e) {
        e.preventDefault();

        const id = document.getElementById("edit-assignment-id");
        const ui = new UserInterface();

        //local storage
        //delete assignment from all courses
        Update.deleteKeyValues("CA",id.value);
        const save = new Save("assignments");
        save.removeItem(id.value);

        location.reload();
    }
)

