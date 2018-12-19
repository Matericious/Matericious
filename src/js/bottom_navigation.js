//=include _base.js

function BottomNavigation() {
  call(".bottomNav > [nav-id]", "click", function() {
    var target = this.getAttribute("nav-id"),
      btn = $get("[nav-id='"+target+"']");
    
    var divs = document.querySelectorAll(".bottomNav > [nav-id]");

    [].forEach.call(divs, function(el) {
       $removeClass(el, 'active');
    });
    $addClass(btn, 'active');
  });
}
