ready(function() {
  call("[open-menu]", "mousedown", menu);
  drawer();
});

function menu() {
  var id = this.getAttribute("open-menu");
  var clickTimes = 0,
    targetBtn = $get("[open-menu=" + id + "]"),
    targetMenu = $get("#" + id),
    default_class = targetMenu.className;

  if (default_class.includes("pullDown")) close();

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

    if (!default_class.includes("right") && pos[1] + menu_size[0] > w) {
      $addClass(targetMenu, "right");
      //  alert("adding class");
    } else if (pos[1] - menu_size[0] > w) {
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
  window.onresize = function() {
    setPosition();
  };

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
    '<main><div class="' +
    data.modalStyle +
    '" mui-input><input required="required" autofocus/>' +
    "<label>" +
    data.placeholder +
    "</label></div><span></span></main>" +
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
  } else if (data.type == "input") {
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
}

function BigModal(data, callback) {
  var modalElem = $get("#" + data.id);
  var modal = $getChild("#" + data.id, "modal", 0);

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

  $get(".close").addEventListener("click", function() {
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

  var snackbarClass =
    data.type +
    " " +
    data.pos.vertical +
    " " +
    data.pos.horizontal +
    " " +
    data.theme;

  snackbarElem.className += snackbarClass;

  var snackbarHTML =
    '<div class="snackbar"><text class="text">' +
    data.text +
    "</text>" +
    '<button class="ripple SnackClose"><i class="material-icons">close</i></button>' +
    '<button class="ripple SnackAction">' +
    data.actionButton +
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

  $get(".snackbar").className += " " + openAni;

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
    $get(".snackbar").className += " " + closeAni;
  }

  timer(data.time);
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

function ready(callback) {
  if (document.readyState != "loading") callback();
  else if (document.addEventListener)
    document.addEventListener("DOMContentLoaded", callback);
  else
    document.attachEvent("onreadystatechange", function() {
      if (document.readyState == "complete") callback();
    });
}
function call($class, $event, $func) {
  var elems = document.querySelectorAll($class);
  for (i = 0; i < elems.length; ++i) {
    elems[i].addEventListener($event, $func);
  }
}
function $get(e) {
  return document.querySelector(e);
}

function $getChild(parent, child, n) {
  return document.querySelectorAll(parent + " " + child)[n];
}

function hasClass(el, className) {
  if (el.classList) return el.classList.contains(className);
  else
    return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
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
