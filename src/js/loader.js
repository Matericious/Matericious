//=include _base.js

function loader(data){
   this.id = is_string(data) ? data : data.target;
   this.data = data;
   this.close = ()=>{};
   this.open = ()=>{};
   this.build = ()=>{};
}
