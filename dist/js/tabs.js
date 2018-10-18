ready(function() {
  tabs();
});

function tabs(event) {
  var activePos = $get(".tabs-header .active"),
      border = $get(".border"),
      tab = $get(".tab.active");
  
  function changePos() {
    var activePos = $get(".tabs-header .active"),
      border = $get(".border"),
      tab = $get(".tab.active");
    var border = $get(".border");
    var pos = [activePos.offsetTop, activePos.offsetLeft],
      size = [activePos.offsetWidth, activePos.offsetHeight];

    border.style = "left: " + pos[1] + "px; width: " + size[0] + "px";
    
   var scrollH = $get('.tabs-header');
   scrollH.scrollLeft = pos[1];
  }
  changePos();
  var tabHeight = tab.offsetHeight;

  function changeTab(tabID) {
    var tab = $get('.tabs-content .active');
    var newTab = $get('.tabs-content [tab-id="'+tabID+'"]');

    var tabs = $all(".tabs-content .tab");
    for (var c = 0; c < tabs.length; c++) {
        $removeClass(tabs[c], "active");
    }
    $addClass(newTab, 'active');
  }

  function tabClick(event) {
    var tabID = this.getAttribute("tab-id");    
    var tabs = $all(".tabs-header a");
    for (var c = 0; c < tabs.length; c++) {
        $removeClass(tabs[c], "active");
    }
    $addClass(this, "active");
    changePos();
    changeTab(tabID);
  }

  call(".tabs-header a", "mousedown", tabClick);
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

function $get(e) {
  return document.querySelector(e);
}
function $all(e) {
  return document.querySelectorAll(e);
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
