function handlePrint() {
  var isMobile = window.matchMedia('(max-width: 760px), (pointer: coarse)').matches;

  if (isMobile) {
    alert('En móvil, si no aparece el cuadro de impresión, use el menú del navegador: Compartir / Imprimir / Guardar como PDF.');
  }

  setTimeout(function () {
    try {
      window.print();
    } catch (e) {}
  }, 80);
}
