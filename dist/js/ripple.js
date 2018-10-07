ready(function() {
  call(".ripple", "mousedown", function(e) {
    var $self = this;
    var defaultIn = $self.innerHTML;
    var elemPos = ($self.style.position = "relative"),
      pos = [e.pageY - $self.offsetTop, e.pageX - $self.offsetLeft],
      diameter = Math.min($self.offsetHeight, $self.offsetWidth),
      $ripple,
      $rippleWave,
      $rippleWaveStyle;

    if (!elemPos || elemPos === "static") $self.style.position = "relative";

    $rippleWave = '<div class="rippleWave"></div>';

    $ripple = '<div class="md-ripple">' + $rippleWave + "</div>";

    $self.innerHTML += $ripple;

    $rippleWaveStyle =
      "width: " +
      diameter +
      "px; height: " +
      diameter +
      "px; left: " +
      (pos[1] - diameter / 2) +
      "px;top: " +
      (pos[0] - diameter / 2) +
      "px;";
    $getChild(".md-ripple", ".rippleWave", 0).style = $rippleWaveStyle;
    setTimeout(function() {
        $getCL("md-ripple", 0).remove();
    }, 2000);
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

function $get(e) {
  return document.querySelector(e);
}

function $getChild(parent, child, n){
  return document.querySelectorAll(parent+' '+child)[n];
}
