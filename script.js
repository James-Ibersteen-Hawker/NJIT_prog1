$(document).ready(async () => {
  let list = await fetch("tanks.json");
  list = await list.json();
  let control = {
    index: 0,
    img: null,
    name: null,
    desc: null,
    render() {
      const iP = (this.index - 1 + list.length) % list.length;
      const i = this.index;
      const iA = (this.index + 1) % list.length;
      const e1 = list[iA].name.split(" ").join("-").split("/").join("-");
      const e2 = list[i].name.split(" ").join("-").split("/").join("-");
      const e3 = list[iP].name.split(" ").join("-").split("/").join("-");
      list.forEach(({ name }) => {
        $(`#${name.split(" ").join("-").split("/").join("-")}`).addClass(
          "none"
        );
      });
      $(`#${e1}`).addClass("backL");
      $(`#${e1}`).removeClass("none");
      $(`#${e2}`).addClass("current");
      $(`#${e2}`).removeClass("none");
      $(`#${e3}`).addClass("backR");
      $(`#${e3}`).removeClass("none");
      console.log(e1, e2, e3);
    },
  };
  control = new Proxy(control, {
    set(t, p, v, r) {
      const reflect = Reflect.set(t, p, v, r);
      if (p === "index") {
        control.img = list[control.index].filepath;
        control.name = list[control.index].name;
        control.desc = list[control.index].blurb;
        control.render();
      }
      return reflect;
    },
  });
  const carousel = new Carousel(list, document.querySelector(".img"), 3);
  carousel.init();
  control.render();
});

class Carousel {
  constructor(imgs, container, visCount) {
    this.imgs = imgs;
    this.container = container;
    this.visCount = visCount;
  }
  init() {
    this.imgs.forEach(({ filepath, name }) => {
      const img = `<img src="${filepath}" alt="${name}" id="${name
        .split(" ")
        .join("-")
        .split("/")
        .join("-")}"/>`;
      this.container.insertAdjacentHTML("beforeend", img);
    });
  }
}
