/* ============================================================
   Main app — scroll-driven section/camera engine + chrome + tweaks
   ============================================================ */
const { useState, useEffect, useRef, useCallback } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "font": "grotesque",
  "accent": "#e2774f",
  "balance": 42,
  "showPins": true
}/*EDITMODE-END*/;

const LAYOUTS = [
  { id: 'anchored', label: 'Anchored',    hint: 'floats by objects' },
  { id: 'rail',     label: 'Side rail',   hint: 'scene center-stage' },
  { id: 'sheet',    label: 'Bottom sheet',hint: 'mobile-first' },
];

function App() {
  const P = window.PORTFOLIO;
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = useState(0);
  const [layout, setLayout] = useState(() => localStorage.getItem('pf_layout') || 'anchored');
  const trackRef = useRef(null);

  /* ---- apply tweaks to :root ---- */
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.font = t.font;
    root.style.setProperty('--accent', t.accent);
    const b = Math.max(0, Math.min(1, t.balance / 100));
    root.style.setProperty('--surface', `rgba(250,248,244,${(0.5 + 0.45 * b).toFixed(3)})`);
    root.style.setProperty('--surface-solid', `rgba(250,248,244,${(0.85 + 0.13 * b).toFixed(3)})`);
    root.style.setProperty('--glass-blur', `${(10 + 16 * b).toFixed(1)}px`);
    root.style.setProperty('--scrim', (0.03 + 0.1 * b).toFixed(3));
    root.style.setProperty('--show-pins', t.showPins ? '1' : '0');
  }, [t]);

  useEffect(() => { localStorage.setItem('pf_layout', layout); }, [layout]);

  /* ---- scroll → active section ---- */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const idx = Math.round(el.scrollTop / el.clientHeight);
        setActive((prev) => (prev !== idx ? Math.max(0, Math.min(P.sections.length - 1, idx)) : prev));
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => { el.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const go = useCallback((i) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ top: i * el.clientHeight, behavior: 'smooth' });
  }, []);

  /* keyboard nav */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); go(Math.min(active + 1, P.sections.length - 1)); }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); go(Math.max(active - 1, 0)); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, go]);

  const sec = P.sections[active];
  const LayoutComp = { anchored: window.AnchoredLayout, rail: window.RailLayout, sheet: window.SheetLayout }[layout];

  return (
    <div className="stage">
      <window.Scene anchor={sec.anchor} />

      {/* scroll scrubber — empty spacers provide scroll distance; content rides along as fixed children */}
      <div className="scroll-track" ref={trackRef}>
        {P.sections.map((s) => <div className="scroll-sec" key={s.id} aria-hidden="true" />)}
        <div className="content-layer" data-layout={layout}>
          {LayoutComp && <LayoutComp active={active} go={go} />}
        </div>
      </div>

      {/* chrome */}
      <div className="chrome">
        <div className="brand"><span className="dot" />{P.name}</div>

        <div className="switcher" role="tablist" aria-label="Layout direction">
          {LAYOUTS.map((l) => (
            <button key={l.id} className={'seg' + (layout === l.id ? ' active' : '')} onClick={() => setLayout(l.id)}>
              {layout === l.id && <span className="pill" />}
              <span className="lbl">{l.label}</span>
              <span className="hint">{l.hint}</span>
            </button>
          ))}
        </div>

        <nav className="navdots">
          {P.sections.map((s, i) => (
            <button key={s.id} className={i === active ? 'active' : ''} onClick={() => go(i)} aria-label={s.label}>
              <span className="nd-label">{s.label}</span>
              <span className="nd-tick" />
            </button>
          ))}
        </nav>

        <div className="scrollhint">
          <span>{sec.num} / 0{P.sections.length}</span>
          <span className="bar"><i style={{ width: ((active) / (P.sections.length - 1) * 100) + '%' }} /></span>
          <span>{sec.label}</span>
        </div>
      </div>

      {/* tweaks */}
      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Layout direction" />
        <window.TweakRadio label="Direction" value={layout}
          options={['anchored', 'rail', 'sheet']}
          onChange={(v) => setLayout(v)} />
        <window.TweakSection label="Typeface" />
        <window.TweakRadio label="Family" value={t.font}
          options={['grotesque', 'geometric', 'editorial', 'mono']}
          onChange={(v) => setTweak('font', v)} />
        <window.TweakSection label="Accent & balance" />
        <window.TweakColor label="Accent" value={t.accent}
          options={['#e2774f', '#8a74d8', '#2f9e8f', '#3a3f6b', '#b9503c']}
          onChange={(v) => setTweak('accent', v)} />
        <window.TweakSlider label="Scene ↔ content" value={t.balance} min={0} max={100} unit="%"
          onChange={(v) => setTweak('balance', v)} />
        <window.TweakToggle label="Scene anchor pins" value={t.showPins}
          onChange={(v) => setTweak('showPins', v)} />
      </window.TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
