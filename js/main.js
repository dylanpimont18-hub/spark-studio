/* Spark Pro — interactions de la page
   1. animation d'arrivée (démarre quand la police est prête) et montage de la
      maquette en boucle (tourne quand elle est visible, bouton pause)
   2. menu mobile
   3. section courante dans la navigation
   4. formulaire : validation inline puis envoi via Web3Forms (reçu sur contact@sparklearning.fr) */
(function () {
  'use strict';

  var html = document.documentElement;
  html.classList.add('js');

  /* ---------- 1. Animation d'arrivée ---------- */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var desktop = window.matchMedia('(min-width: 56.01rem)');
  var started = false;
  var playedAt = 0;
  function play() {
    if (started) { return; }
    started = true;
    playedAt = Date.now();
    window.requestAnimationFrame(function () { html.classList.add('play'); });
    scheduleBuild();
  }

  /* Maquette : le site se monte brique par brique, reste affiché, se démonte,
     puis recommence. La boucle ne tourne que si un tiers de la maquette est à
     l'écran, l'onglet visible et la pause non demandée ; le premier montage
     attend la fin du titre (900 ms après le départ). En mouvement réduit, pas
     de boucle : la maquette finie reste affichée. */
  var build = document.querySelector('.hero-build');
  var buildToggle = build && build.querySelector('.build-toggle');
  var PHASES = [['is-building', 7200], ['is-clearing', 1200], ['', 800]];
  var buildReady = false;
  var onScreen = false;
  var paused = false;
  var running = false;
  var buildTimer = null;

  function setPhase(name) {
    build.classList.remove('is-building', 'is-clearing');
    if (name) { build.classList.add(name); }
  }
  function canRun() {
    return buildReady && onScreen && !paused && !document.hidden;
  }
  function runPhase(index) {
    if (index === 0 && !canRun()) { running = false; return; }
    running = true;
    setPhase(PHASES[index][0]);
    buildTimer = window.setTimeout(function () {
      runPhase((index + 1) % PHASES.length);
    }, PHASES[index][1]);
  }
  function startLoop() {
    if (!running && canRun()) { runPhase(0); }
  }
  function scheduleBuild() {
    if (!build || reduced) { return; }
    window.setTimeout(function () {
      buildReady = true;
      startLoop();
    }, Math.max(0, 900 - (Date.now() - playedAt)));
  }
  function setPaused(value) {
    paused = value;
    window.clearTimeout(buildTimer);
    running = false;
    setPhase('');
    build.classList.toggle('is-paused', paused);
    buildToggle.setAttribute('aria-label', paused ? 'Relancer l’animation' : 'Mettre l’animation en pause');
    startLoop();
  }

  if (build && !reduced && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      onScreen = entries[entries.length - 1].intersectionRatio >= 0.29;
      startLoop();
    }, { threshold: [0, 0.3] }).observe(build);
    document.addEventListener('visibilitychange', startLoop);
    if (buildToggle) {
      buildToggle.hidden = false;
      buildToggle.addEventListener('click', function () { setPaused(!paused); });
    }
  } else if (build && !reduced) {
    build.classList.add('is-paused'); /* navigateur ancien : maquette finie, sans boucle */
  }
  if (reduced) {
    play();
  } else {
    if (document.fonts && document.fonts.load) {
      Promise.all([
        document.fonts.load('800 1em "Bricolage Grotesque"'),
        document.fonts.load('300 1em "Bricolage Grotesque"')
      ]).then(play, play);
    }
    window.setTimeout(play, 700);
  }

  /* ---------- 2. Menu mobile ---------- */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  function setOpen(open) {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }
  toggle.addEventListener('click', function () {
    setOpen(!header.classList.contains('is-open'));
  });
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) { setOpen(false); }
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && header.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
  if (desktop.addEventListener) {
    desktop.addEventListener('change', function (event) {
      if (event.matches) { setOpen(false); }
    });
  }

  /* ---------- 3. Section courante ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var sections = links
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var visible = [];
    function setCurrent(id) {
      links.forEach(function (link) {
        if (id && link.getAttribute('href') === '#' + id) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var index = visible.indexOf(entry.target);
        if (entry.isIntersecting && index === -1) { visible.push(entry.target); }
        if (!entry.isIntersecting && index !== -1) { visible.splice(index, 1); }
      });
      var current = sections.filter(function (section) { return visible.indexOf(section) !== -1; })[0];
      setCurrent(current ? current.id : null);
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ---------- 4. Formulaire ---------- */
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var messages = {
    nom: 'Indiquez votre nom.',
    metier: 'Indiquez votre métier.',
    ville: 'Indiquez votre ville.',
    email: 'Indiquez une adresse email valide, par exemple nom@exemple.fr.',
    message: 'Décrivez votre projet en quelques mots.'
  };
  var inputs = Array.prototype.slice.call(form.querySelectorAll('.field input, .field textarea'));
  var submitBtn = form.querySelector('button[type="submit"]');
  var submitLabel = submitBtn.textContent;
  var fallbackEmail = 'contact@sparklearning.fr';

  function setStatus(text, isError) {
    status.textContent = text;
    status.classList.toggle('is-error', Boolean(isError));
  }

  function fieldOf(input) { return input.closest('.field'); }

  function showError(input, text) {
    var field = fieldOf(input);
    field.classList.toggle('is-invalid', Boolean(text));
    field.querySelector('.field-error').textContent = text || '';
    if (text) {
      input.setAttribute('aria-invalid', 'true');
    } else {
      input.removeAttribute('aria-invalid');
    }
  }

  function validate(input) {
    var key = input.id.replace('f-', '');
    var value = input.value.trim();
    var text = '';
    if (!value) {
      text = messages[key];
    } else if (input.type === 'email' && !emailPattern.test(value)) {
      text = messages.email;
    }
    showError(input, text);
    return !text;
  }

  inputs.forEach(function (input) {
    input.addEventListener('blur', function () {
      if (input.value.trim() || fieldOf(input).classList.contains('is-invalid')) { validate(input); }
    });
    input.addEventListener('input', function () {
      if (fieldOf(input).classList.contains('is-invalid')) { validate(input); }
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (submitBtn.disabled) { return; }
    setStatus('');

    var results = inputs.map(validate);
    var firstInvalid = inputs[results.indexOf(false)];
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    var value = function (id) { return document.getElementById(id).value.trim(); };
    var data = new FormData(form);
    data.set('subject', 'Demande de devis : ' + value('f-metier') + ' à ' + value('f-ville'));
    data.set('replyto', value('f-email'));

    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours…';

    fetch(form.action, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: data
    })
      .then(function (response) {
        return response.json().then(function (json) {
          if (!response.ok || !json.success) { throw new Error(json.message || 'Erreur'); }
        });
      })
      .then(function () {
        form.reset();
        setStatus('Merci, votre demande est bien envoyée. Vous recevrez une réponse sous 48 h à l’adresse indiquée.');
      })
      .catch(function () {
        setStatus('L’envoi n’a pas abouti. Réessayez dans un instant, ou écrivez directement à ' + fallbackEmail + '.', true);
      })
      .then(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = submitLabel;
        status.focus();
      });
  });
})();
