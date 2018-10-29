function ready(callback) {
  // in case the document is already rendered
  if (document.readyState != "loading") callback();
  else if (document.addEventListener)
    // modern browsers
    document.addEventListener("DOMContentLoaded", callback);
  else
    // IE <= 8
    document.attachEvent("onreadystatechange", function() {
      if (document.readyState == "complete") callback();
    });
}

function call($class, $event, $func) {
  var elems = document.querySelectorAll($class);
  for (i = 0; i < elems.length; ++i) {
    addEvent(elems[i], $event, $func);
  }
}

function $handle(callback){
  try{
    callback();
  }
  catch(err){}
}

function $getChild(parent, child, n){
  return document.querySelectorAll(parent+' '+child)[n];
}

function $get(e) {
  return document.querySelector(e);
}

function $all(e) {
  return document.querySelectorAll(e);
}

function hexToRgb(hex) {
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;
  return r + "," + g + "," + b;
}

function hasClass(el, className) {
  $handle(function(){
    if (el.classList)
      return el.classList.contains(className)
    else
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  });
}

function $addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += " " + className;
}

function $removeClass(el, className) {
  if (el.classList) el.classList.remove(className);
  else if (hasClass(el, className)) {
    var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    el.className = el.className.replace(reg, " ");
  }
}

function addEvent(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
}

ready(function() {
  nesting();
});

function nesting() {
  var large_screen = 992,
    medium_screen = 768,
    small_screen = 500;

  function checkNesting() {
    var w =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
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
    for (var c = 0; c < nest_btn.length; c++)
      nest_btn[c].style.display = "block";
    nest_menu.innerHTML = "";
    nest_menu_btn.style.display = "none";
    for (var c = 0; c < num_to_nest; c++) {
      var icon_btn_title = nest_btn[c].getAttribute("title");
      var icon_title;
      if(icon_btn_title != null) {
        icon_title = " "+icon_btn_title
      }else{
        icon_title = "";
      }
      nest_menu_btn.style.display = "block";
      nest_btn[c].style.display = "none";
      nest_menu.innerHTML +=
        '<li><a href="#">' + nest_btn[c].innerHTML + icon_title + "</a></li>";
    }
  }
  checkNesting();
  addEvent(window, "resize", function(){
    checkNesting();
  });
}

function BigModal(data, callback) {
  var modalElem = $get("#"+data.id);
  var modal = $getChild('#'+data.id, 'modal', 0);

  modalElem.className += "fadeIn";
  modal.className += " slideDownIn";

  function timer(time) {
    var timer;
    if (time != null) {
      timer = setInterval(function() {
        clearInterval(timer);
        close();
      }, time);
    }
  }

  $get(".close").addEventListener("click", function(){
     close(modalElem, modal);
  });

  function close(modalElem, modal) {
    modalElem.classList.remove("fadeIn");
    modal.classList.remove("slideDownIn");
    function close() {
    modalElem.className += " fadeOut";
    modal.className += " hideElem";
    modal.classList.remove("slideDownIn");
    setTimeout(function() {
      modalElem.classList.remove("fadeIn");
    }, 500);
  }
  }

  timer(data.time);
}

ready(function() {
  drawer();
});

function drawer() {
    var _drawer = $get(".drawer"),
      _doc = $get("body");
    if (hasClass(_drawer, "active")) {
      _drawer.style.left = 0 + "px";
      _doc.style.marginLeft = _drawer.offsetWidth + "px";
    }
    if (hasClass(_drawer, "permanent")) {
      $addClass(_drawer, "notrans");
      $addClass(_doc, "notrans");
      _drawer.style.left = 0 + "px";
      _doc.style.marginLeft = _drawer.offsetWidth + "px";
      return;
    } else {
      call("[drawer]", "click", function() {
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
  };

ready(function() {
  gradient();
});

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

  document.querySelectorAll("[data-grad]").forEach(function() {
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
        gradient +=
          "rgba(" +
          hexToRgb(colorArr[i]) +
          ", 1) " +
          100 / colorArr.length * i +
          "%, ";
      }
      gradient = gradient.slice(0, gradient.length - 2);
      gradient += ")";
      divs[c].style.background = gradient;
    }
  });
}


