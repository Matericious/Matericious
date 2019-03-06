/**
 * Matericious v0.10.1 (https://matericious.com/)
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

function nesting() {
  var large_screen = 992,
      medium_screen = 768,
      small_screen = 500;

  function checkNesting() {
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var num_to_nest;
    var nest_menu = $get("#nesting");
    var nest_menu_btn = $get('[open-menu="nesting"]');
    var nest_btns = $all(".appbar .nest");

    if (w < large_screen) {
      num_to_nest = 1;

      if (w <= medium_screen && w >= small_screen) {
        num_to_nest = 2;
      } else if (w <= small_screen) {
        num_to_nest = nest_btns.length;
      }
    }

    nest_btns.forEach(function (nest_btn) {
      nest_btn.style.display = "block";
    });
    nest_menu.innerHTML = "";
    nest_menu_btn.style.display = "none";
    nest_btns.forEach(function (nest_btn) {
      console.log("running");
      var icon_btn_title = nest_btn.getAttribute("title");
      var icon_title;

      if (icon_btn_title != null) {
        icon_title = " ".concat(icon_btn_title);
      } else {
        icon_title = "";
      }

      nest_menu_btn.style.display = "inline-block";
      nest_btn.style.display = "none";
      nest_menu.innerHTML += "<li><a href=\"#\">".concat(nest_btn.innerHTML + icon_title, "</a></li>");
    });
  }

  checkNesting();
  addEvent(window, "resize", function () {
    checkNesting();
  });
}

function collapse() {
  var $curr_scr_pos = window.pageYOffset;

  if ($get('.dense')) {
    $get('.dense').style.top = $pre_Scr_Pos > $curr_scr_pos ? "0" : "-65px";
    $pre_Scr_Pos = $curr_scr_pos;
  }

  if ($get('.collapse')) {
    $get('.collapse .title').style.display = $curr_scr_pos < 5 ? "inline-block" : "none";
    $get('.collapse').style.width = $curr_scr_pos < 5 ? "100%" : "115px";
    $get('.collapse').style.borderRadius = $curr_scr_pos < 5 ? "0" : "0px 0px 30px 0px";
  }
}

var $pre_Scr_Pos = window.pageYOffset;

window.onscroll = function () {
  collapse();
};