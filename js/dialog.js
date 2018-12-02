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

function dialog(data) {
  var _this = this;

  data = !data ? '' : data;
  this.id = is_string(data) ? data : data.target;
  this.data = data;

  this.$timer = function (time, callback) {
    var id = _this.id;
    var timer;

    if (time != null) {
      timer = setInterval(function () {
        clearInterval(timer);
        callback(id);
      }, time);
    }
  };

  this.build = function () {};

  this.close = function (id) {
    alert(id);
    close(id);
  };

  function close(id) {
    var dialog_ID = $get(id),
        _doc = $get('body'),
        _loader = $get(id + " .loader"),
        _created_overlay = $get("." + id.replace(/#/g, "") + ".dialog_overlay"),
        modal_class = dialog_ID.className;

    $removeClass(_doc, "dialog-open");

    if (_loader != null) {
      _created_overlay = $get(id + " .loader_overlay");
    } else {
      if (modal_class.includes("full") || modal_class.includes("sheet")) {
        $removeClass(dialog_ID, "active");
      } else {
        $removeClass(dialog_ID, "expandUp");
      }
    }

    $handle(function () {
      _created_overlay.remove();
    });
    return;
  }

  this.open = function (time) {
    var id = _this.id;

    var modal_ID = $get(id),
        _doc = $get("body"),
        modal_class = modal_ID.className;

    if (modal_class.includes("overlay")) {
      var overlay_div = document.createElement("div");

      _doc.appendChild(overlay_div);

      $addClass(overlay_div, "dialog_overlay");
      $addClass(overlay_div, id.replace(/#/g, ""));
    }

    $addClass(_doc, "dialog-open");

    if (modal_class.includes("full") || modal_class.includes("sheet")) {
      $addClass(modal_ID, "active");
    } else {
      $addClass(modal_ID, "expandUp");
    }

    _this.$timer(time, close);

    call(id + " .close", "click", function () {
      close(id);
    });
    call(".dialog_overlay", "click", function () {
      close(id);
    });
  };
}