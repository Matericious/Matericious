ready(function() {
  var drawer = function() {
    var _drawer = $get(".drawer"),
      _doc = $get("body");
    if (_drawer.className.includes("active")) {
      _drawer.style.left = 0 + "px";
      _doc.style.marginLeft = _drawer.offsetWidth + "px";
    }
    if (_drawer.className.includes("permanent")) {
      $addClass(_drawer, "notrans");
      $addClass(_doc, "notrans");
      _drawer.style.left = 0 + "px";
      _doc.style.marginLeft = _drawer.offsetWidth + "px";
      return;
    } else {
      call("[drawer]", "click", function() {
        var _navType = this.getAttribute("drawer");
        var clickTimes = 0;
        var _drawer = $get(".drawer"),
          _doc = $get("body");

        if (_drawer.style.left != 0 + "px") {
          if (_navType == "overlay") {
            _drawer.style.left = 0 + "px";
            $addClass(_doc, "overlay");
            $addClass(_doc, "fadeIn");
            document.addEventListener("click", clickOutSide, true);
          } else if (_navType == "push") {
            _drawer.style.left = 0 + "px";
            _doc.style.marginLeft = _drawer.offsetWidth + "px";
          }
        } else {
          close();
        }

        function clickOutSide() {
          clickTimes++;
          close();
        }

        function close() {
          _drawer.style.left = "-" + 100 + "%";
          $addClass(_doc, "fadeOut");
          $removeClass(_doc, "fadeIn");
          $removeClass(_doc, "fadeOut");
          $removeClass(_doc, "overlay");
          _doc.style.marginLeft = 0 + "px";
          document.removeEventListener("click", clickOutSide, true);
          return;
        }
      });
    }
  };
  drawer();
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

function $get(e) {
  return document.querySelector(e);
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
