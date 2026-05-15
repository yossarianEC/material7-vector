(function () {
  var source = document.getElementById('sourceData');
  var status = document.getElementById('status');

  if (!source || !status) {
    return;
  }

  function setStatus(message, isError) {
    status.textContent = message;
    status.style.borderColor = isError ? '#f0b4a5' : '#d8dee8';
    status.style.background = isError ? '#fff4f0' : '#f8fafc';
  }

  function escapeHTML(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function item(list, index, key, fallback) {
    var value = Array.isArray(list) && list[index] ? list[index][key] : '';
    return value || fallback || '';
  }

  function slugify(value) {
    return String(value || 'material7')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 72);
  }

  function parseData() {
    try {
      return JSON.parse(source.value);
    } catch (error) {
      throw new Error('JSON is not valid: ' + error.message);
    }
  }

  function buildMap(data) {
    var doSay = data.doSay || [];
    var dontSay = data.dontSay || [];
    var broll = data.broll || {};
    var quote = data.quote || {};
    var tips = data.tips || {};
    var summary = data.summary || {};
    var shoot = data.shoot || {};
    var client = data.client || {};

    return {
      CLIENTE: client.name || 'Cliente',
      FECHA: shoot.date || 'Fecha por definir',
      LOCACION: shoot.location || 'Locación por definir',
      HORA_INICIO: shoot.startTime || 'Hora por definir',
      RESUMEN_CORTO: summary.internal || summary.client || 'Resumen por definir.',
      RESUMEN_CLIENTE: summary.client || summary.internal || 'Resumen por definir.',
      PRIORIDAD_VISUAL: data.visualPriority || 'Prioridad visual por definir.',

      SI_DECIR_01: doSay[0] || 'Dato confirmado por el cliente.',
      SI_DECIR_02: doSay[1] || 'Beneficio permitido.',
      SI_DECIR_03: doSay[2] || 'Detalle seguro.',
      SI_DECIR_04: doSay[3] || 'Consulte por modelos específicos y disponibilidad actual.',
      NO_DECIR_01: dontSay[0] || 'Gratis.',
      NO_DECIR_02: dontSay[1] || 'El más barato.',
      NO_DECIR_03: dontSay[2] || 'Mejor del mercado.',
      NO_DECIR_04: dontSay[3] || 'Promociones no confirmadas.',

      INTRO_01_TITULO: item(data.intros, 0, 'title', 'Intro'),
      INTRO_01: item(data.intros, 0, 'line', 'Línea por definir.'),
      INTRO_02_TITULO: item(data.intros, 1, 'title', 'Intro'),
      INTRO_02: item(data.intros, 1, 'line', 'Línea por definir.'),
      INTRO_03_TITULO: item(data.intros, 2, 'title', 'Intro'),
      INTRO_03: item(data.intros, 2, 'line', 'Línea por definir.'),
      INTRO_04_TITULO: item(data.intros, 3, 'title', 'Intro'),
      INTRO_04: item(data.intros, 3, 'line', 'Línea por definir.'),

      BENEFICIO_01_TITULO: item(data.benefits, 0, 'title', 'Beneficio'),
      BENEFICIO_01: item(data.benefits, 0, 'line', 'Línea por definir.'),
      BENEFICIO_02_TITULO: item(data.benefits, 1, 'title', 'Beneficio'),
      BENEFICIO_02: item(data.benefits, 1, 'line', 'Línea por definir.'),
      BENEFICIO_03_TITULO: item(data.benefits, 2, 'title', 'Beneficio'),
      BENEFICIO_03: item(data.benefits, 2, 'line', 'Línea por definir.'),
      BENEFICIO_04_TITULO: item(data.benefits, 3, 'title', 'Beneficio'),
      BENEFICIO_04: item(data.benefits, 3, 'line', 'Línea por definir.'),

      CTA_01_TITULO: item(data.ctas, 0, 'title', 'CTA'),
      CTA_01: item(data.ctas, 0, 'line', 'Línea por definir.'),
      CTA_02_TITULO: item(data.ctas, 1, 'title', 'CTA'),
      CTA_02: item(data.ctas, 1, 'line', 'Línea por definir.'),
      CTA_03_TITULO: item(data.ctas, 2, 'title', 'CTA'),
      CTA_03: item(data.ctas, 2, 'line', 'Línea por definir.'),
      CTA_04_TITULO: item(data.ctas, 3, 'title', 'CTA'),
      CTA_04: item(data.ctas, 3, 'line', 'Línea por definir.'),

      BROLL_PRODUCTO: broll.product || 'Producto principal en plano limpio.',
      BROLL_USO_PROCESO: broll.process || 'Uso, proceso o demostración.',
      BROLL_DETALLE: broll.detail || 'Detalles de producto, textura, manos o marca.',
      BROLL_CONTEXTO: broll.context || 'Contexto real de tienda, servicio o ambiente.',
      BROLL_CIERRE: broll.closing || 'Plano de cierre.',

      QUOTE_TEXT: quote.text || "Cinema is a matter of what's in the frame and what's out.",
      QUOTE_SOURCE: quote.source || 'Martin Scorsese',
      TIP_INTROS: tips.intros || 'Hable un poco más lento de lo normal. La cámara premia claridad, no velocidad.',
      TIP_BENEFICIOS: tips.benefits || 'Diga la frase completa, aunque parezca simple.',
      TIP_CTAS: tips.ctas || 'Mire a cámara al iniciar y al cerrar la frase.'
    };
  }

  async function fetchTemplate(type) {
    var response = await fetch('/shotlist-system/templates/' + type + '.html', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Could not load ' + type + ' template.');
    }
    return response.text();
  }

  function render(template, data) {
    var replacements = buildMap(data);
    return template.replace(/\{\{([A-Z0-9_]+)\}\}/g, function (match, key) {
      return escapeHTML(replacements[key] || '');
    });
  }

  function filenameFor(type, data) {
    var client = data.client || {};
    var shoot = data.shoot || {};
    var parts = [client.name, client.project].filter(Boolean).join(' ');
    var slug = slugify(parts || client.name || 'client-project');
    var date = shoot.date || 'mm-dd-yyyy';
    return slug + '-' + (type === 'blue' ? 'shotlist' : 'client-guide') + '-' + date + '.html';
  }

  async function build(type) {
    var data = parseData();
    var template = await fetchTemplate(type);
    return {
      html: render(template, data),
      filename: filenameFor(type, data)
    };
  }

  function openPreview(result) {
    var blob = new Blob([result.html], { type: 'text/html' });
    var url = URL.createObjectURL(blob);
    window.open(url, '_blank', 'noopener,noreferrer');
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 30000);
  }

  function download(result) {
    var blob = new Blob([result.html], { type: 'text/html' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = result.filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 30000);
  }

  async function loadExample() {
    var response = await fetch('/shotlist-system/data/example-shotlist.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Could not load example data.');
    }
    source.value = JSON.stringify(await response.json(), null, 2);
    setStatus('Example campaign loaded.');
  }

  function attach(id, handler) {
    var el = document.getElementById(id);
    if (!el) {
      return;
    }
    el.addEventListener('click', async function () {
      try {
        await handler();
      } catch (error) {
        setStatus(error.message, true);
      }
    });
  }

  attach('loadExample', loadExample);
  attach('previewBlue', async function () {
    var result = await build('blue');
    openPreview(result);
    setStatus('Blue shotlist preview opened: ' + result.filename);
  });
  attach('downloadBlue', async function () {
    var result = await build('blue');
    download(result);
    setStatus('Blue shotlist downloaded: ' + result.filename);
  });
  attach('previewGreen', async function () {
    var result = await build('green');
    openPreview(result);
    setStatus('Green guide preview opened: ' + result.filename);
  });
  attach('downloadGreen', async function () {
    var result = await build('green');
    download(result);
    setStatus('Green guide downloaded: ' + result.filename);
  });

  loadExample().catch(function (error) {
    setStatus(error.message, true);
  });
}());
