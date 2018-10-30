function dialog(data) {
  this.id = is_string(data) ? data : data.target;
  this.$timer = function(time, callback) {
    var id = this.id;
    var timer;
    if (time != null) {
      timer = setInterval(function() {
        clearInterval(timer);
        callback(id);
      }, time);
    }
  };
  this.build = function() {};
  this.close = function(id) {
    close(id);
  };

  function close(id) {
    var dialog_ID = $get(id),
      _loader = $get(id + " .loader"),
      _created_overlay = $get(".dialog_overlay"),
      modal_class = dialog_ID.className;
    if (_loader != null) {
      _created_overlay = $get(id+" .loader_overlay");
    } else {
      if (modal_class.includes("full") || modal_class.includes("sheet")) {
        $removeClass(dialog_ID, "active");
      } else {
        $removeClass(dialog_ID, "fadeIn");
      }
    }
    $handle(function(){
        _created_overlay.remove();
    });
  }

  this.loader = function(time) {
    var _parent = $get(this.id),
      _loader_div = document.createElement("div"),
      _loading_overlay = document.createElement("div"),
      _loader_class = ["dialog", "loader", "small", "overlay"],
      _loader_overlay_class = ["loader_overlay"],
      _parentHeight = _parent.offsetHeight,
      _svg_loader =
        '<svg md-loader stroke-width="5" viewBox="0 0 66 66">' +
        '<circle cx="33" cy="33" r="25" />' +
        "</svg>";
  //  if(_parent.style.position != 'relative') _parent.style.position = 'relative';
     _parent.appendChild(_loading_overlay), _loading_overlay.appendChild(_loader_div);
    for (var c = 0; c < _loader_overlay_class.length; c++) $addClass(_loading_overlay, _loader_overlay_class[c]);
    for (var c = 0; c < _loader_class.length; c++) $addClass(_loader_div, _loader_class[c]);
    var _loader = $get(this.id+' .loader');
    if(_parentHeight < _loader.offsetHeight){
      _loader.style.height = (_parentHeight / 2);
    }
    _loader_div.innerHTML = _svg_loader;
    this.$timer(time, close);
  };

  this.open = function(time) {
    var id = this.id;
    var modal_ID = $get(id),
      _doc = $get("body"),
      modal_class = modal_ID.className;
    if (modal_class.includes("overlay")) {
      var overlay_div = document.createElement("div");
      _doc.appendChild(overlay_div);
      $addClass(overlay_div, "dialog_overlay");
    }
    if (modal_class.includes("full") || modal_class.includes("sheet")) {
      $addClass(modal_ID, "active");
    } else {
      $addClass(modal_ID, "fadeIn");
    }
    this.$timer(time, close);
    call(id + " .close", "click", function() {
      close(id);
    });
    call(".dialog_overlay", "click", function() {
      close(id);
    });
  };
}
