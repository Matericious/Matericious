//=include _base.js

function loader(data) {
  data = (!data) ? '' : data;
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
  
  this.open = (time)=>{
    this.id = ((this.id.charAt( 0 ) == '#') ? '' : '#')+this.id;
    var id = $get(this.id);
    $addClass(id, 'slideDownIn');
    this.$timer(time, this.close);
  };
  
  this.build = (time)=> {
    let name = this.id = 'sys_gen_loader_id',
        size = this.is(this.data.size, 'small'),
        type = this.is(this.data.type, 'circular'),
        pos = [this.is(this.data.vertical, 'bottom'), this.is(this.data.horizontal, 'right')],
        title = (size == 'large') ? this.is(this.data.title, 'Please wait') : null,
        subtext = (size == 'large') ? this.is(this.data.subtext, 'This page is loading') : null;

    let small_template = '<div id="'+name+'" class="loader small"><progress class="'+type+'"/></div>',
        large_template = '<div id="'+name+'" class="loader large"><label class="title">'+title+'</label><span class="subtext">'+subtext+'</span> <progress class="'+type+'"/></div>',
        template = (size == 'small') ? small_template : large_template;

    $get('body').innerHTML += template;
    this.open(time);
  };
}
