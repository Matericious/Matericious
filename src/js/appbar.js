//=include _base.js

function nesting() {
  const large_screen = 992,
    medium_screen = 768,
    small_screen = 500;

  function checkNesting() {
    let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let num_to_nest;
    let nest_menu = $get("#nesting");
    let nest_menu_btn = $get('[open-menu="nesting"]');
    let nest_btns = $all(".appbar .nest");
    if (w < large_screen) {
      num_to_nest = 1;
      if (w <= medium_screen && w >= small_screen) {
        num_to_nest = 2;
      } else if (w <= small_screen) {
        num_to_nest = nest_btns.length;
      }
    }
    nest_btns.forEach(function (nest_btn) {
      nest_btn.style.display = "block";
    })
    nest_menu.innerHTML = "";
    nest_menu_btn.style.display = "none";
    nest_btns.forEach(function (nest_btn) {
      let icon_btn_title = nest_btn.getAttribute("title");
      let icon_title;
      if (icon_btn_title != null) {
        icon_title = ` ${icon_btn_title}`;
      } else {
        icon_title = "";
      }
      nest_menu_btn.style.display = "inline-block";
      nest_btn.style.display = "none";
      nest_menu.innerHTML += `<li><a href="#">${nest_btn.innerHTML + icon_title}</a></li>`;
    })
  }
  checkNesting();
    addEvent(window, "resize", function () {
      checkNesting();
    });
  }

  function collapse() {
    let $curr_scr_pos = window.pageYOffset;
    if ($get('.dense')) {
      $get('.dense').style.top = ($pre_Scr_Pos > $curr_scr_pos) ? "0" : "-65px";
      $pre_Scr_Pos = $curr_scr_pos;
    }
    if ($get('.collapse')) {
      $get('.collapse .title').style.display = ($curr_scr_pos < 5) ? "inline-block" : "none";
      $get('.collapse').style.width = ($curr_scr_pos < 5) ? "100%" : "115px";
      $get('.collapse').style.borderRadius = ($curr_scr_pos < 5) ? "0" : "0px 0px 30px 0px";
    }
  }
  let $pre_Scr_Pos = window.pageYOffset;
  window.onscroll = () => {
    collapse();
  }
