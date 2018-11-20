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

; 

var Colors = {
  red: {
    base: '#F44336',
    light: {
      1: '#EF5350',
      2: '#E57373',
      3: '#EF9A9A',
      4: '#FFCDD2',
      5: '#FFEBEE'
    },
    dark: {
      1: '#E53935',
      2: '#D32F2F',
      3: '#C62828',
      4: '#B71C1C'
    }
  },
  pink: {
    base: '#E91E63',
    light: {
      1: '#EC407A',
      2: '#F06292',
      3: '#F48FB1',
      4: '#F8BBD0',
      5: '#FCE4EC'
    },
    dark: {
      1: '#D81B60',
      2: '#C2185B',
      3: '#AD1457',
      4: '#880E4F'
    }
  },
  purple: {
    base: '#9C27B0',
    light: {
      1: '#AB47BC',
      2: '#BA68C8',
      3: '#CE93D8',
      4: '#E1BEE7',
      5: '#F3E5F5'
    },
    dark: {
      1: '#8E24AA',
      2: '#7B1FA2',
      3: '#6A1B9A',
      4: '#4A148C'
    }
  },
  deepPurple: {
    base: '#673AB7',
    light: {
      1: '#7E57C2',
      2: '#9575CD',
      3: '#B39DDB',
      4: '#D1C4E9',
      5: '#EDE7F6'
    },
    dark: {
      1: '#5E35B1',
      2: '#512DA8',
      3: '#4527A0',
      4: '#311B92'
    }
  },
  indigo: {
    base: '#3F51B5',
    light: {
      1: '#5C6BC0',
      2: '#7986CB',
      3: '#9FA8DA',
      4: '#C5CAE9',
      5: '#E8EAF6'
    },
    dark: {
      1: '#3949AB',
      2: '#303F9F',
      3: '#283593',
      4: '#1A237E'
    }
  },
  blue: {
    base: '#2196F3',
    light: {
      1: '#42A5F5',
      2: '#64B5F6',
      3: '#90CAF9',
      4: '#BBDEFB',
      5: '#E3F2FD'
    },
    dark: {
      1: '#1E88E5',
      2: '#1976D2',
      3: '#1565C0',
      4: '#0D47A1'
    }
  },
  lightBlue: {
    base: '#03A9F4',
    light: {
      1: '#29B6F6',
      2: '#4FC3F7',
      3: '#81D4FA',
      4: '#B3E5FC',
      5: '#E1F5FE'
    },
    dark: {
      1: '#039BE5',
      2: '#0288D1',
      3: '#0277BD',
      4: '#01579B'
    }
  },
  cyan: {
    base: '#00BCD4',
    light: {
      1: '#26C6DA',
      2: '#4DD0E1',
      3: '#80DEEA',
      4: '#B2EBF2',
      5: '#E0F7FA'
    },
    dark: {
      1: '#00ACC1',
      2: '#0097A7',
      3: '#00838F',
      4: '#006064'
    }
  },
  teal: {
    base: '#009688',
    light: {
      1: '#26A69A',
      2: '#4DB6AC',
      3: '#80CBC4',
      4: '#B2DFDB',
      5: '#E0F2F1'
    },
    dark: {
      1: '#00897B',
      2: '#00796B',
      3: '#00695C',
      4: '#004D40'
    }
  },
  green: {
    base: '#4CAF50',
    light: {
      1: '#66BB6A',
      2: '#81C784',
      3: '#A5D6A7',
      4: '#C8E6C9',
      5: '#E8F5E9'
    },
    dark: {
      1: '#43A047',
      2: '#388E3C',
      3: '#2E7D32',
      4: '#1B5E20'
    }
  },
  lightGreen: {
    base: '#8BC34A',
    light: {
      1: '#9CCC65',
      2: '#AED581',
      3: '#C5E1A5',
      4: '#DCEDC8',
      5: '#F1F8E9'
    },
    dark: {
      1: '#7CB342',
      2: '#689F38',
      3: '#558B2F',
      4: '#33691E'
    }
  },
  lime: {
    base: '#CDDC39',
    light: {
      1: '#D4E157',
      2: '#DCE775',
      3: '#E6EE9C',
      4: '#F0F4C3',
      5: '#F9FBE7'
    },
    dark: {
      1: '#C0CA33',
      2: '#AFB42B',
      3: '#9E9D24',
      4: '#827717'
    }
  },
  yellow: {
    base: '#FFEB3B',
    light: {
      1: '#FFEE58',
      2: '#FFF176',
      3: '#FFF59D',
      4: '#FFF9C4',
      5: '#FFFDE7'
    },
    dark: {
      1: '#FDD835',
      2: '#FBC02D',
      3: '#F9A825',
      4: '#F57F17'
    }
  },
  amber: {
    base: '#FFC107',
    light: {
      1: '#FFCA28',
      2: '#FFD54F',
      3: '#FFE082',
      4: '#FFECB3',
      5: '#FFF8E1'
    },
    dark: {
      1: '#FFB300',
      2: '#FFA000',
      3: '#FF8F00',
      4: '#FF6F00'
    }
  },
  orange: {
    base: '#FF9800',
    light: {
      1: '#FFA726',
      2: '#FFB74D',
      3: '#FFCC80',
      4: '#FFE0B2',
      5: '#FFF3E0'
    },
    dark: {
      1: '#FB8C00',
      2: '#F57C00',
      3: '#EF6C00',
      4: '#E65100'
    }
  },
  deepOrange: {
    base: '#FF5722',
    light: {
      1: '#FF7043',
      2: '#FF8A65',
      3: '#FFAB91',
      4: '#FFCCBC',
      5: '#FBE9E7'
    },
    dark: {
      1: '#F4511E',
      2: '#E64A19',
      3: '#D84315',
      4: '#BF360C'
    }
  },
  brown: {
    base: '#795548',
    light: {
      1: '#8D6E63',
      2: '#A1887F',
      3: '#BCAAA4',
      4: '#D7CCC8',
      5: '#EFEBE9'
    },
    dark: {
      1: '#6D4C41',
      2: '#5D4037',
      3: '#4E342E',
      4: '#3E2723'
    }
  },
  grey: {
    base: '#9E9E9E',
    light: {
      1: '#BDBDBD',
      2: '#E0E0E0',
      3: '#EEEEEE',
      4: '#F5F5F5',
      5: '#FAFAFA'
    },
    dark: {
      1: '#757575',
      2: '#616161',
      3: '#424242',
      4: '#212121'
    }
  },
  blueGrey: {
    base: '#607D8B',
    light: {
      1: '#78909C',
      2: '#90A4AE',
      3: '#B0BEC5',
      4: '#CFD8DC',
      5: '#ECEFF1'
    },
    dark: {
      1: '#546E7A',
      2: '#455A64',
      3: '#37474F',
      4: '#263238'
    }
  },
  black: {
    base: '#000000'
  },
  white: {
    base: '#FFFFFF'
  }
};

