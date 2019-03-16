//=include _base.js

function changeSelec(){
    var click = this;
    var isActive = $get('.picker .active');
    if(isActive){
      $removeClass(isActive, 'active');
    }
    $addClass(click, 'active');
  }
  
  function setcolor(){
    $all('.picker [color]').forEach(function(elem){
      elem.style.background = (elem.getAttribute('color') ? elem.getAttribute('color') : '#ccc');
    });
  }
  
  function picker() {
    setcolor();
    call(".picker li", "click", changeSelec);
  }
  