function LoadingModal(data, callback) {
  if (!data.pos) {
    data["pos"] = {
      vertical: "center",
      horizontal: "center"
    };
  }

  if(!data.theme)
    data.theme = "";

  if(!data.title)
    data.title = "Please wait";

  if(!data.message)
    data.message = "Loading data.....";

  if(data.overlay === false){
     data.overlay = ""
  }else{
     data.overlay = "overlay"
  }

  var modalElem = $get("modal-con");
  modalElem.innerHTML = "";
  modalElem.className = "";

  var modalClass = data.overlay + " " + data.pos.vertical + " " + data.pos.horizontal + " " + data.theme;

  modalElem.className += modalClass;

  var smallLoadingModalHTML =
    '<modal class="loader '+data.type+'">'+
      '<svg md-loader stroke-width="5" viewBox="0 0 66 66">'+
       '<circle cx="33" cy="33" r="25" />'+
    '</svg></modal>';

  var mediumLoadingModalHTML =
       '<modal class="loader '+data.type+'">'+
          '<svg md-loader stroke-width="5" viewBox="0 0 66 66">'+
             '<circle cx="33" cy="33" r="25" />'+
          '</svg><span>Loading</span>'+
       '</modal>';

  var largeLoadingModalHTML =
       '<modal class="loader">'+
          '<header>'+data.title+'</header>'+
          '<main><div>'+
             '<svg md-loader stroke-width="5" viewBox="0 0 66 66">'+
                 '<circle cx="33" cy="33" r="25" />'+
             '</svg></div>'+
          '<div>'+data.message+'</div>'+
        '</main></modal>';

  if(data.type == 'small'){
     modalElem.innerHTML = smallLoadingModalHTML;
  }else if(data.type == 'medium'){
     modalElem.innerHTML = mediumLoadingModalHTML;
  }else{
     modalElem.innerHTML = largeLoadingModalHTML;
  }

  $get("modal-con").className += " fadeIn";
  $get("modal").className += " slideDownIn";

  function timer(time){
    var timer;
    if(time != null){
       timer = setInterval(function(){
          clearInterval(timer);
          close();
       },time);
     }
  }

  function close(){
     $get("modal-con").classList.remove("fadeIn");
     $get("modal").classList.remove("slideDownIn");
    return;
  }

  timer(data.time);
}

ready(function(){
  call("[open-menu]", "mousedown", menu);
});

