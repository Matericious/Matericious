//=include _base.js

function ExpansionPanel() {
  call(".panel > [expan]", "click", function () {
    let target = this.getAttribute("expan"),
      details = $get(`#${target}`),
      panel = $get(`.panel > [expan="${target}"]`),
      contentHeight = $get("#" + target + " > .content").offsetHeight,
      icon = $get(`[expan="${target}"] > i`),
      cusIcons = icon.getAttribute("cus-icon");
    let icons = ['keyboard_arrow_down', 'keyboard_arrow_up'];
    if (panel.className.includes("active")) {
      icon.innerHTML = icons[0];
      details.style.height = 0 + "px";
      $removeClass(panel, 'active');
    } else {
      icon.innerHTML = icons[1];
      details.style.height = contentHeight + "px";
      $addClass(panel, 'active');
    }
  });
}
