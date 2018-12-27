//=include _base.js

function BottomNavigation() {
  call(".bottomNav > [nav-id]", "click", function() {
    var target = this.getAttribute("nav-id"),
      btn = $get("[nav-id='"+target+"']"),
      targetContent = $get("[nav-content='"+target+"']");
  
    var divs = $all(".bottomNav > [nav-id]");
    var contents = $all("[nav-content]");
    
    [].forEach.call(divs, function(el) {
       $removeClass(el, 'active');
    });
    
    [].forEach.call(contents, function(el) { 
      $removeClass(el, 'active'); 
    });
    
    $addClass(btn, 'active');
    $addClass(targetContent, 'active');
  });
}
