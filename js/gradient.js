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
  $all("[gradient]").forEach(function (elem) {
    var gradientType = !elem.getAttribute("gradient-type") ? 'linear, to right' : elem.getAttribute("gradient-type"),
        gradient_type = gradientType.split(",")[0] ? gradientType.split(",")[0] : '',
        gradient_pos = gradientType.split(",")[1] ? gradientType.split(",")[1] + ", " : '';
    var gradient = "".concat(gradient_type, "-gradient(").concat(gradient_pos);
    var data_colors = elem.getAttribute("gradient").split(" ");

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

    data_colors.forEach(function (color) {
      gradient += "rgba(".concat(hexToRgb(color), ", 1), ");
    });
    gradient = gradient.slice(0, gradient.length - 2);
    gradient += ")";
    elem.style.background = gradient;
  });
}

function getColor(color, rang, shade) {
  return shade != null ? Colors[color][rang][shade] : Colors[color].base;
}