function gradient() {
  document.querySelectorAll("[gradient]").forEach(function () {
    var divs = document.querySelectorAll("[gradient]");

    for (var c = 0; c < divs.length; c++) {
      var gradientType = !divs[c].getAttribute("gradient-type") ? 'linear, to right' : divs[c].getAttribute("gradient-type"),
          gradient_type = gradientType.split(",")[0] ? gradientType.split(",")[0] : '',
          gradient_pos = gradientType.split(",")[1] ? gradientType.split(",")[1] + ", " : '';
      var gradient = gradient_type + "-gradient(" + gradient_pos;
      var data_colors = divs[c].getAttribute("gradient").split(" ");

      for (var color in data_colors) {
        if (data_colors[color].startsWith("#", 0)) {
          data_colors[color] = data_colors[color].replace(/#/g, "");
        } else {
          var color_array = data_colors[color].split("-");

          try {
            data_colors[color] = getColor(color_array[0], color_array[1] != null ? color_array[1] : null, color_array[2] != null ? color_array[2] : null).replace(/#/g, "");
          } catch (err) {}
        }
      }

      for (var i = 0; i < data_colors.length; i++) {
        gradient += "rgba(" + hexToRgb(data_colors[i]) + ", 1), ";
      }

      gradient = gradient.slice(0, gradient.length - 2);
      gradient += ")";
      divs[c].style.background = gradient;
    }
  });
}

function getColor(color, rang, shade) {
  return shade != null ? Colors[color][rang][shade] : Colors[color].base;
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
      $addClass(targetMenu, "right"); 
    } else if (pos[1] - menu_size[0] > w) {
    }

    targetMenu.style.top = size[1] / 2 + pos[0] + "px";

    if (default_class.includes("right")) {
      targetMenu.style.right = w - pos[1] - size[0] + "px";
    } else {
      targetMenu.style.left = pos[1] + "px";
    }
  }

  document.addEventListener("click", clickOutSide, true);

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
} 


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
} 


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
//# sourceMappingURL=matericious.js.map
