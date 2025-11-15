$(document).ready(async () => {
  let list = await fetch("tanks.json");
  list = await list.json();
  const toID = (str) => str.replace(/[\s/]+/g, "-");
  const wait = (t) => new Promise((resolve) => setTimeout(() => resolve(), t));
  const carousel = {
    container: $(".img"),
    i: 0,
    init() {
      list.forEach(({ filepath, name }) => {
        const img = `<img src="${filepath}" alt="${name}" id="${toID(name)}"/>`;
        this.container.append(img);
      });
      this.render();
    },
    next() {
      this.i = (this.i + 1) % list.length;
      this.render();
    },
    prev() {
      this.i = (this.i - 1 + list.length) % list.length;
      this.render();
    },
    async render() {
      const iP = (this.i - 1 + list.length) % list.length;
      const iA = (this.i + 1) % list.length;
      const [e1, e2, e3] = [list[iP], list[this.i], list[iA]].map(({ name }) =>
        $(`#${toID(name)}`)
      );
      list.forEach(({ name }) => $(`#${toID(name)}`).attr("class", "none"));
      [e1, e2, e3].forEach((e) => e.removeClass("none"));
      e1.addClass("moveIn"), e2.addClass("toCurrent"), e3.addClass("toRight"); //animations
      await wait(1000);
      e1.attr("class", "backL"), e2.attr("class", "current");
      e3.attr("class", "backR");
      const { name, blurb } = list[this.i];
      $(".name").text(name), $(".blurb").text(blurb);
    },
  };
  carousel.init();
  //add buttons later
  $(document).on("click", () => {
    carousel.next();
  });
});
