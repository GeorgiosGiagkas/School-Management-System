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
const courses = document.getElementById("courses");
const addCourseModal = document.getElementById("addCourse");
const editCourseModal = document.getElementById("editCourse");
const actionSection = document.getElementById("action");
let updateCourseModal = document.getElementById("update");
let deleteCourseModal = document.getElementById("delete");


//UserInterface Class
class UserInterface {


    addCourse(course,action) {

        //create table row
        const row = document.createElement("tr");
        row.className = "course text-white";
        row.innerHTML = `<td>${course.id}</td>
                       <td>${course.title}</td>
                       <td>${course.stream}</td>
                       <td>${course.type}</td>
                       <td>${course.startDate}</td>
                       <td>${course.endDate}</td>
                       <td>
                            <a href="#" class="btn custom-text-secondary custom-border" data-toggle="modal"
                                data-target="#editCourse">${action}
                            </a>
                       </td>`


        //append row 
        const tableBody = courses.querySelector("tbody");
        tableBody.appendChild(row);
    };


    clearAddCourseModalFields() {
        document.getElementById("add-course-id").value = "";
        document.getElementById("add-course-title").value = "";
        document.getElementById("add-course-stream").value = "";
        document.getElementById("add-course-type").value = "";
        document.getElementById("add-course-start-date").value = "";
        document.getElementById("add-course-end-date").value = "";
    };

    static validateDate(course) {
        const startDate = new Date(course.startDate);
        const endDate = new Date(course.endDate);

        if (endDate.getTime() >= startDate.getTime()) {
            return true;
        }
        return false;
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



    static searchCourseId(textInput) {
        const textToLowerCase = textInput.toLowerCase();

        courses.querySelectorAll(".course").forEach(
            function (row) {
                const td = row.getElementsByTagName("td")[0];
                const tdContent = td.textContent;

                if (tdContent.toLowerCase().indexOf(textToLowerCase) !== -1) {
                    row.className = "course text-white";

                }
                else {
                    row.className = "course text-white d-none";
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
        const save = new Save("courses");
        save.displayItemsToUI(ui.addCourse,"Edit");
    }
)

//search event listener
search.addEventListener("keyup",
    function (e) {
        e.preventDefault();
        let text = search.querySelector("input").value;
        UserInterface.searchCourseId(text);
    }
)



//modal event listeners 
addCourseModal.addEventListener("submit",
    function (e) {
        e.preventDefault();

        let id = document.getElementById("add-course-id");
        let title = document.getElementById("add-course-title");
        let stream = document.getElementById("add-course-stream");
        let type = document.getElementById("add-course-type");
        let startDate = document.getElementById("add-course-start-date");
        let endDate = document.getElementById("add-course-end-date");

        const ui = new UserInterface();
        const course = new Course(id.value, title.value, stream.value, type.value, startDate.value, endDate.value);
        const save  = new Save("courses");
        if (id.value === "" || title.value === "" || stream.value === "" || type.value === "" || startDate.value === "" || endDate.value === "") {
            UserInterface.displayMessageModal("Please fill in the form!", addCourseModal);
            ui.clearAddCourseModalFields();
        }
        else if (!save.validateUniqueItemID(course)) {
            UserInterface.displayMessageModal("Insert unique ID!", addCourseModal);
            ui.clearAddCourseModalFields();
        }
        else if (!UserInterface.validateDate(course)) {
            UserInterface.displayMessageModal("Please validate date!", addCourseModal);
            ui.clearAddCourseModalFields();
        }
        else {
            //save to local storage
            save.addItem(course);

            ui.clearAddCourseModalFields();
            //reload page to exit modal
            location.reload();
        }
    }
)

courses.addEventListener("click",
    function (e) {

        if (e.target.classList.contains("btn")) {
            let row = e.target.parentElement.parentElement;

            let id = document.getElementById("edit-course-id");
            let title = document.getElementById("edit-course-title");
            let stream = document.getElementById("edit-course-stream");
            let type = document.getElementById("edit-course-type");
            let startDate = document.getElementById("edit-course-start-date");
            let endDate = document.getElementById("edit-course-end-date");

            id.value = row.getElementsByTagName("td")[0].textContent;
            title.value = row.getElementsByTagName("td")[1].textContent;
            stream.value = row.getElementsByTagName("td")[2].textContent;
            type.value = row.getElementsByTagName("td")[3].textContent;
            startDate.value = row.getElementsByTagName("td")[4].textContent;
            endDate.value = row.getElementsByTagName("td")[5].textContent;

        }
    }
)




updateCourseModal.addEventListener("click",
    function (e) {
        e.preventDefault();


        let id = document.getElementById("edit-course-id");
        let title = document.getElementById("edit-course-title");
        let stream = document.getElementById("edit-course-stream");
        let type = document.getElementById("edit-course-type");
        let startDate = document.getElementById("edit-course-start-date");
        let endDate = document.getElementById("edit-course-end-date");

        const ui = new UserInterface();
        const course = new Course(id.value, title.value, stream.value, type.value, startDate.value, endDate.value);

        if (id.value === "" || title.value === "" || stream.value === "" || type.value === "" || startDate.value === "" || endDate.value === "") {
            UserInterface.displayMessageModal("Please fill in the form!", editCourseModal);
           
        }
        else if (!UserInterface.validateDate(course)) {
            UserInterface.displayMessageModal("Please validate date!", editCourseModal);
            
        }
        else {
            //save to local storage
            const save = new Save("courses");
            save.editItem(course);
            //reload page to exit modal
            location.reload();

        }
    }
)



deleteCourseModal.addEventListener("click",
    function (e) {
        e.preventDefault();

        const id = document.getElementById("edit-course-id");

        const ui = new UserInterface();

        //save to local storage
        //delete all records of student,teacher,assignment  that belong to the course
        const studentsInCourse = new Save(`CS_${id.value}`);
        studentsInCourse.retrieveListIds().forEach(
            function(studentId){
                localStorage.removeItem(`CSA_${id.value}_${studentId}`);
            }
        );

        Update.deleteKey("CS",id.value);
        Update.deleteKey("CT",id.value);
        Update.deleteKey("CA",id.value);
        const save = new Save("courses");
        save.removeItem(id.value);
        location.reload();
    }
)

