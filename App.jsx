import React, { useState, useEffect, useRef, useCallback } from 'react';
import PORTFOLIO from './portfolio/data.js';
import AnchoredLayout from './portfolio/AnchoredLayout.jsx';
import Chrome from './portfolio/Chrome.jsx';

export default function App() {
  const P = PORTFOLIO;
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);

  /* scroll position → active section index */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const idx = Math.round(el.scrollTop / el.clientHeight);
        setActive((prev) =>
          prev !== idx ? Math.max(0, Math.min(P.sections.length - 1, idx)) : prev
        );
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* smooth scroll to section i */
  const go = useCallback((i) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ top: i * el.clientHeight, behavior: 'smooth' });
  }, []);

  /* keyboard navigation */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        go(Math.min(active + 1, P.sections.length - 1));
      }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        go(Math.max(active - 1, 0));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, go]);

  /* drive Three.js camera on section change */
  useEffect(() => {
    if (typeof window.portfolioGoto === 'function') {
      window.portfolioGoto(active);
    } else {
      /* Experience may still be loading — wait for the ready event */
      const handler = () => window.portfolioGoto?.(active);
      window.addEventListener('experience-ready', handler, { once: true });
      return () => window.removeEventListener('experience-ready', handler);
    }
  }, [active]);

  return (
    <div className="stage">
      {/* subtle vignette over the 3D scene */}
      <div className="scene-scrim" aria-hidden="true" />

      {/* scroll track: empty spacers provide scroll distance;
          content-layer is fixed inside so wheel events still bubble */}
      <div className="scroll-track" ref={trackRef}>
        {P.sections.map((s) => (
          <div className="scroll-sec" key={s.id} aria-hidden="true" />
        ))}
        <div className="content-layer">
          <AnchoredLayout active={active} go={go} />
        </div>
      </div>

      <Chrome active={active} go={go} />
    </div>
  );
}
