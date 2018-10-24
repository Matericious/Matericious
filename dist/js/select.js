ready(function(){
  select();
  call(".select-field", "change", select);
});

function select(){
document.querySelectorAll(".select-field").forEach(function() {
    var elem = document.querySelectorAll(".select-field");
    for (var c = 0; c < elem.length; c++) { 
      var select = elem[c].getElementsByTagName('select')[0];
      if(select.value != " "){
        $addClass(select, "has-value");
      }else{
        $removeClass(select, "has-value");
      }
    }
  });
}

function selectChange(event){
  var $self = this;
  var sec = $get("."+$self.className.split(" ")[0]+" select");
    if(sec.value != " "){
        $addClass(sec, "has-value");
        console.log("has value: "+sec.value);
      }else{
        $removeClass(sec, "has-value");
        console.log("empty: "+sec.value);
      }
}

function $get(e) {
  return document.querySelector(e);
}

function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function $addClass(el, className) {
  if (el.classList) el.classList.add(className);
  else if (!hasClass(el, className)) el.className += " " + className;
}

function $removeClass(el, className) {
  if (el.classList) el.classList.remove(className);
  else if (hasClass(el, className)) {
    var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    el.className = el.className.replace(reg, " ");
  }
}


function ready(callback) {
  // in case the document is already rendered
  if (document.readyState != "loading") callback();
  else if (document.addEventListener)
    // modern browsers
    document.addEventListener("DOMContentLoaded", callback);
  else
    // IE <= 8
    document.attachEvent("onreadystatechange", function() {
      if (document.readyState == "complete") callback();
    });
}

function call($class, $event, $func) {
  var elems = document.querySelectorAll($class);
  for (i = 0; i < elems.length; ++i) {
    elems[i].addEventListener($event, $func);
  }
}
