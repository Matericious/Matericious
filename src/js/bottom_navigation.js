//=include _utilities.js

class Navigation extends Utilities {
  constructor() {
    super();
    this.theming();
    super.call(".bottomNav > [nav-id]", "click", this.BottomNavigation);
  }

  theming() {
    let divs = super.$all(".bottomNav > [nav-id]");
    [].forEach.call(divs, el => {
      if (!super.$class(":=", el, "active"))
        super.$class(":+", el, "no-active");
    });
  }

  BottomNavigation() {
    let target = this.getAttribute("nav-id"),
      btn = $m("[nav-id='" + target + "']").element,
      activebtn = $m(".bottomNav .active").element,
      targetContent = $m("[nav-content='" + target + "']").element;

    let divs = super.$all(".bottomNav > [nav-id]"),
      contents = super.$all("[nav-content]");

    [].forEach.call(divs, el => {
      super.$class(":-", el, "active");
      super.$class(":-", el, "no-active");
    });

    [].forEach.call(contents, el => {
      super.$class(":-", el, "active");
    });

    super.$class(":+", btn, "active");
    super.$class(":+", targetContent, "active");

    [].forEach.call(divs, el => {
      if (!super.$class(":=", el, "active"))
        super.$class(":+", el, "no-active");
    });
  }
}
