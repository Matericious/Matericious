//=include _base.js

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
