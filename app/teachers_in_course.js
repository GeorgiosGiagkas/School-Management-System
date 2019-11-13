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
const teacherCard = document.getElementById("teachers");
const selectCourse = document.getElementById("select-course");
const showTeachers = document.getElementById("show-teachers");
const toDeleteTeacher = document.getElementById("to-delete");
const toAddTeacher = document.getElementById("to-add");
let currentCourse;

//UserInterface Class
class UserInterface {


    addTeacher(teacher, action) {
        
        //create table row
        const row = document.createElement("tr");
        row.className = "teacher text-white";
        row.innerHTML = `<td>${teacher.id}</td>
                       <td>${teacher.firstName}</td>
                       <td>${teacher.lastName}</td>
                       <td>${teacher.subject}</td>
                       <td>
                            <a href="#" class="btn custom-text-secondary custom-border ${action}">
                            ${action}
                            </a>
                       </td>`


        //append row 
        const tableBody = teachers.querySelector("tbody");
        tableBody.appendChild(row);
    };
    removeTeacher(teacher) {

        const tableBody = teacherCard.querySelectorAll("tbody")[0];
        const rows = tableBody.querySelectorAll("tr");
        
        rows.forEach(
            function (row, index) {
                const id = row.querySelectorAll("td")[0];
                
                if (id.textContent === teacher.id) {
                    row.remove();
                }
            }
        )
    }

    clearTable() {
        const tableBody = teacherCard.querySelectorAll("tbody")[0];
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


    static searchTeacherId(textInput) {
        const textToLowerCase = textInput.toLowerCase();

        teacherCard.querySelectorAll(".teacher").forEach(
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

    static enableShowOptions(switcher) {
        const link = showTeachers.getElementsByTagName("a")[0];
        
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
        Update.updateKeyValues("CT","teachers");
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

                //CT_id Course_teacher_Id (id of course)
                currentCourse = new Save(`CT_${course.id}`);
                
                currentCourse.displayItemsToUI(ui.addTeacher, "Delete");
                
            }
            else {
                ui.renameHeader("List Of Teachers");
                UserInterface.enableShowOptions(false);
            }
        }
    }
)


toAddTeacher.addEventListener("click",
    function (e) {
        
        const savedTeachers = new Save("teachers");
        const teacherList = savedTeachers.fetchItems();
       
        let currentTeacherIds = currentCourse.retrieveListIds();

        const ui = new UserInterface();
        ui.clearTable();
        teacherList.forEach(
            function (teacher) {
                if (!currentTeacherIds.includes(teacher.id)) {
                    ui.addTeacher(teacher, "Add");
                }

            }
        )

    }

)

toDeleteTeacher.addEventListener("click",
    function (e) {
        
        const teacherList = currentCourse.fetchItems();
        const ui = new UserInterface();
        ui.clearTable();
        teacherList.forEach(
            function (teacher) {
                ui.addTeacher(teacher, "Delete");
            }
        )

    }

)

teacherCard.addEventListener("click",
    function (e) {
        if (e.target.classList.contains("Add")) {

            const row = e.target.parentElement.parentElement;            
            const id = row.getElementsByTagName("td")[0].textContent;
            const firstName = row.getElementsByTagName("td")[1].textContent;
            const lastName = row.getElementsByTagName("td")[2].textContent;
            const subject = row.getElementsByTagName("td")[3].textContent;
            

            const teacher = new Teacher(id, firstName, lastName, subject);

            //save to course
            currentCourse.addItem(teacher);
            //remove from ui
            let ui = new UserInterface();
            ui.removeTeacher(teacher);

        }
    }
)

teacherCard.addEventListener("click",
    function (e) {
        if (e.target.classList.contains("Delete")) {

            const row = e.target.parentElement.parentElement;            

            const id = row.getElementsByTagName("td")[0].textContent;
            const firstName = row.getElementsByTagName("td")[1].textContent;
            const lastName = row.getElementsByTagName("td")[2].textContent;
            const subject = row.getElementsByTagName("td")[3].textContent;
            

            const teacher = new Teacher(id, firstName, lastName, subject);

            //remove from to course
            currentCourse.removeItem(teacher.id);
            //remove from ui
            let ui = new UserInterface();
            ui.removeTeacher(teacher);

        }
    }
)

