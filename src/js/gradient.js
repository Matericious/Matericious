//=include _base.js

function gradient() {
  var main_colors = {
    light: "#ffffff",
    dark: "#424242",
    basic: "#cbcbcb",
    blue: "#0091ea",
    earth: "#34c559",
    night: "#424242",
    ocean: "#2e72ee",
    red: "#e93030",
    snow: "#ffffff",
    yellow: "#e7d507",
    purple: "#6924f0",
    pink: "#ff87cb",
    cyan: "#00bcd4",
    grey: "#99A3A4"
  };

  document.querySelectorAll("[data-grad]").forEach(function() {
    var divs = document.querySelectorAll("[data-grad]");
    for (var c = 0; c < divs.length; c++) {
      var gradient = "linear-gradient(90deg, ";
      var data_colors = divs[c].getAttribute("data-grad");
      for (var color in main_colors) {
        data_colors = data_colors.replace(color, main_colors[color]);
      }
      var colors = data_colors.replace(/#/g, "");
      var colorArr = colors.split(" ");
      for (var i = 0; i < colorArr.length; i++) {
        gradient +=
          "rgba(" +
          hexToRgb(colorArr[i]) +
          ", 1) " +
          100 / colorArr.length * i +
          "%, ";
      }
      gradient = gradient.slice(0, gradient.length - 2);
      gradient += ")";
      divs[c].style.background = gradient;
    }
  });
}
