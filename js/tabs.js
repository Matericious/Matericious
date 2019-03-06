/**
 * Matericious v0.10.0 (https://matericious.com/)
 * Copyright 2019 Matericious Authors
 * Licensed under MIT (https://github.com/Matericious/Matericious/blob/master/LICENSE)
 */

"use strict";

function ready(callback) {
  if (document.readyState != "loading") callback();else if (document.addEventListener) 
    document.addEventListener("DOMContentLoaded", callback);else 
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState == "complete") callback();
    });
}

function call($class, $event, $func) {
  var elems = document.querySelectorAll($class);
  elems.forEach(function (elem) {
    addEvent(elem, $event, $func);
  });
}

function $handle(callback) {
  try {
    callback();
  } catch (err) {}
}

function $getChild(parent, child, n) {
  return document.querySelectorAll("".concat(parent, " ").concat(child))[n];
}

function $get(e) {
  return document.querySelector(e);
}

function $all(e) {
  return document.querySelectorAll(e);
}

function hexToRgb(hex) {
  var bigint = parseInt(hex, 16);
  var r = bigint >> 16 & 255;
  var g = bigint >> 8 & 255;
  var b = bigint & 255;
  return "".concat(r, ",").concat(g, ",").concat(b);
}

function hasClass(el, className) {
  $handle(function () {
    if (el.classList) return el.classList.contains(className);else return !!el.className.match(new RegExp("(\\s|^)".concat(className, "(\\s|$)")));
  });
}

function $addClass(el, className) {
  if (el.classList) el.classList.add(className);else if (!hasClass(el, className)) el.className += " ".concat(className);
}

function $removeClass(el, className) {
  if (el.classList) el.classList.remove(className);else if (hasClass(el, className)) {
    var reg = new RegExp("(\\s|^)".concat(className, "(\\s|$)"));
    el.className = el.className.replace(reg, " ");
  }
}

function addEvent(object, type, callback) {
  if (object == null || typeof object == 'undefined') return;

  if (object.addEventListener) {
    object.addEventListener(type, callback, false);
  } else if (object.attachEvent) {
    object.attachEvent("on" + type, callback);
  } else {
    object["on" + type] = callback;
  }
}

function is_string(data) {
  if (typeof data === "string" || data instanceof String) {
    return true;
  } else {
    return false;
  }
}

Element.prototype.remove = function () {
  this.parentElement.removeChild(this);
};

NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
  for (var i = this.length - 1; i >= 0; i--) {
    if (this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i]);
    }
  }
};

function tabs(event) {
  var activePos = $get(".tabs-header .active"),
      border = $get(".border"),
      tab = $get(".tab.active");

  function changePos() {
    var activePos = $get(".tabs-header .active");
    var pos = [activePos.offsetTop, activePos.offsetLeft],
        size = [activePos.offsetWidth, activePos.offsetHeight];
    border.style = "left: ".concat(pos[1], "px; width: ").concat(size[0], "px");
    var scrollH = $get('.tabs-header');
    scrollH.scrollLeft = pos[1];
  }

  changePos();
  var tabHeight = tab.offsetHeight;

  function changeTab(tabID) {
    var tab = $get('.tabs-content .active');
    var newTab = $get(".tabs-content [tab-id=\"".concat(tabID, "\"]"));
    var tabs = $all(".tabs-content .tab");
    tabs.forEach(function (tab) {
      $removeClass(tab, "active");
    });
    $addClass(newTab, 'active');
  }

  function tabClick(event) {
    var tabID = this.getAttribute("tab-id");
    var tabs = $all(".tabs-header a");
    tabs.forEach(function (tab) {
      $removeClass(tab, "active");
    });
    $addClass(this, "active");
    changePos();
    changeTab(tabID);
  }

  call(".tabs-header a", "mousedown", tabClick);
}