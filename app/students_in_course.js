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
const studentCard = document.getElementById("students");
const selectCourse = document.getElementById("select-course");
const showStudents = document.getElementById("show-students");
const toDeleteStudent = document.getElementById("to-delete");
const toAddStudent = document.getElementById("to-add");
let currentCourse;

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
                            <a href="#" class="btn custom-text-secondary custom-border ${action}">
                            ${action}
                            </a>
                       </td>`


        //append row 
        const tableBody = students.querySelector("tbody");
        tableBody.appendChild(row);
    };
    removeStudent(student) {

        const tableBody = studentCard.querySelectorAll("tbody")[0];
        const rows = tableBody.querySelectorAll("tr");
        
        rows.forEach(
            function (row, index) {
                const id = row.querySelectorAll("td")[0];
                
                if (id.textContent === student.id) {
                    row.remove();
                }
            }
        )
    }

    clearTable() {
        const tableBody = studentCard.querySelectorAll("tbody")[0];
        const rows = tableBody.querySelectorAll("tr");
        
        rows.forEach(
            function (row) {
                row.remove();
            }
        )
    }

    loadItemToSelectMenu(item,elementId) {
        const link = document.createElement("a");
        link.className = "dropdown-item";
        link.textContent = (`ID# ${item.id}`);
        const dropdown= document.getElementById(elementId);
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


    static searchStudentId(textInput) {
        const textToLowerCase = textInput.toLowerCase();

        studentCard.querySelectorAll(".student").forEach(
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

    static enableShowOptions(switcher) {
        const link = showStudents.getElementsByTagName("a")[0];
        
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
        loader.displayItemsToUIMenu(ui.loadItemToSelectMenu,"select-course");

        //update
        Update.updateKeyValues("CS","students");
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
                const header = `ID#${course.id} ${course.title} ${course.stream} ${course.type} ${course.startDate} ${course.endDate}`
                ui.renameHeader(header);
                UserInterface.enableShowOptions(true);

                //CS_id Course_Student_Id (id of course)
                currentCourse = new Save(`CS_${course.id}`);
                
                currentCourse.displayItemsToUI(ui.addStudent, "Delete");
                
            }
            else {
                ui.renameHeader("List Of Students");
                UserInterface.enableShowOptions(false);
            }
        }
        
    }
    
)


toAddStudent.addEventListener("click",
    function (e) {
        
        const savedStudents = new Save("students");
        const studentList = savedStudents.fetchItems();
       
        let currentStudentIds = currentCourse.retrieveListIds();

        const ui = new UserInterface();
        ui.clearTable();
        studentList.forEach(
            function (student) {
                if (!currentStudentIds.includes(student.id)) {
                    ui.addStudent(student, "Add");
                }

            }
        )

    }

)

toDeleteStudent.addEventListener("click",
    function (e) {
        
        const studentList = currentCourse.fetchItems();
        const ui = new UserInterface();
        ui.clearTable();
        studentList.forEach(
            function (student) {
                ui.addStudent(student, "Delete");
            }
        )

    }

)

studentCard.addEventListener("click",
    function (e) {
        if (e.target.classList.contains("Add")) {

            const row = e.target.parentElement.parentElement;            
            const id = row.getElementsByTagName("td")[0].textContent;
            const firstName = row.getElementsByTagName("td")[1].textContent;
            const lastName = row.getElementsByTagName("td")[2].textContent;
            const dateOfBirth = row.getElementsByTagName("td")[3].textContent;
            const tuitionFees = row.getElementsByTagName("td")[4].textContent;

            const student = new Student(id, firstName, lastName, dateOfBirth, tuitionFees);

            //save to course
            currentCourse.addItem(student);

            //update
            const assignmentsInCourse = new Save(`CA_${currentCourse.getItemTypeId(1)}`);
            const save = new Save(`CSA_${currentCourse.getItemTypeId(1)}_${student.id}`);
            assignmentsInCourse.fetchItems().forEach(
                function(assignment){
                    save.addItem(assignment);
                }
            )

            //remove from ui
            let ui = new UserInterface();
            ui.removeStudent(student);

        }
    }
)

studentCard.addEventListener("click",
    function (e) {
        if (e.target.classList.contains("Delete")) {

            const row = e.target.parentElement.parentElement;            
            const id = row.getElementsByTagName("td")[0].textContent;
            const firstName = row.getElementsByTagName("td")[1].textContent;
            const lastName = row.getElementsByTagName("td")[2].textContent;
            const dateOfBirth = row.getElementsByTagName("td")[3].textContent;
            const tuitionFees = row.getElementsByTagName("td")[4].textContent;

            const student = new Student(id, firstName, lastName, dateOfBirth, tuitionFees);


            //update                        
            //remove from to course
            currentCourse.removeItem(student.id);
            Update.deleteKey(`CSA_${currentCourse.getItemTypeId()}`,student.id);
            
            //remove from ui
            let ui = new UserInterface();
            ui.removeStudent(student);

        }
    }
)

