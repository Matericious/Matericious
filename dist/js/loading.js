
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
    
  var modalElem = $getT("modal-con", 0);  
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
  
  $getT("modal-con", 0).className += " fadeIn";
  $getT("modal", 0).className += " slideDownIn";
  
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
     $getT("modal-con", 0).classList.remove("fadeIn");
     $getT("modal", 0).classList.remove("slideDownIn");
  }

  timer(data.time);
}

/*this function returns the element by ID*/
function $getID(e) {
  return document.getElementById(e);
}
/*this function returns the element by class name*/
function $getCL(e, n) {
  return document.getElementsByClassName(e)[n];
}
/*this function returns the element by tag name*/
function $getT(e, n) {
  return document.getElementsByTagName(e)[n];
}
