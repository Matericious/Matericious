/**
 * Matericious v0.9.0 (https://matericious.com/)
 * Copyright 2018 Matericious Authors
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

  for (var i = 0; i < elems.length; ++i) {
    addEvent(elems[i], $event, $func);
  }
}

function $handle(callback) {
  try {
    callback();
  } catch (err) {}
}

function $getChild(parent, child, n) {
  return document.querySelectorAll(parent + ' ' + child)[n];
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
  return r + "," + g + "," + b;
}

function hasClass(el, className) {
  $handle(function () {
    if (el.classList) return el.classList.contains(className);else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  });
}

function $addClass(el, className) {
  if (el.classList) el.classList.add(className);else if (!hasClass(el, className)) el.className += " " + className;
}

function $removeClass(el, className) {
  if (el.classList) el.classList.remove(className);else if (hasClass(el, className)) {
    var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
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
    var newTab = $get('.tabs-content [tab-id="' + tabID + '"]');
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