function menu() {
    var id = this.getAttribute("open-menu");
    var clickTimes = 0,
      targetBtn = $get("[open-menu=" + id + "]"),
      targetMenu = $get("#"+id),
      default_class = targetMenu.className;

    if(default_class.includes("pullDown")) close();

    $addClass(targetMenu, "pullDown");
    setPosition();

    function setPosition() {
      var w =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth,
        h =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight,
        pos = [targetBtn.offsetTop, targetBtn.offsetLeft],
        size = [targetBtn.offsetWidth, targetBtn.offsetHeight],
        menu_size = [targetMenu.offsetWidth, targetMenu.offsetHeight];

      if(!(default_class.includes("right")) && (pos[1] + menu_size[0]) > w){
        $addClass(targetMenu, "right");
      //  alert("adding class");
      }else if((pos[1] - menu_size[0]) > w){
        //menu cannot go right
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
    addEvent(window, "resize", function(){
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

function Modal(data, callback) {
  if (!data.pos) {
    data["pos"] = {
      vertical: "center",
      horizontal: "center"
    };
  }
  if (!data.theme) data.theme = "";

  if (!data.title) data.title = "Modal";

  if (!data.overlayStyle) data.overlayStyle = "";

  if (data.overlay === false) {
    data.overlay = "";
  } else {
    data.overlay = "overlay";
  }

  var modalElem = $get("modal-con");
  modalElem.innerHTML = "";
  modalElem.className = "";

  if (data.primary == "") data.primary = "OK";

  if (!data.secondaryButton || data.secondaryButton == "")
    data.secondaryButton = "";

  if (data.title == "") data.title = "modal";

  if (!data.modalStyle) data.modalStyle = "ocean";

  if (!data.message) data.message = "";

  var messageModalHTML =
    '<modal class="' +
    data.modalStyle +
    '">' +
    "<header>" +
    data.title +
    "</header><main>" +
    data.message +
    "</main>" +
    '<action><button class="actionTwo">' +
    data.secondaryButton +
    '</button><button class="actionOne">' +
    data.primaryButton +
    "</button></action></modal>";

  var decisionModalHTML =
    '<modal class="' +
    data.type +
    " " +
    data.modalStyle +
    '"><header>' +
    data.message +
    "</header>" +
    '<action><button class="actionTwo">' +
    data.secondaryButton +
    '</button><button class="actionOne">' +
    data.primaryButton +
    "</button></action></modal>";

  var inputModalHTML =
    '<modal class="' +
    data.type +
    " " +
    data.modalStyle +
    '"><header>' +
    data.title +
    "</header>" +
    '<main><div class="input '+data.modalStyle+'"><input required="required" autofocus/>'+
    '<label>'+data.placeholder+'</label></div><span></span></main>'+

    '<action><button class="actionTwo">' +
    data.secondaryButton +
    '</button><button class="actionOne">' +
    data.primaryButton +
    "</button></action></modal>";

  var modalClass =
    data.overlay +
    " " +
    data.pos.vertical +
    " " +
    data.pos.horizontal +
    " " +
    data.theme +
    " " +
    data.overlayStyle;

  if (data.type == "message") {
    modalElem.innerHTML = messageModalHTML;
  } else if (data.type == "decision") {
    modalElem.innerHTML = decisionModalHTML;
  }else if(data.type == 'input'){
    modalElem.innerHTML = inputModalHTML;
  }

  modalElem.className += modalClass;

  $get("modal-con").className += " fadeIn";
  $get("modal").className += " slideDownIn";

  $get(".actionTwo").addEventListener("click", function() {
    close();
    callback(false);
  });
  $get(".actionOne").addEventListener("click", function() {
    close();
    callback(true);
  });

  function timer(time) {
    var timer;
    if (time != null) {
      timer = setInterval(function() {
        clearInterval(timer);
        close();
      }, time);
    }
  }

  function close() {
    $get("modal-con").className += " fadeOut";
    $get("modal").className += " hideElem";
    $get("modal").classList.remove("slideDownIn");
    setTimeout(function() {
      $get("modal-con").classList.remove("fadeIn");
    }, 500);
  }

  timer(data.time);
}

ready(function() {
  call(".ripple", "mousedown", ripple);
});

function ripple(event) {
  var $self = this,
    elemPos = ($self.style.position = "relative"),
    rippleDiv = document.createElement('div'),
    pos = [event.pageY - this.offsetTop, event.pageX - this.offsetLeft],
    diameter = Math.min(this.offsetHeight, this.offsetWidth, 100);

  rippleDiv.setAttribute("class", "rippleWave");
 var ripple = $get(".rippleWave");

   if (!elemPos || elemPos === "static") $self.style.position = "relative";

  var rippleDivStyle =
       "width: " +
      diameter +
      "px; height: " +
      diameter +
      "px; left: " +
      (pos[1] - diameter / 2) +
      "px;top: " +
      (pos[0] - diameter / 2) +
      "px;";

  rippleDiv.style = rippleDivStyle;
  $self.appendChild(rippleDiv);

  window.setTimeout(function () {
      rippleDiv.parentNode.removeChild(rippleDiv);
    }, 1500);
}

ready(function(){
  select();
  call(".select-field", "change", select);
});

function select(){
document.querySelectorAll(".select-field").forEach(function() {
    var elem = document.querySelectorAll(".select-field");
    for (var c = 0; c < elem.length; c++) {
      var select = elem[c].getElementsByTagName('select')[0];
      if(select.value != " "){
        $addClass(select, "has-value");
      }else{
        $removeClass(select, "has-value");
      }
    }
  });
}


function Snackbar(data, callback) {
  var openAni = "slideUpBottom", closeAni = "slideDownBottom";
  if (!data.pos) {
    data["pos"] = {
      vertical: "bottom",
      horizontal: "center"
    };
  }

  if (!data.theme) data.theme = "dark";

  if(!data.actionButton) data.actionButton = "";

  if(data.pos.vertical == "top"){
    closeAni = "slideDownTop";
    openAni = "slideUpTop";
  }

  var snackbarElem = $get("snackbar");
  snackbarElem.innerHTML = "";
  snackbarElem.className = "";

  var snackbarClass = data.type + " " + data.pos.vertical + " " + data.pos.horizontal + " " + data.theme;

  snackbarElem.className += snackbarClass;

  var snackbarHTML =
    '<div class="snackbar"><text class="text">'+ data.text +'</text>' +
      '<button class="ripple SnackClose"><i class="material-icons">close</i></button>' +
      '<button class="ripple SnackAction">' +data.actionButton +
    "</button></div>";

  snackbarElem.innerHTML = snackbarHTML;

  $get(".SnackClose").addEventListener("click", function() {
    callback(false);
    close();
  });
  $get(".SnackAction").addEventListener("click", function() {
    callback(true);
    close();
  });

  $get(".snackbar").className += " "+openAni;

  function timer(time){
    var timer;
    if(time != null){
       timer = setInterval(function(){
          clearInterval(timer);
          close();
       },time);
     }
  }

  function close(){
     $get(".snackbar").className += " "+closeAni;
  }

  timer(data.time);
}

ready(function() {
  tabs();
});

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
    var newTab = $get('.tabs-content [tab-id="'+tabID+'"]');

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

