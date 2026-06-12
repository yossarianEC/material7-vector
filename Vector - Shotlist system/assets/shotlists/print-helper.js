(function () {
  var lastPrintAt = 0;

  function triggerPrint(event) {
    var now = Date.now();

    if (event && typeof event.preventDefault === "function") {
      event.preventDefault();
    }

    if (now - lastPrintAt < 900) {
      return;
    }

    lastPrintAt = now;

    if (typeof window.print === "function") {
      window.print();
    }
  }

  function bindPrintButtons() {
    var buttons = document.querySelectorAll("[data-print-button]");

    for (var i = 0; i < buttons.length; i += 1) {
      buttons[i].addEventListener("click", triggerPrint);
      buttons[i].addEventListener("touchend", triggerPrint, { passive: false });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindPrintButtons);
  } else {
    bindPrintButtons();
  }
}());