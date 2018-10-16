ready(function() {
  call(".ripple", "mousedown", ripple);
});

function ripple(event) {
  var $self = this,
    elemPos = ($self.style.position = "relative"),
    rippleDiv = document.createElement('div'),
    pos = [event.pageY - this.offsetTop, event.pageX - this.offsetLeft],
    diameter = Math.min(this.offsetHeight, this.offsetWidth, 100);
  
  rippleDiv.setAttribute("class", "rippleWave");
 var ripple = $get(".rippleWave");

   if (!elemPos || elemPos === "static") $self.style.position = "relative";

  var rippleDivStyle = 
       "width: " +
      diameter +
      "px; height: " +
      diameter +
      "px; left: " +
      (pos[1] - diameter / 2) +
      "px;top: " +
      (pos[0] - diameter / 2) +
      "px;";
  
  rippleDiv.style = rippleDivStyle;
  $self.appendChild(rippleDiv);
  
  window.setTimeout(function () {
      rippleDiv.parentNode.removeChild(rippleDiv);
    }, 1500);
}

/*Main functions*/
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

function hasClass(el, className) {
  if (el.classList) return el.classList.contains(className);
  else
    return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
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
