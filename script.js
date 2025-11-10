function testFunc() {
  alert("here");
}
class SeeThrough {
  constructor(container, cover, inner) {
    this.container = container;
    this.cover = cover;
    this.inner = inner;
    this.init();
  }
  init() {
    let elems = Array.from(this.inner.children);
    const bounds = this.cover.getBoundingClientRect();
    const { otR, otL, obR, obL } = {
      otR: [Math.round(bounds.x + bounds.width), Math.round(bounds.y)],
      otL: [Math.round(bounds.x), Math.round(bounds.y)],
      obR: [
        Math.round(bounds.x + bounds.width),
        Math.round(bounds.y + bounds.height),
      ],
      obL: [Math.round(bounds.x), Math.round(bounds.y + bounds.height)],
    };
    const elemMap = [];
    elems.filter((e) => {
      const coords = e.getBoundingClientRect();
      const { tR, tL, bR, bL } = {
        tR: [Math.round(coords.x + coords.width), Math.round(coords.y)],
        tL: [Math.round(coords.x), Math.round(coords.y)],
        bR: [
          Math.round(coords.x + coords.width),
          Math.round(coords.y + coords.height),
        ],
        bL: [Math.round(coords.x), Math.round(coords.y + coords.height)],
      };
      if (tL[0] >= otL[0] && tL[1] >= otL[1]) {
        if (tR[0] <= otR[0] && tR[1] >= otR[1]) {
          if (bL[0] >= obL[0] && bL[1] <= obL[1]) {
            if (bR[0] <= bR[0] && bR[1] <= obR[1]) {
              e.coords = {
                tR,
                tL,
                bR,
                bL,
              };
              elemMap.push(e);
              return true;
            } else return false;
          }
        }
      }
    });
    console.log(elemMap);
  }
}
$(document).ready(() => {
  const seeThroughDiv = new SeeThrough(
    document.getElementById("container"),
    document.getElementById("clickThrough"),
    document.getElementById("clickOn")
  );
});
