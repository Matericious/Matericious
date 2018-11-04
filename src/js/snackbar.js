//=include _base.js

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
