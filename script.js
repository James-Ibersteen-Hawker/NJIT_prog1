$(document).ready(async () => {
  let list = await fetch("tanks.json");
  list = await list.json();
  let dir = "next";
  const time = 8000;
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
      $(".moreBtn").removeClass("rot90");
      $(".more").addClass("gone");
      this.i = (this.i + 1) % list.length;
      this.render();
      dir = "next";
      $(".img").attr("style", "pointer-events:none;");
      clearInterval(interval);
      setTimeout(() => {
        $(".img").attr("style", "pointer-events:auto;");
      }, 900);
      setTimeout(() => (interval = setInterval(intervalFunc, time)), 2000);
    },
    prev() {
      $(".moreBtn").removeClass("rot90");
      $(".more").addClass("gone");
      this.i = (this.i - 1 + list.length) % list.length;
      this.render();
      dir = "prev";
      $(".img").attr("style", "pointer-events:none;");
      clearInterval(interval);
      setTimeout(() => {
        $(".img").attr("style", "pointer-events:auto;");
      }, 900);
      setTimeout(() => (interval = setInterval(intervalFunc, time)), time);
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
      e1.attr("class", "backL"), e2.attr("class", "current");
      e3.attr("class", "backR");
      const { name, blurb } = list[this.i];
      $(".name").text(name), $(".blurb").text(blurb);
    },
  };
  $(".rArrow").on("click", () => carousel.next());
  $(".lArrow").on("click", () => carousel.prev());
  $(".img").on("click", ".backR", () => carousel.next());
  $(".img").on("click", ".backL", () => carousel.prev());
  const intervalFunc = async () => {
    $(".moreBtn").removeClass("rot90");
    $(".more").addClass("gone");
    dir === "next" ? carousel.next() : carousel.prev();
  };
  let interval = setInterval(intervalFunc, time);
  carousel.init();
  $(document).on("keydown", (event) => {
    if (event.key === "Escape") clearInterval(interval);
    else if (event.key === " ") interval = setInterval(intervalFunc, time);
  });
  $(".more").addClass("gone");
  $(".moreBtn").on("click", () => {
    $(".moreBtn").toggleClass("rot90");
    $(".more").toggleClass("gone");
  });
});
