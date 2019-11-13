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
const teachers = document.getElementById("teachers");
const addTeacherModal = document.getElementById("addTeacher");
const editTeacherModal = document.getElementById("editTeacher");
const actionSection = document.getElementById("action");
let updateTeacherModal = document.getElementById("update");
let deleteTeacherModal = document.getElementById("delete");


//UserInterface Class
class UserInterface {


    addTeacher(teacher,action) {

        //create table row
        const row = document.createElement("tr");
        row.className = "teacher text-white";
        row.innerHTML = `<td>${teacher.id}</td>
                       <td>${teacher.firstName}</td>
                       <td>${teacher.lastName}</td>
                       <td>${teacher.subject}</td>
                       <td>
                            <a href="#" class="btn custom-text-secondary custom-border" data-toggle="modal"
                                data-target="#editTeacher">${action}
                            </a>
                       </td>`


        //append row 
        const tableBody = teachers.querySelector("tbody");
        tableBody.appendChild(row);
    };


    clearAddTeacherModalFields() {
        document.getElementById("add-teacher-id").value = "";
        document.getElementById("add-teacher-first-name").value = "";
        document.getElementById("add-teacher-last-name").value = "";
        document.getElementById("add-teacher-subject").value = "";
        
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



    static searchTeacherId(textInput) {
        const textToLowerCase = textInput.toLowerCase();

        teachers.querySelectorAll(".teacher").forEach(
            function (row) {
                const td = row.getElementsByTagName("td")[0];
                const tdContent = td.textContent;

                if (tdContent.toLowerCase().indexOf(textToLowerCase) !== -1) {
                    row.className = "teacher text-white";

                }
                else {
                    row.className = "teacher text-white d-none";
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
        const save = new Save("teachers");
        save.displayItemsToUI(ui.addTeacher,"Edit");
    }
)


//search event listener
search.addEventListener("keyup",
    function (e) {
        e.preventDefault();
        let text = search.querySelector("input").value;
        UserInterface.searchTeacherId(text);
    }
)



//modal event listeners 
addTeacherModal.addEventListener("submit",
    function (e) {
        e.preventDefault();

        let id = document.getElementById("add-teacher-id");
        let firstName = document.getElementById("add-teacher-first-name");
        let lastName = document.getElementById("add-teacher-last-name");
        let subject = document.getElementById("add-teacher-subject");
        


        const ui = new UserInterface();
        const teacher = new Teacher(id.value, firstName.value, lastName.value, subject.value);
        const save = new Save("teachers");

        if (id === "" || firstName === "" || lastName === "" || subject ==="" ) {
            UserInterface.displayMessageModal("Please fill in the form!", addTeacherModal);
            ui.clearAddTeacherModalFields();
        }
        else if (!save.validateUniqueItemID(teacher)) {
            UserInterface.displayMessageModal("Insert unique ID!", addTeacherModal);
            ui.clearAddTeacherModalFields();
        }
        else {
            //save to local storage
            save.addItem(teacher);

            ui.clearAddTeacherModalFields();
            //reload page to exit modal
            location.reload();
        }
    }
)

teachers.addEventListener("click",
    function (e) {

        if (e.target.classList.contains("btn")) {
            let row = e.target.parentElement.parentElement;

            let id = document.getElementById("edit-teacher-id");
            let firstName = document.getElementById("edit-teacher-first-name");
            let lastName = document.getElementById("edit-teacher-last-name");
            let subject = document.getElementById("edit-teacher-subject");
            

            id.value = row.getElementsByTagName("td")[0].textContent;
            firstName.value = row.getElementsByTagName("td")[1].textContent;
            lastName.value = row.getElementsByTagName("td")[2].textContent;
            subject.value = row.getElementsByTagName("td")[3].textContent;
  
        }
    }
)




updateTeacherModal.addEventListener("click",
    function (e) {
        e.preventDefault();


        let id = document.getElementById("edit-teacher-id");
        let firstName = document.getElementById("edit-teacher-first-name");
        let lastName = document.getElementById("edit-teacher-last-name");
        let subject = document.getElementById("edit-teacher-subject");
        

        const ui = new UserInterface();
        const teacher = new Teacher(id.value, firstName.value, lastName.value, subject.value);

        if (id.value === "" || firstName.value === "" || lastName.value === "" || subject.value === "") {
            UserInterface.displayMessageModal("Please fill in the form!", editTeacherModal);

        }
        else {
            //save to local storage
            const save = new Save("teachers");
            save.editItem(teacher);
            //reload page to exit modal
            location.reload();

        }
    }
)



deleteTeacherModal.addEventListener("click",
    function (e) {
        e.preventDefault();

        const id = document.getElementById("edit-teacher-id");
        const ui = new UserInterface();

        //local storage
        //delete teacher from all courses
        Update.deleteKeyValues("CT",id.value);
        const save = new Save("teachers");
        save.removeItem(id.value);

        location.reload();
    }
)

