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
