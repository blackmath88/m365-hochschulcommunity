import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './slides.css';

const MANIFEST = '/decks/open-source-quickguide/deck.json';
const readPosition = (count) => Math.max(0, Math.min(count - 1, (Number(location.hash.match(/^#slide-(\d+)$/)?.[1]) || 1) - 1));

// Only repository-owned static fragments are loaded; no editing or remote content API.
async function loadDeck() {
  const response = await fetch(MANIFEST);
  if (!response.ok) throw new Error('Das Inhaltsverzeichnis konnte nicht geladen werden.');
  const deck = await response.json();
  if (!Array.isArray(deck.slides) || !deck.slides.length) throw new Error('Die Präsentation enthält keine Slides.');
  const slides = await Promise.all(deck.slides.map(async slide => {
    if (!slide.src.startsWith('/decks/open-source-quickguide/slides/') || slide.src.includes('..')) throw new Error('Ungültiger Slide-Pfad.');
    const response = await fetch(slide.src);
    if (!response.ok) throw new Error(`Slide konnte nicht geladen werden: ${slide.title}`);
    const html = await response.text();
    const fragment = new DOMParser().parseFromString(html, 'text/html');
    if (fragment.querySelector('script, iframe, object, embed, style, link') || [...fragment.querySelectorAll('*')].some(el => [...el.attributes].some(a => /^on/i.test(a.name) || /^javascript:/i.test(a.value.trim())))) throw new Error('Slide enthält nicht unterstützten aktiven Inhalt.');
    if (!fragment.querySelector('.ol-slide-root')) throw new Error('Slide-Layout fehlt.');
    return { ...slide, html };
  }));
  return { ...deck, slides };
}

function Slide({ slide, number, count }) {
  return <article className="ol-slide" aria-label={`Slide ${number}: ${slide.title}`}>
    <header className="ol-brand"><img src="/brand/v2/mark.svg" alt="" /><span><strong>M365</strong><span>Hochschulcommunity</span></span><small>Open Source Quickguide</small></header>
    <div className="ol-content" dangerouslySetInnerHTML={{ __html: slide.html }} />
    <footer className="ol-footer"><span>Arbeitsgrundlage · keine Modellentscheidung</span><a href="/resources/open-source-quickguide/#sources">Quellen im Guide</a><span>{String(number).padStart(2, '0')} / {count}</span></footer>
  </article>;
}

function Frame({ children, thumbnail = false }) {
  const ref = useRef(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const observer = new ResizeObserver(([{ contentRect: r }]) => setScale(Math.min(r.width / 1280, r.height / 720)));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={thumbnail ? 'deck-thumbnail' : 'deck-stage'}><div className="deck-canvas" style={{ transform: `scale(${scale})` }}>{children}</div></div>;
}

function Deck({ deck }) {
  const [index, setIndex] = useState(() => readPosition(deck.slides.length));
  const [mode, setMode] = useState(() => new URLSearchParams(location.search).has('print') ? 'print' : 'present');
  const [notice, setNotice] = useState('');
  const stageRef = useRef(null);
  const count = deck.slides.length;
  const goto = (value) => setIndex(Math.max(0, Math.min(count - 1, value)));
  const fullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else setNotice('Vollbild ist in diesem Browser nicht verfügbar.');
    } catch { setNotice('Vollbild konnte nicht gestartet werden.'); }
  };
  useEffect(() => {
    const url = new URL(location.href);
    url.hash = `slide-${index + 1}`;
    mode === 'print' ? url.searchParams.set('print', '1') : url.searchParams.delete('print');
    history.replaceState(null, '', url);
  }, [index, mode]);
  useEffect(() => {
    const update = () => goto(readPosition(count));
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, [count]);
  useEffect(() => {
    const key = e => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.target.closest('input, textarea, select, [contenteditable="true"]')) return;
      const k = e.key.toLowerCase();
      if (k === 'escape') { setMode('present'); if (document.fullscreenElement) document.exitFullscreen(); }
      else if (k === 'o') setMode(m => m === 'overview' ? 'present' : 'overview');
      else if (k === 'p') setMode('print');
      else if (k === 'f') fullscreen();
      else if (mode === 'present') {
        if (k === ' ' && e.target.closest('button, a, summary')) return;
        if (k === 'arrowright' || k === ' ' || k === 'pagedown') goto(index + 1);
        else if (k === 'arrowleft' || k === 'pageup') goto(index - 1);
        else if (k === 'home') goto(0);
        else if (k === 'end') goto(count - 1);
        else return;
      } else return;
      e.preventDefault();
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [index, mode, count]);
  useEffect(() => {
    if (mode === 'overview') document.querySelector('[data-current="true"]')?.focus();
    else stageRef.current?.focus({ preventScroll: true });
  }, [mode]);

  return <div className={`deck-app deck-app--${mode}`}>
    <nav className="deck-toolbar" aria-label="Präsentation">
      <a href="/resources/">← Resources</a><a href="/resources/open-source-quickguide/">Guide lesen</a>
      <span className="deck-counter" aria-live="polite">Slide {String(index + 1).padStart(2, '0')} / {count}</span>
      <button onClick={() => setMode(mode === 'overview' ? 'present' : 'overview')} aria-pressed={mode === 'overview'}>Übersicht (O)</button>
      <button onClick={() => setMode(mode === 'print' ? 'present' : 'print')}>{mode === 'print' ? 'Präsentieren (Esc)' : 'Print / PDF (P)'}</button>
      {mode === 'print' ? <button onClick={() => window.print()}>Drucken / PDF speichern</button> : <button onClick={fullscreen}>Vollbild (F)</button>}
    </nav>
    {notice && <p className="deck-notice" role="status">{notice}</p>}
    {mode === 'overview' ? <main className="deck-overview"><h1>Übersicht</h1><p>Slide auswählen · O oder Esc zurück</p><div className="deck-overview-grid">
      {deck.slides.map((slide, i) => <button key={slide.id} data-current={i === index} aria-current={i === index ? 'true' : undefined} onClick={() => { goto(i); setMode('present'); }}>
        <div aria-hidden="true" inert><Frame thumbnail><Slide slide={slide} number={i + 1} count={count} /></Frame></div><span>{String(i + 1).padStart(2, '0')} · {slide.title}</span>
      </button>)}
    </div></main> : mode === 'present' ? <main ref={stageRef} tabIndex={-1} className="deck-present"><Frame><Slide slide={deck.slides[index]} number={index + 1} count={count} /></Frame></main> : null}
    {/* Mounted after all fragments load: native Cmd/Ctrl+P also prints the entire deck. */}
    <div className="deck-print-sheet">{deck.slides.map((slide, i) => <section className="deck-print-page" key={slide.id}><Slide slide={slide} number={i + 1} count={count} /></section>)}</div>
    {mode === 'present' && <footer className="deck-controls"><button onClick={() => goto(index - 1)} disabled={index === 0}>← Zurück</button><span>← → / Leertaste · Home / End · O Übersicht · P PDF · F Vollbild</span><button onClick={() => goto(index + 1)} disabled={index === count - 1}>Weiter →</button></footer>}
  </div>;
}

const root = createRoot(document.getElementById('deck-root'));
loadDeck().then(deck => root.render(<Deck deck={deck} />)).catch(error => root.render(<main className="deck-error"><h1>Präsentation nicht verfügbar</h1><p role="alert">{error.message}</p><a href="/resources/open-source-quickguide/">Guide lesen</a><button onClick={() => location.reload()}>Erneut laden</button></main>));
