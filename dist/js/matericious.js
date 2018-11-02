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
} //=require _base.js


function nesting() {
  var large_screen = 992,
      medium_screen = 768,
      small_screen = 500;

  function checkNesting() {
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var num_to_nest;
    var nest_menu = $get("#nesting");
    var nest_menu_btn = $get('[open-menu="nesting"]');
    var nest_btn = $all(".appbar .nest");

    if (w < large_screen) {
      num_to_nest = 1;

      if (w <= medium_screen && w >= small_screen) {
        num_to_nest = 2;
      } else if (w <= small_screen) {
        num_to_nest = nest_btn.length;
      }
    }

    for (var c = 0; c < nest_btn.length; c++) {
      nest_btn[c].style.display = "block";
    }

    nest_menu.innerHTML = "";
    nest_menu_btn.style.display = "none";

    for (var c = 0; c < num_to_nest; c++) {
      var icon_btn_title = nest_btn[c].getAttribute("title");
      var icon_title;

      if (icon_btn_title != null) {
        icon_title = " " + icon_btn_title;
      } else {
        icon_title = "";
      }

      nest_menu_btn.style.display = "block";
      nest_btn[c].style.display = "none";
      nest_menu.innerHTML += '<li><a href="#">' + nest_btn[c].innerHTML + icon_title + "</a></li>";
    }
  }

  checkNesting();
  addEvent(window, "resize", function () {
    checkNesting();
  });
} //=require _base.js


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
} //=require _base.js


function drawer() {
  var _drawer = $get(".drawer"),
      _doc = $get("body");

  if (_drawer.className.includes("active")) {
    _drawer.style.left = 0 + "px";
    _doc.style.marginLeft = _drawer.offsetWidth + "px";
  }

  if (_drawer.className.includes("permanent")) {
    $addClass(_drawer, "notrans");
    $addClass(_doc, "notrans");
    _drawer.style.left = 0 + "px";
    _doc.style.marginLeft = _drawer.offsetWidth + "px";
    return;
  } else {
    call("[drawer]", "click", function () {
      var _navType = this.getAttribute("drawer");

      var clickTimes = 0;

      var _drawer = $get(".drawer"),
          _doc = $get("body");

      if (_drawer.style.left != 0 + "px") {
        if (_navType == "overlay") {
          _drawer.style.left = 0 + "px";
          $addClass(_doc, "overlay");
          $addClass(_doc, "fadeIn");
          document.addEventListener("click", clickOutSide, true);
        } else if (_navType == "push") {
          _drawer.style.left = 0 + "px";
          _doc.style.marginLeft = _drawer.offsetWidth + "px";
        }
      } else {
        close();
      }

      function clickOutSide() {
        clickTimes++;
        close();
      }

      function close() {
        _drawer.style.left = "-" + 100 + "%";
        $addClass(_doc, "fadeOut");
        $removeClass(_doc, "fadeIn");
        $removeClass(_doc, "fadeOut");
        $removeClass(_doc, "overlay");
        _doc.style.marginLeft = 0 + "px";
        document.removeEventListener("click", clickOutSide, true);
        return;
      }
    });
  }
}

; //=require _base.js

function gradient() {
  var main_colors = {
    light: "#ffffff",
    dark: "#424242",
    basic: "#cbcbcb",
    blue: "#0091ea",
    earth: "#34c559",
    night: "#424242",
    ocean: "#2e72ee",
    red: "#e93030",
    snow: "#ffffff",
    yellow: "#e7d507",
    purple: "#6924f0",
    pink: "#ff87cb",
    cyan: "#00bcd4",
    grey: "#99A3A4"
  };
  document.querySelectorAll("[data-grad]").forEach(function () {
    var divs = document.querySelectorAll("[data-grad]");

    for (var c = 0; c < divs.length; c++) {
      var gradient = "linear-gradient(90deg, ";
      var data_colors = divs[c].getAttribute("data-grad");

      for (var color in main_colors) {
        data_colors = data_colors.replace(color, main_colors[color]);
      }

      var colors = data_colors.replace(/#/g, "");
      var colorArr = colors.split(" ");

      for (var i = 0; i < colorArr.length; i++) {
        gradient += "rgba(" + hexToRgb(colorArr[i]) + ", 1) " + 100 / colorArr.length * i + "%, ";
      }

      gradient = gradient.slice(0, gradient.length - 2);
      gradient += ")";
      divs[c].style.background = gradient;
    }
  });
} //=require _base.js


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
} //=require _base.js


function ripple() {
  call(".ripple", "mousedown", rippleEffect);
}

function rippleEffect(event) {
  var $self = this,
      elemPos = $self.style.position = "relative",
      rippleDiv = document.createElement('div'),
      pos = [event.pageY - this.offsetTop, event.pageX - this.offsetLeft],
      diameter = Math.min(this.offsetHeight, this.offsetWidth, 100);
  rippleDiv.setAttribute("class", "rippleWave");
  var ripple = $get(".rippleWave");
  if (!elemPos || elemPos === "static") $self.style.position = "relative";
  var rippleDivStyle = "width: " + diameter + "px; height: " + diameter + "px; left: " + (pos[1] - diameter / 2) + "px;top: " + (pos[0] - diameter / 2) + "px;";
  rippleDiv.style = rippleDivStyle;
  $self.appendChild(rippleDiv);
  window.setTimeout(function () {
    rippleDiv.parentNode.removeChild(rippleDiv);
  }, 1500);
} //=require _base.js


function select() {
  input_select();
  call(".select-field", "change", input_select);
}

function input_select() {
  document.querySelectorAll(".select-field").forEach(function () {
    var elem = document.querySelectorAll(".select-field");

    for (var c = 0; c < elem.length; c++) {
      var select = elem[c].getElementsByTagName('select')[0];

      if (select.value != " ") {
        $addClass(select, "has-value");
      } else {
        $removeClass(select, "has-value");
      }
    }
  });
} //=require _base.js


function Snackbar(data, callback) {
  var openAni = "slideUpBottom",
      closeAni = "slideDownBottom";

  if (!data.pos) {
    data["pos"] = {
      vertical: "bottom",
      horizontal: "center"
    };
  }

  if (!data.theme) data.theme = "dark";
  if (!data.actionButton) data.actionButton = "";

  if (data.pos.vertical == "top") {
    closeAni = "slideDownTop";
    openAni = "slideUpTop";
  }

  var snackbarElem = $get("snackbar");
  snackbarElem.innerHTML = "";
  snackbarElem.className = "";
  var snackbarClass = data.type + " " + data.pos.vertical + " " + data.pos.horizontal + " " + data.theme;
  snackbarElem.className += snackbarClass;
  var snackbarHTML = '<div class="snackbar"><text class="text">' + data.text + '</text>' + '<button class="ripple SnackClose"><i class="material-icons">close</i></button>' + '<button class="ripple SnackAction">' + data.actionButton + "</button></div>";
  snackbarElem.innerHTML = snackbarHTML;
  $get(".SnackClose").addEventListener("click", function () {
    callback(false);
    close();
  });
  $get(".SnackAction").addEventListener("click", function () {
    callback(true);
    close();
  });
  $get(".snackbar").className += " " + openAni;

  function timer(time) {
    var timer;

    if (time != null) {
      timer = setInterval(function () {
        clearInterval(timer);
        close();
      }, time);
    }
  }

  function close() {
    $get(".snackbar").className += " " + closeAni;
  }

  timer(data.time);
} //=require _base.js


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