//=include _base.js

function loader(data) {
  this.id = is_string(data) ? data : data.target;
  this.data = data;
  
  this.$timer = (time, callback) => {
    var id = this.id;
    var timer;
    if (time != null) {
      timer = setInterval( ()=> {
        clearInterval(timer);
        callback(id);
      }, time);
    }
  };
  this.close = ()=>{
    var id = $get(this.id);
    $removeClass(id, 'slideDownIn');
  };
  
  this.is = (che, def)=>{
    return (!che) ? def : che;
  };
  
  this.build = ()=>{};
  
  this.open = (time)=>{
    this.id = ((this.id.substring(0) == '#') ? '' : '#')+this.id;
    alert(this.id);
    var id = $get(this.id);
    $addClass(id, 'slideDownIn');
    this.$timer(time, this.close);
  };
}
