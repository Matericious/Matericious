//=include _base.js

function tabs(event) {
  let activePos = $get(".tabs-header .active"),
    border = $get(".border"),
    tab = $get(".tab.active");

  function changePos() {
    let activePos = $get(".tabs-header .active");
    let pos = [activePos.offsetTop, activePos.offsetLeft],
      size = [activePos.offsetWidth, activePos.offsetHeight];
    border.style = `left: ${pos[1]}px; width: ${size[0]}px`;
    let scrollH = $get('.tabs-header');
    scrollH.scrollLeft = pos[1];
  }
  changePos();
  let tabHeight = tab.offsetHeight;

  function changeTab(tabID) {
    let tab = $get('.tabs-content .active');
    let newTab = $get(`.tabs-content [tab-id="${tabID}"]`);
    let tabs = $all(".tabs-content .tab");
    tabs.forEach(function(tab) {
      $removeClass(tab, "active");
    })
    $addClass(newTab, 'active');
  }

  function tabClick(event) {
    let tabID = this.getAttribute("tab-id");
    let tabs = $all(".tabs-header a");
    tabs.forEach(function (tab) {
      $removeClass(tab, "active");
    })
    $addClass(this, "active");
    changePos();
    changeTab(tabID);
  }
  call(".tabs-header a", "mousedown", tabClick);
}
