(function () {
  function triggerPrint(event) {
    event.preventDefault();

    if (typeof window.print === "function") {
      window.print();
    }
  }

  function bindPrintButtons() {
    var buttons = document.querySelectorAll("[data-print-button]");

    for (var i = 0; i < buttons.length; i += 1) {
      buttons[i].addEventListener("click", triggerPrint);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindPrintButtons);
  } else {
    bindPrintButtons();
  }
}());