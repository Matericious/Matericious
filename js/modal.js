"use strict"; //=require _base.js

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
  if (!data.secondaryButton || data.secondaryButton == "") data.secondaryButton = "";
  if (data.title == "") data.title = "modal";
  if (!data.modalStyle) data.modalStyle = "ocean";
  if (!data.message) data.message = "";
  var messageModalHTML = '<modal class="' + data.modalStyle + '">' + "<header>" + data.title + "</header><main>" + data.message + "</main>" + '<action><button class="actionTwo">' + data.secondaryButton + '</button><button class="actionOne">' + data.primaryButton + "</button></action></modal>";
  var decisionModalHTML = '<modal class="' + data.type + " " + data.modalStyle + '"><header>' + data.message + "</header>" + '<action><button class="actionTwo">' + data.secondaryButton + '</button><button class="actionOne">' + data.primaryButton + "</button></action></modal>";
  var inputModalHTML = '<modal class="' + data.type + " " + data.modalStyle + '"><header>' + data.title + "</header>" + '<main><div class="input ' + data.modalStyle + '"><input required="required" autofocus/>' + '<label>' + data.placeholder + '</label></div><span></span></main>' + '<action><button class="actionTwo">' + data.secondaryButton + '</button><button class="actionOne">' + data.primaryButton + "</button></action></modal>";
  var modalClass = data.overlay + " " + data.pos.vertical + " " + data.pos.horizontal + " " + data.theme + " " + data.overlayStyle;

  if (data.type == "message") {
    modalElem.innerHTML = messageModalHTML;
  } else if (data.type == "decision") {
    modalElem.innerHTML = decisionModalHTML;
  } else if (data.type == 'input') {
    modalElem.innerHTML = inputModalHTML;
  }

  modalElem.className += modalClass;
  $get("modal-con").className += " fadeIn";
  $get("modal").className += " slideDownIn";
  $get(".actionTwo").addEventListener("click", function () {
    close();
    callback(false);
  });
  $get(".actionOne").addEventListener("click", function () {
    close();
    callback(true);
  });

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
    $get("modal-con").className += " fadeOut";
    $get("modal").className += " hideElem";
    $get("modal").classList.remove("slideDownIn");
    setTimeout(function () {
      $get("modal-con").classList.remove("fadeIn");
    }, 500);
  }

  timer(data.time);
}