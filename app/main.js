//Student class
export class Student {
    constructor(id, firstName, lastName, dateOfBirth, tuitionFees) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.tuitionFees = tuitionFees;
    }


}

//Teacher class
export class Teacher {
    constructor(id, firstName, lastName, subject) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.subject=subject;
    }


}


//Course class
export class Course {
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
export class Assignment {
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
export class Save {
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


export class Update{
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
