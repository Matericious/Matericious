ready(function() {
  call("[menu]", "mousedown", function() {
    var id = this.getAttribute('menu');
    var clickTimes = 0,
      targetBtn = $get("[menu=" + id + "]"),
      targetMenu = $getID(id),
      default_class = targetMenu.className;
    
    targetMenu.className += " pullDown";

    var pos = [targetBtn.offsetTop, targetBtn.offsetLeft],
       size = [targetBtn.offsetWidth, targetBtn.offsetHeight];
    
    targetMenu.style.top = size[1] / 2 + pos[0] + "px";
    targetMenu.style.left = pos[1] + "px";

    document.addEventListener("click", function(event) {
      clickTimes++;
      // if (!event.target.closest(id)) {
      if (clickTimes > 1) {
        clickTimes = 0;
        close(targetMenu);
      }
      // };
    });

    function close(targetMenu) {
      targetMenu.className += " pullUp";
      targetMenu.classList.remove = "pullDown";
      setTimeout(function() {
        targetMenu.classList.remove = "pullUp";
        targetMenu.className = default_class;
      }, 500);
    }
  });
});

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

/*this function returns the element by ID*/
function $getID(e) {
  return document.getElementById(e);
}
/*this function returns the element by class name*/
function $getCL(e, n) {
  return document.getElementsByClassName(e)[n];
}
/*this function returns the element by tag name*/
function $getT(e, n) {
  return document.getElementsByTagName(e)[n];
}

function $get(e) {
  return document.querySelector(e);
}

function $getAll(e) {
  return document.querySelectorAll(e);
}
