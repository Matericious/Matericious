//=include _base.js

function BottomNavigation() {
  call(".bottomNav > [nav-id]", "click", function() {
    let target = this.getAttribute("nav-id"),
      btn = $get("[nav-id='"+target+"']"),
      divs = $all(".bottomNav > [nav-id]"),
      contents = $all("[nav-content]");
    
    [].forEach.call(divs, function(el) {
       $removeClass(el, 'active');
    });
    
    [].forEach.call(contents, function(el) { $removeClass(el, 'active'); });
    
    $addClass(btn, 'active');
  });
}
