/**
 * Matericious v0.8.1 (https://matericious.com/)
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
        _loader = $get(id + " .loader"),
        _created_overlay = $get("." + id.replace(/#/g, "") + ".dialog_overlay"),
        modal_class = dialog_ID.className;

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

  this.loader = function (time) {
    if ($get(_this.id + ' .loader') != null) close(_this.id);

    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        _parent = $get(_this.id),
        _overlay_opacity = _this.data.opacity != null ? _this.data.opacity : 0.8,
        _loader_color = _this.data.loaderColor != null ? _this.data.loaderColor : '',
        _text_color = _this.data.color != null ? _this.data.color : '',
        _overlay_background = 'rgba(0, 0, 0, ' + _overlay_opacity + ')',
        _loader_div = document.createElement("loader"),
        _loading_overlay = document.createElement("overlay"),
        _loader_class = ["dialog", "loader", "overlay"],
        _loader_overlay_class = ["loader_overlay"],
        _parent_size = [_parent.offsetWidth, _parent.offsetHeight],
        _svg_loader = _this.data.spinner == null || _this.data.spinner ? '<svg class="md-loader" stroke-width="5" viewBox="0 0 66 66">' + '<circle cx="33" cy="33" r="25" />' + '</svg>' : '';

    if (_this.data.background != null) {
      _overlay_background = 'rgba(' + hexToRgb(_this.data.background.replace(/#/g, "")) + ', ' + _overlay_opacity + ')';
    } else if (_this.data.theme == 'light') {
      _loader_overlay_class.push(_this.data.theme);

      _overlay_background = 'rgba(255,255,255, ' + _overlay_opacity + ')';
    }

    if (_this.data.size == null) _loader_class.push('small');else _loader_class.push(_this.data.size);
    if (_this.data.style == null) _loader_class.push('basic');else _loader_class.push(_this.data.style);

    if (_this.data.text != null) {
      _svg_loader += '<span>' + _this.data.text + '</span>';
    }

    if (_parent.style.position != 'relative') _parent.style.position = 'relative';
    _parent.appendChild(_loading_overlay), _loading_overlay.appendChild(_loader_div);

    for (var c = 0; c < _loader_overlay_class.length; c++) {
      $addClass(_loading_overlay, _loader_overlay_class[c]);
    }

    for (var c = 0; c < _loader_class.length; c++) {
      $addClass(_loader_div, _loader_class[c]);
    }

    var _loader = $get(_this.id + ' .loader');

    if (_parent_size[0] == $get('body').offsetWidth && _parent.tagName.toLowerCase() == 'body') {
      _parent.style.position = 'normal';
      $get(_this.id + ' .loader_overlay').style.position = 'fixed';
    }

    if (_parent_size[1] < _loader.offsetHeight) {
      _loader.style.width = _parent_size[0] + 'px';
      _loader.style.height = _parent_size[1] / 1 + 'px';
    }

    $get(_this.id + ' .loader_overlay').style.background = _overlay_background;
    $get(_this.id + ' .loader').style.color = _text_color;
    _loader_div.innerHTML = _svg_loader;
    if (_this.data.spinner == null || _this.data.spinner) $get(_this.id + ' .md-loader circle').style.stroke = _loader_color;

    _this.$timer(time, close);
  };

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

    $addClass(_doc, "modal_active");

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