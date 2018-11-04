//=include _base.js

function select(){
  input_select();
  call(".select-field", "change", input_select);
}

function input_select(){
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
