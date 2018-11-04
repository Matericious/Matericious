/**
 * Matericious v0.7.0 (https://matericious.com/)
 * Copyright 2018 Matericious Authors
 * Licensed under MIT (https://github.com/Matericious/Matericious/blob/master/LICENSE)
 */

"use strict";

function ready(callback) {
  // in case the document is already rendered
  if (document.readyState != "loading") callback();else if (document.addEventListener) // modern browsers
    document.addEventListener("DOMContentLoaded", callback);else // IE <= 8
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

function menu() {
  call("[open-menu]", "mousedown", openMenu);
}

function openMenu() {
  var id = this.getAttribute("open-menu");
  var clickTimes = 0,
      targetBtn = $get("[open-menu=" + id + "]"),
      targetMenu = $get("#" + id),
      default_class = targetMenu.className;
  if (default_class.includes("pullDown")) close();
  $addClass(targetMenu, "pullDown");
  setPosition();

  function setPosition() {
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        pos = [targetBtn.offsetTop, targetBtn.offsetLeft],
        size = [targetBtn.offsetWidth, targetBtn.offsetHeight],
        menu_size = [targetMenu.offsetWidth, targetMenu.offsetHeight];

    if (!default_class.includes("right") && pos[1] + menu_size[0] > w) {
      $addClass(targetMenu, "right"); //  alert("adding class");
    } else if (pos[1] - menu_size[0] > w) {//menu cannot go right
    }

    targetMenu.style.top = size[1] / 2 + pos[0] + "px";

    if (default_class.includes("right")) {
      targetMenu.style.right = w - pos[1] - size[0] + "px";
    } else {
      targetMenu.style.left = pos[1] + "px";
    }
  }

  document.addEventListener("click", clickOutSide, true);
  /*When window size change reposition menu*/

  addEvent(window, "resize", function () {
    setPosition();
  });

  function clickOutSide(event) {
    clickTimes++;

    if (clickTimes > 1) {
      clickTimes = 0;
      close(targetMenu);
    }
  }

  function close(targetMenu) {
    $addClass(targetMenu, "pullUp");
    $removeClass(targetMenu, "pullDown");
    $removeClass(targetMenu, "pullUp");
    document.removeEventListener("click", clickOutSide, true);
    return;
  }
}