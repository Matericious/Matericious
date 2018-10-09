ready(function() {
  call("[open-menu]", "mousedown", function() {
    var id = this.getAttribute("open-menu");
    var clickTimes = 0,
      targetBtn = $get("[open-menu=" + id + "]"),
      targetMenu = $getID(id),
      default_class = targetMenu.className;
    
    if(default_class.includes("pullDown")) close();
      
    $addClass(targetMenu, "pullDown");
    setPosition();

    function setPosition() {
      var w =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth,
        h =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight,
        pos = [targetBtn.offsetTop, targetBtn.offsetLeft],
        size = [targetBtn.offsetWidth, targetBtn.offsetHeight];

      targetMenu.style.top = size[1] / 2 + pos[0] + "px";
      if (default_class.includes("right")) {
        targetMenu.style.right = w - pos[1] - size[0] + "px";
      } else {
        targetMenu.style.left = pos[1] + "px";
      }
    }

    document.addEventListener("click", function(event) {
      clickTimes++;
      if (clickTimes > 1) {
        clickTimes = 0;
        close(targetMenu);
      }
      /*When window size change reposition menu*/
      window.onresize = function() {
        setPosition();
      };
    });

    function close(targetMenu) {
      $addClass(targetMenu, "pullUp");
      $removeClass(targetMenu, "pullDown");
      $removeClass(targetMenu, "pullUp");
      return;
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

function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function $addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function $removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}
