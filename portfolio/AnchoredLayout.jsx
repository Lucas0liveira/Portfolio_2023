import React from 'react';
import PORTFOLIO from './data.js';

/* ---- shared sub-renderers ---- */

function WorkBlocks() {
  const P = PORTFOLIO;
  return (
    <div>
      {P.work.items.map((w, i) => (
        <div className="work-item" key={i}>
          <div className="wi-top">
            <span className="wi-role">{w.role} <span className="wi-org">· {w.org}</span></span>
            <span className="wi-period">{w.period}</span>
          </div>
          <div className="wi-place">{w.place}</div>
          <ul className="wi-points">
            {w.points.map((pt, j) => <li key={j}>{pt}</li>)}
          </ul>
          <div className="wi-tech">
            {w.tech.map((t, j) => <span className="mini-tag" key={j}>{t}</span>)}
          </div>
        </div>
      ))}
      <div className="work-item">
        <div className="wi-top">
          <span className="wi-role">{P.work.education.degree}</span>
          <span className="wi-period">{P.work.education.year}</span>
        </div>
        <div className="wi-place">{P.work.education.school}</div>
      </div>
    </div>
  );
}

function ContactLinks() {
  return (
    <div className="link-list">
      {PORTFOLIO.contact.links.map((l, i) => (
        <a className="link-row" href={l.url} target="_blank" rel="noopener noreferrer" key={i}>
          <span>
            <span className="lr-label">{l.label}</span>
            <div className="lr-handle">{l.handle}</div>
          </span>
          <span className="lr-arrow" aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}

/* ---- main layout component ---- */

export default function AnchoredLayout({ active, go }) {
  const P = PORTFOLIO;
  const sec = P.sections[active];

  return (
    <div className="anchored-field anchored-scroll">
{/* 01 · Hello */}
      {sec.id === 'hello' && (
        <div className="anchor-card glass wide enter show" style={{ left: '5vw', bottom: '11vh' }}>
          <span className="eyebrow">{P.hello.greeting}</span>
          <h2 className="display" style={{ fontSize: 'clamp(34px,5vw,68px)', margin: '12px 0 16px' }}>
            {P.hello.headline.map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>)}
          </h2>
          <p className="lede" style={{ maxWidth: 460, marginBottom: 20 }}>{P.hello.sub}</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <button className="btn" onClick={() => go(2)}>See projects <span aria-hidden="true">↓</span></button>
            <div className="chip-row">
              {P.hello.quickTags.map((t, i) => <span className="tag" key={i}>{t}</span>)}
            </div>
          </div>
        </div>
      )}

      {/* 02 · About */}
      {sec.id === 'about' && (<>
        <div className="anchor-card glass wide enter show" style={{ left: '5vw', top: '15vh' }}>
          <span className="eyebrow"><span className="num">02</span> {P.about.eyebrow}</span>
          <h2 className="display" style={{ fontSize: 'clamp(24px,2.6vw,38px)', margin: '12px 0 14px' }}>
            {P.about.title}
          </h2>
          <p className="lede" style={{ maxWidth: 440 }}>{P.about.body[0]}</p>
          <div className="stat-row" style={{ marginTop: 18 }}>
            {P.about.stats.map((s, i) => (
              <div className="stat" key={i}>
                <div className="k">{s.k}</div>
                <div className="v">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="anchor-card glass enter show" style={{ left: '5vw', bottom: '10vh' }}>
          <span className="eyebrow" style={{ marginBottom: 10, display: 'block' }}>Core stack</span>
          <div className="chip-row" style={{ maxWidth: 360 }}>
            {P.about.stack.map((s, i) => <span className="mini-tag" key={i}>{s}</span>)}
          </div>
        </div>
      </>)}

      {/* 03 · Projects */}
      {sec.id === 'projects' && (<>
        <div className="anchor-card glass enter show" style={{ left: '5vw', top: '13vh' }}>
          <span className="eyebrow"><span className="num">03</span> {P.projects.eyebrow}</span>
          <h2 className="display" style={{ fontSize: 'clamp(22px,2.4vw,34px)', marginTop: 8 }}>
            {P.projects.title}
          </h2>
        </div>
        {P.projects.items.map((p, i) => {
          const pos = [
            { left: '5vw',  top: '40vh' },
            { left: '24vw', top: '30vh' },
            { left: '5vw',  top: '66vh' },
            { left: '24vw', top: '56vh' },
          ][i];
          return (
            <a
              className="proj-mini glass enter show"
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              style={pos}
            >
              <div className="pm-bar" style={{ background: p.tint }} />
              <h4>{p.name}</h4>
              <p>{p.blurb}</p>
              <div className="pm-foot">
                {p.tags.map((t, j) => <span className="mini-tag" key={j}>{t}</span>)}
                <span className="pm-arrow" aria-hidden="true">↗</span>
              </div>
            </a>
          );
        })}
      </>)}

      {/* 04 · Experience */}
      {sec.id === 'work' && (
        <div
          className="anchor-card glass wide enter show"
          style={{
            left: '5vw', top: '13vh', bottom: '13vh',
            maxHeight: '74vh', overflowY: 'auto',
            maxWidth: 'min(46vw,520px)',
          }}
        >
          <span className="eyebrow"><span className="num">04</span> {PORTFOLIO.work.eyebrow}</span>
          <h2 className="display" style={{ fontSize: 'clamp(22px,2.4vw,32px)', margin: '8px 0 6px' }}>
            {PORTFOLIO.work.title}
          </h2>
          <WorkBlocks />
        </div>
      )}

      {/* 05 · Contact */}
      {sec.id === 'contact' && (
        <div className="anchor-card glass wide enter show" style={{ right: '5vw', bottom: '12vh' }}>
          <span className="eyebrow"><span className="num">05</span> {PORTFOLIO.contact.eyebrow}</span>
          <h2 className="display" style={{ fontSize: 'clamp(30px,3.4vw,48px)', margin: '12px 0 14px' }}>
            {PORTFOLIO.contact.title}
          </h2>
          <p className="lede" style={{ maxWidth: 380, marginBottom: 18 }}>{PORTFOLIO.contact.sub}</p>
          <a className="btn" href={`mailto:${PORTFOLIO.contact.email}`} style={{ marginBottom: 18 }}>
            {PORTFOLIO.contact.email} <span aria-hidden="true">→</span>
          </a>
          <ContactLinks />
        </div>
      )}
    </div>
  );
}
