/**
 * Matericious v0.10.0 (https://matericious.com/)
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

function loader(data) {
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

  this.close = function () {
    var id = $get(_this.id);
    $removeClass(id, 'slideDownIn');
  };

  this.is = function (che, def) {
    return !che ? def : che;
  };

  this.open = function (time) {
    _this.id = (_this.id.charAt(0) == '#' ? '' : '#') + _this.id;
    var id = $get(_this.id);
    $addClass(id, 'slideDownIn');

    _this.$timer(time, _this.close);
  };

  this.build = function (time) {
    var name = _this.id = 'sys_gen_loader_id',
        size = _this.is(_this.data.size, 'small'),
        type = _this.is(_this.data.type, 'circular'),
        pos = [_this.is(_this.data.pos.vertical, ''), _this.is(_this.data.pos.horizontal, '')],
        title = size != 'small' ? _this.is(_this.data.title, 'Please wait') : '',
        subtext = size == 'large' && type == 'circular' ? _this.is(_this.data.subtext, 'This page is loading') : '',
        theme = _this.is(_this.data.theme, ''),
        _class = pos[0] + ' ' + pos[1] + ' ' + (type == 'linear' ? 'lin' : '') + ' ' + theme;

    var small_template = "<div id=\"".concat(name, "\" class=\"loader small ").concat(_class, "\"><progress class=\"").concat(type, "\"/></div>"),
        large_template = "<div id=\"".concat(name, "\" class=\"loader large ").concat(_class, "\"><label class=\"title\">").concat(title, "</label><span class=\"subtext\">").concat(subtext, "</span> <progress class=\"").concat(type, "\"/></div>"),
        base_template = "<div id=\"".concat(name, "\" class=\"loader base ").concat(_class, "\"><label class=\"title\">").concat(title, "</label><progress class=\"circular\"/></div>"),
        template = size == 'small' ? small_template : size == 'base' ? base_template : large_template;
    $get('body').innerHTML += template;

    _this.open(time);
  };
}