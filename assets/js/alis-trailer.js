/*
 * Homepage trailer carousel for the single .alis-trailer-video element.
 *
 * index.html keeps the first clip as a real src and loops it, so the preview
 * still works without JavaScript. This script takes playback ownership on load:
 * it stops the loop, picks a random starting clip, advances on each "ended",
 * keeps the card link in step with the active clip, and reveals the dot
 * controls. The item list is the only owner of the clips and their links.
 */
(function () {
  var video = document.querySelector(".alis-trailer-video");
  if (!video) {
    return;
  }

  var card = document.querySelector(".alis-trailer-card");
  var link = card ? card.querySelector("a") : null;
  var dotsWrap = card ? card.querySelector(".alis-trailer-dots") : null;
  var dots = dotsWrap
    ? Array.prototype.slice.call(dotsWrap.querySelectorAll(".alis-trailer-dot"))
    : [];

  var items = [
    {
      src: "/assets/media/alis-trailer-loop.mp4",
      href: "https://www.youtube.com/watch?v=eIJHYsPgNnM",
      label: "Watch ALIS 1.0.0 trailer on YouTube"
    },
    {
      src: "/assets/media/alis-worldgen-loop.mp4",
      href: "https://youtu.be/zZOI2uBskSA",
      label: "Watch the ALIS world generation video on YouTube"
    }
  ];

  var current = 0;

  function clipIndex(dot) {
    return parseInt(dot.getAttribute("data-clip"), 10);
  }

  function activate(index, load) {
    current = (index + items.length) % items.length;
    var item = items[current];

    if (load) {
      video.src = item.src;
      video.load();
    }

    var playback = video.play();
    if (playback && typeof playback.catch === "function") {
      playback.catch(function () {});
    }

    if (link) {
      link.setAttribute("href", item.href);
      link.setAttribute("aria-label", item.label);
    }

    dots.forEach(function (dot) {
      var active = clipIndex(dot) === current;
      dot.classList.toggle("is-active", active);
      if (active) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  }

  // The HTML loop keeps the no-JS preview continuous; the carousel needs the
  // "ended" event, which does not fire while loop is on.
  video.loop = false;

  var start = Math.floor(Math.random() * items.length);
  // Index 0 is already the HTML src, so only reload when the roll picks another.
  activate(start, start !== 0);

  video.addEventListener("ended", function () {
    activate(current + 1, true);
  });

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      var index = clipIndex(dot);
      if (index !== current) {
        activate(index, true);
      }
    });
  });

  if (dotsWrap) {
    dotsWrap.hidden = false;
  }
})();
