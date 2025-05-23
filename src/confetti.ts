import confetti from "canvas-confetti";

export function makeItRain() {
  var end = Date.now() + 1 * 1000;

  var colors = ["#328e6e", "#d0b046"];

  function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 70,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 70,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }
  frame();
}
