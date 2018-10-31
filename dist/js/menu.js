"use strict";

//=require _base.js
function menu() {
  call("[open-menu]", "mousedown", openMenu);
}

function openMenu() {
  var id = this.getAttribute("open-menu");
  var clickTimes = 0,
      targetBtn = $get("[open-menu=" + id + "]"),
      targetMenu = $get("#" + id),
      default_class = targetMenu.className;
  if (default_class.includes("pullDown")) close();
  $addClass(targetMenu, "pullDown");
  setPosition();

  function setPosition() {
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        pos = [targetBtn.offsetTop, targetBtn.offsetLeft],
        size = [targetBtn.offsetWidth, targetBtn.offsetHeight],
        menu_size = [targetMenu.offsetWidth, targetMenu.offsetHeight];

    if (!default_class.includes("right") && pos[1] + menu_size[0] > w) {
      $addClass(targetMenu, "right"); //  alert("adding class");
    } else if (pos[1] - menu_size[0] > w) {//menu cannot go right
    }

    targetMenu.style.top = size[1] / 2 + pos[0] + "px";

    if (default_class.includes("right")) {
      targetMenu.style.right = w - pos[1] - size[0] + "px";
    } else {
      targetMenu.style.left = pos[1] + "px";
    }
  }

  document.addEventListener("click", clickOutSide, true);
  /*When window size change reposition menu*/

  addEvent(window, "resize", function () {
    setPosition();
  });

  function clickOutSide(event) {
    clickTimes++;

    if (clickTimes > 1) {
      clickTimes = 0;
      close(targetMenu);
    }
  }

  function close(targetMenu) {
    $addClass(targetMenu, "pullUp");
    $removeClass(targetMenu, "pullDown");
    $removeClass(targetMenu, "pullUp");
    document.removeEventListener("click", clickOutSide, true);
    return;
  }
}