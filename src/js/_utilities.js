function $m(selector) {
  let self = {};
  self.selector = selector;
  self.element = document.querySelector(self.selector);

  self.self = () => {
    return self.element;
  };
  self.html = value => {
    self.element.innerHTML = value;
    return self;
  };
  self.all = () => {
    self.element = document.querySelectorAll(self.selector);
    return self;
  };
  self.val = value => {
    if (value) self.element.value = value;
    return self.element.value;
  };
  self.attr = (name, value) => {
    if (!value) return self.element.getAttribute(name);
    self.element.setAttribute(name, value);
    return self;
  };
  self.when = (type, callback) => {
    addEvent(self.element, type, callback);
    return self;
  };

  self.add = name => {
    if (self.element.classList) self.element.classList.add(name);
    else if (!self.has(name)) self.element.className += ` ${name}`;
    return self;
  };

  self.class = name => {
    if (self.has(name)) {
      self.remove(name);
    } else {
      self.add(name);
    }
  };

  self.delete = () => {
    self.element.remove();
  };

  self.remove = name => {
    if (self.element.classList) {
      self.element.classList.remove(name);
    } else if (self.has(name)) {
      let reg = new RegExp(`(\\s|^)${name}(\\s|$)`);
      self.element.className = self.element.className.replace(reg, " ");
    }
    return self;
  };

  self.hide = () => {
    self.element.style.display = "none";
  };

  self.show = () => {
    self.element.style = "";
  };

  self.ready = callback => {
    if (document.readyState != "loading") callback();
    else if (document.addEventListener)
      document.addEventListener("DOMContentLoaded", callback);
    else
      document.attachEvent("onreadystatechange", function() {
        if (document.readyState == "complete") callback();
      });
    return self;
  };

  self.has = value => {
    if (self.element.classList) return self.element.classList.contains(value);
    else
      return !!self.element.value.match(new RegExp(`(\\s|^)${value}(\\s|$)`));
    return self;
  };

  self.insert = (where, newElement) => {
    if (where == ":first") {
      self.element.insertBefore(newElement, self.element.firstElementChild);
    } else {
    }
    return self;
  };

  //LOADED FUNCTIONS
  let addEvent = (object, type, callback) => {
    if (object == null || typeof object == "undefined") return;
    if (object.addEventListener) {
      object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
      object.attachEvent("on" + type, callback);
    } else {
      object["on" + type] = callback;
    }
  };
  return self;
}

class Utilities {
  constructor() {}
  is_string(value) {
    if (typeof value === "string" || value instanceof String) {
      return true;
    } else {
      return false;
    }
  }

  gen_ID() {
    return (
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }

  create(value) {
    return document.createElement(value);
  }

  $handle(callback) {
    try {
      callback();
    } catch (err) {}
  }

  $class(event, el, className) {
    if (event == "add" || event == ":+") {
      if (el.classList) el.classList.add(className);
      else if (!hasClass(el, className)) el.className += ` ${className}`;
    } else if (event == "remove" || event == ":-") {
      if (el.classList) el.classList.remove(className);
      else if (hasClass(el, className)) {
        let reg = new RegExp(`(\\s|^)${className}(\\s|$)`);
        el.className = el.className.replace(reg, " ");
      }
    } else if (event == "has" || event == ":=") {
      return (" " + el.className + " ").indexOf(" " + className + " ") > -1;
    }
  }

  call($class, $event, $func) {
    let elems = document.querySelectorAll(`${$class}`);
    elems.forEach(function(elem) {
      addEvent(elem, $event, $func);
    });
  }

  insert(where, target, element) {}
  $all(e) {
    return document.querySelectorAll(e);
  }
}

function addEvent(object, type, callback) {
  if (object == null || typeof object == "undefined") return;
  if (object.addEventListener) {
    object.addEventListener(type, callback, false);
  } else if (object.attachEvent) {
    object.attachEvent("on" + type, callback);
  } else {
    object["on" + type] = callback;
  }
}
