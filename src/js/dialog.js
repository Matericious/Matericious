//=include _base.js


function dialog(data) {
  this.id = is_string(data) ? data : data.target;
  this.data = data;
  this.$timer = (time, callback) => {
    var id = this.id;
    var timer;
    if (time != null) {
      timer = setInterval( ()=> {
        clearInterval(timer);
        callback(id);
      }, time);
    }
  };
  
  this.build = ()=> {};
  this.close = (id)=> {
    alert(id);
    close(id);
  };

  function close(id) {
    var dialog_ID = $get(id),
       _doc = $get('body'),
      _loader = $get(id + " .loader"),
      _created_overlay = $get("."+id.replace(/#/g, "")+".dialog_overlay"),
      modal_class = dialog_ID.className;
    $removeClass(_doc, "dialog-open");
    if (_loader != null) {
      _created_overlay = $get(id+" .loader_overlay");
    } else {
      if (modal_class.includes("full") || modal_class.includes("sheet")) {
        $removeClass(dialog_ID, "active");
      } else {
        $removeClass(dialog_ID, "expandUp");
      }
    }
    $handle(() => {
        _created_overlay.remove();
    });
    return;
  }
  
  this.open = (time) => {
    var id = this.id;
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
    this.$timer(time, close);
    call(id + " .close", "click", function() {
      close(id);
    });
    call(".dialog_overlay", "click", function() {
      close(id);
    });
  };
}
