/**
 * Matericious v0.10.1 (https://matericious.com/)
 * Copyright 2019 Matericious Authors
 * Licensed under MIT (https://github.com/Matericious/Matericious/blob/master/LICENSE)
 */

"use strict";

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
    $removeClass($get("body"), 'overlay');
  };

  this.is = function (che, def) {
    return !che ? def : che;
  };

  this.open = function (time) {
    _this.id = (_this.id.charAt(0) == '#' ? '' : '#') + _this.id;
    var id = $get(_this.id);
    if (data.overlay) $addClass($get("body"), 'overlay');
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

    var small_template = '<div id="' + name + '" class="loader small ' + _class + '"><progress class="' + type + '"/></div>',
        large_template = '<div id="' + name + '" class="loader large ' + _class + '"><label class="title">' + title + '</label><span class="subtext">' + subtext + '</span> <progress class="' + type + '"/></div>',
        base_template = '<div id="' + name + '" class="loader base ' + _class + '"><label class="title">' + title + '</label><progress class="circular"/></div>',
        template = size == 'small' ? small_template : size == 'base' ? base_template : large_template;
    $get('body').innerHTML += template;

    _this.open(time);
  };
}