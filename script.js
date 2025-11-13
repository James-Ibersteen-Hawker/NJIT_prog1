$(document).ready(async () => {
  let list = await fetch("tanks.json");
  list = await list.json();
  let control = {
    index: 0,
    img: null,
    name: null,
    desc: null,
    render() {
      console.log(this.img, this.name, this.desc);
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
  console.log(carousel);
});

class Carousel {
  constructor(imgs, container, visCount) {
    this.imgs = imgs;
    this.container = container;
    this.visCount = visCount;
  }
  init() {
    this.imgs.forEach(({ filepath, name }) => {
      const img = `<img src="${filepath}" alt="${name}"/>`;
      this.container.insertAdjacentHTML("beforeend", img);
    });
  }
}
