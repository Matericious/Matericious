//=include _utilities.js

class Snackbar extends Utilities {
  constructor(message, action, time, callback) {
    super();
    this.id = super.gen_ID();
    this.ani = ["aniOpen", "aniClose"];
    let speedSnack = {
      type: action ? "action" : "message",
      text: message ? message : "",
      time: time ? time : 5000,
      actionButton: action ? action : ""
    };

    if (message) {
      this.create(speedSnack, callback);
      this.show();
    }
  }

  message() {
    alert("welcome");
  }

  create(data, callback) {
    this.data = {
      ID: this.id,
      class: "." + this.id,
      type: !data.type ? "message" : data.type,
      text: data.text,
      time: !data.time ? null : data.time,
      theme: !data.theme ? "dark" : data.theme,
      actionButton: !data.actionButton ? "" : data.actionButton,
      vert: !data.vert ? "bottom" : data.vert,
      hori: !data.hori ? "left" : data.hori
    };

    callback = !callback ? d => {} : callback;
    const snack = this.data;
    let snack_div = super.create("div");
    let snack_class_array = `${snack.type} ${snack.vert} ${snack.hori} ${
      snack.theme
    }`.split(" ");

    snack_div.className = "snackbar " + snack.ID;
    const snack_elem = `<div>
      <text class="text">${snack.text}</text>
      <button class="ripple SnackClose"><i class="material-icons">close</i></button>
      <button class="ripple SnackAction">${snack.actionButton}</button>
    </div>`;

    document.body.appendChild(snack_div);
    $m(snack.class).html(snack_elem);

    snack_class_array.forEach(_class => {
      $m(snack.class).class(_class);
    });

    $m(`${this.data.class} .SnackClose`).when("click", () => {
      callback(false);
      this.close();
    });
    $m(`${this.data.class} .SnackAction`).when("click", () => {
      callback(true);
      this.close();
    });

    this.timer(snack.time);
  }

  show() {
    $m(`${this.data.class}`).class(this.ani[0]);
  }

  timer(time) {
    this.timer;
    if (time != null) {
      this.timer = setInterval(() => {
        clearInterval(this.timer);
        this.close();
      }, time);
    }
  }

  close(close_class) {
    $m(this.data.class).class(this.ani[0]);
    $m(this.data.class).class(this.ani[1]);
    setTimeout(() => {
      $m(this.data.class).delete();
    }, 500);
    clearInterval(this.timer);
  }
}
