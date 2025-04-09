/* Class LocalStorageService- a class for persistant CRUD in LocalStorage
Some tips on order of implementation:
1.  Implement Utility Functions (cloneObject(done),  getItemIndex)
2.  Implement 'size' getter
3.  Implement localStorage functions 'reset', 'clear', 'store', 'retrieve'
4.  Implement 'read', 'delete', 'create', 'update', 'list'
5.  Implement 'sort', 'filter'
*/
export default class LocalStorageService {
   "use strict"
   constructor(model, key) {
      this.origModel = model;
      this.key = key;

      if(!this.retrieve()){
         this.model = this.cloneObject(model);   //get copy of data
      }
   }

//Getters
   get sortCol(){
      return this.model.list.options.sortCol;
   }
   set sortCol(col){
      this.model.list.options.sortCol=col;
   }
   get sortDir(){
      return this.model.list.options.sortDir;
   }
   set sortDir(dir){
      this.model.list.options.sortDir=dir;
   }
    get filterCol(){
      return this.model.list.options.filterCol;
   }
   set filterCol(col){
      this.model.list.options.filterCol=col;
   }
   /*KJ: Todo add filterStr*/
   get filterStr(){
     return this.model.list.options.filterStr;
  }
  set filterStr(filterStr){
     this.model.list.options.filterStr=filterStr;
  }
   get size() {
         return this.model.data.length;
   }
   async list() {
      //Giving this one to you.  It will automatically
      //return a sorted and filtered array based on the current
      //sort column and direction, and filterStr values
     this.sort(this.sortCol, this.sortDir);
     let filterObj={};

     if (this.filterStr){
         filterObj[this.filterCol]=this.filterStr;
         return this.filter(filterObj);
     }

     return this.model.data;
   }

   //CRUD FUNCTIONS
   async create(obj) {
      this.model.data.push(obj);
      await this.store();
   }
   async read(getId) {
      const item = this.model.data.find(obj => obj.id === getId);
      return item ? this.cloneObject(item) : null;
   }
   async update(obj) {
      const index = this.getItemIndex(obj.id);
      if (index !== -1) {
         this.model.data[index] = obj;
         await this.store();
      }
   }

   async delete(removeId) {
      const index = this.getItemIndex(removeId);
      if (index !== -1) {
         this.model.data.splice(index, 1);
         await this.store();
      }
   }

   //LocalStorage Functions
   reset() {
      this.clear();
      this.model = this.cloneObject(this.origModel);
      this.store();
   }

   clear() {
      localStorage.clear();
   }

   store() {
      localStorage.setItem(this.key, JSON.stringify(this.model));
   }

   retrieve() {
      const storedData = localStorage.getItem(this.key);
      if (storedData) {
         this.model = JSON.parse(storedData);
         return true;
      }
      return false;
   }

   //Sorting and Filtering Functions
   sort(col, direction) {
      const sortedData = this.cloneObject(this.model.data).sort((a, b) => {
         const valA = a[col];
         const valB = b[col];

         if (valA < valB) return direction === 'asc' ? -1 : 1;
         if (valA > valB) return direction === 'asc' ? 1 : -1;

         return 0;
      });

      this.model.data = sortedData;
      this.sortCol = col;
      this.sortDir = direction;

      this.store();
   }

   filter(filterObj) {
      var filteredData = this.cloneObject(this.model.data);
      for (var key in filterObj) {
          filteredData = filteredData.filter(item => item[key] === filterObj[key]);
      }
  
      return filteredData;
  }


   //Utility functions
   getItemIndex(id) {
      return this.model.data.findIndex(item => item.id === id);
   }
   cloneObject(obj){
      return JSON.parse(JSON.stringify(obj));
   }

}