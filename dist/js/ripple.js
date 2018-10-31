"use strict";

//=require _base.js
function ripple() {
  call(".ripple", "mousedown", rippleEffect);
}

function rippleEffect(event) {
  var $self = this,
      elemPos = $self.style.position = "relative",
      rippleDiv = document.createElement('div'),
      pos = [event.pageY - this.offsetTop, event.pageX - this.offsetLeft],
      diameter = Math.min(this.offsetHeight, this.offsetWidth, 100);
  rippleDiv.setAttribute("class", "rippleWave");
  var ripple = $get(".rippleWave");
  if (!elemPos || elemPos === "static") $self.style.position = "relative";
  var rippleDivStyle = "width: " + diameter + "px; height: " + diameter + "px; left: " + (pos[1] - diameter / 2) + "px;top: " + (pos[0] - diameter / 2) + "px;";
  rippleDiv.style = rippleDivStyle;
  $self.appendChild(rippleDiv);
  window.setTimeout(function () {
    rippleDiv.parentNode.removeChild(rippleDiv);
  }, 1500);
}