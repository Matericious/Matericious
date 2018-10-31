//=require _base.js

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
      _loader = $get(id + " .loader"),
      _created_overlay = $get(".dialog_overlay"),
      modal_class = dialog_ID.className;
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

  this.loader = (time) => {
    if($get(this.id+' .loader') != null) close(this.id);
    var w =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth,
      _parent = $get(this.id),
      _overlay_opacity = (this.data.opacity != null) ? this.data.opacity : 0.8,
      _loader_color = (this.data.loaderColor != null) ? this.data.loaderColor : '',
      _text_color = (this.data.color != null) ? this.data.color : '',
      _overlay_background = 'rgba(0, 0, 0, '+_overlay_opacity+')',
      _loader_div = document.createElement("loader"),
      _loading_overlay = document.createElement("overlay"),
      _loader_class = ["dialog", "loader", "overlay"],
      _loader_overlay_class = ["loader_overlay"],
      _parent_size = [_parent.offsetWidth, _parent.offsetHeight],
      _svg_loader = (this.data.spinner == null || this.data.spinner) ?
        '<svg class="md-loader" stroke-width="5" viewBox="0 0 66 66">' +
          '<circle cx="33" cy="33" r="25" />' +
        '</svg>' : '';
    if(this.data.background != null){
      _overlay_background = 'rgba('+hexToRgb(this.data.background.replace(/#/g, ""))+', '+_overlay_opacity+')';
    }else if(this.data.theme == 'light'){
      _loader_overlay_class.push(this.data.theme);
      _overlay_background = 'rgba(255,255,255, '+_overlay_opacity+')'
    }

    if(this.data.size == null) _loader_class.push('small'); else _loader_class.push(this.data.size);
    if(this.data.style == null) _loader_class.push('basic'); else _loader_class.push(this.data.style);
    if(this.data.text != null){
      _svg_loader += '<span>'+this.data.text+'</span>';
    }
    if(_parent.style.position != 'relative') _parent.style.position = 'relative';
     _parent.appendChild(_loading_overlay), _loading_overlay.appendChild(_loader_div);

    for (var c = 0; c < _loader_overlay_class.length; c++) $addClass(_loading_overlay, _loader_overlay_class[c]);
    for (var c = 0; c < _loader_class.length; c++) $addClass(_loader_div, _loader_class[c]);

    var _loader = $get(this.id+' .loader');
    if(_parent_size[0] == $get('body').offsetWidth && _parent.tagName.toLowerCase() == 'body'){
      _parent.style.position = 'normal';
      $get(this.id+' .loader_overlay').style.position = 'fixed';
    }
    if(_parent_size[1] < _loader.offsetHeight){
      _loader.style.width = (_parent_size[0])+'px';
      _loader.style.height = (_parent_size[1] / 1)+'px';
    }
    $get(this.id+' .loader_overlay').style.background = _overlay_background;
    $get(this.id+' .loader').style.color =_text_color;
    _loader_div.innerHTML = _svg_loader;
    if(this.data.spinner == null || this.data.spinner) $get(this.id+' .md-loader circle').style.stroke = _loader_color;
    this.$timer(time, close);
  };

  this.open = (time) => {
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
