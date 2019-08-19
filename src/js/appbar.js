//=include _utilities.js

class Appbar extends Utilities {
  constructor() {
    super();
    this.nesting();
    this.scrollFunc();
  }

  nesting() {
    const large_screen = 992,
      medium_screen = 768,
      small_screen = 500;

    let nest_menu = $m("#nesting").element;
    let nest_menu_btn = $m('[menu="nesting"]').element;
    let nest_btns = super.$all(".appbar .nest");

    function nest() {
      let num_to_nest;
      let w =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      //console.log("log function called "+large_screen);
      if (w < large_screen) {
        num_to_nest = 1;
        if (w <= medium_screen && w >= small_screen) {
          num_to_nest = 2;
        } else if (w <= small_screen) {
          num_to_nest = nest_btns.length;
        }
      }
      nest_btns.forEach(btn => {
        btn.style.display = "inline-block";
      });
      nest_menu.innerHTML = "";
      nest_menu_btn.style.display = "none";
      /*[num_to_nest].forEach((c)=>{
  
      });*/

      for (var c = 0; c < num_to_nest; c++) {
        var icon_btn_title = nest_btns[c].getAttribute("title");
        var icon_title;
        if (icon_btn_title != null) {
          icon_title = " " + icon_btn_title;
        } else {
          icon_title = "";
        }

        nest_menu_btn.style.display = "inline-block";
        nest_btns[c].style.display = "none";
        nest_menu.innerHTML += `<li><a href="#">${nest_btns[c].innerHTML +
          icon_title} </a></li>`;
      }
    }
    nest();
    addEvent(window, "resize", () => {
      nest();
    });
  }

  scrollFunc() {
    let curr_scr_pos = window.pageYOffset,
      pre_Scr_Pos;
    let dense = $m(".dense").element,
      collapse = $m(".collapse").element,
      title = $m(".appbar .title").element;

    function collapse_func() {
      if ($m(".dense").element) {
        dense.style.top = pre_Scr_Pos > curr_scr_pos ? "0" : "-65px";
        pre_Scr_Pos = curr_scr_pos;
      }
      if ($m(".collapse").element) {
        title.style.display = curr_scr_pos < 5 ? "inline-block" : "none";
        collapse.style.width = curr_scr_pos < 5 ? "100%" : "115px";
        collapse.style.borderRadius =
          curr_scr_pos < 5 ? "0" : "0px 0px 30px 0px";
      }
    }
    collapse_func();
    pre_Scr_Pos = window.pageYOffset;
    window.onscroll = () => {
      collapse_func();
    };
  }
}
