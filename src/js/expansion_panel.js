//=include _base.js

function ExpansionPanel() {
  call(".panel > [expan]", "click", function() {
    var target = this.getAttribute("expan"),
        details = $get("#"+target),
        panel = $get(".panel > [expan="+target+"]"),
        contentHeight = $get("#"+target+" > .content").offsetHeight,
        icon = $get("[expan="+target+"] > i"),
        cusIcon = (!icon.getAttribute("cus-icon")) ? 'keyboard_arrow_up' : icon.getAttribute("cus-icon");
    
    var icons = ['keyboard_arrow_down', cusIcon];
    
    if(panel.className.includes("active")){
      icon.innerHTML = icons[0];
     // icon.setAttribute("cus-icon", icons[1]);
      details.style.height = 0+"px";
      $removeClass(panel, 'active');
    }else{
      icon.innerHTML = icons[1];
     // icon.setAttribute("cus-icon", icons[0]);
      details.style.height = contentHeight+"px";
      $addClass(panel, 'active');
    }
  });
}
