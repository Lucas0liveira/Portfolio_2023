/* ============================================================
   Layout directions A / B / C
   All three read from window.PORTFOLIO and receive { active, go }.
   active = current section index, go(i) = scroll to section i.
   ============================================================ */

/* ---------- shared content renderers (used by Rail + Sheet) ---------- */
function ProjectBlocks() {
  const P = window.PORTFOLIO;
  return (
    <div>
      {P.projects.items.map((p, i) => (
        <a className="work-item" href={p.url} target="_blank" rel="noopener" key={i} style={{ display: 'block' }}>
          <div className="wi-top">
            <span className="wi-role">{p.name}</span>
            <span className="wi-period">{p.tags.join(' · ')}</span>
          </div>
          <p className="wi-place" style={{ marginTop: 6, lineHeight: 1.5 }}>{p.blurb}</p>
          <span className="eyebrow" style={{ fontSize: 11, marginTop: 10 }}>View on GitHub <span aria-hidden="true">↗</span></span>
        </a>
      ))}
    </div>
  );
}

function WorkBlocks() {
  const P = window.PORTFOLIO;
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
          <div className="wi-tech">{w.tech.map((t, j) => <span className="mini-tag" key={j}>{t}</span>)}</div>
        </div>
      ))}
      <div className="work-item">
        <div className="wi-top"><span className="wi-role">{P.work.education.degree}</span><span className="wi-period">{P.work.education.year}</span></div>
        <div className="wi-place">{P.work.education.school}</div>
      </div>
    </div>
  );
}

function ContactLinks() {
  const P = window.PORTFOLIO;
  return (
    <div className="link-list">
      {P.contact.links.map((l, i) => (
        <a className="link-row" href={l.url} target="_blank" rel="noopener" key={i}>
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

/* a single column of content for one section — Rail + Sheet share this */
function ColumnContent({ secId, go }) {
  const P = window.PORTFOLIO;
  if (secId === 'hello') return (
    <div className="enter show">
      <span className="eyebrow">{P.hello.greeting}</span>
      <h2 className="display" style={{ fontSize: 'clamp(30px,3vw,44px)', margin: '14px 0 16px' }}>
        {P.hello.headline.map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>)}
      </h2>
      <p className="lede" style={{ marginBottom: 22 }}>{P.hello.sub}</p>
      <div className="chip-row" style={{ marginBottom: 24 }}>
        {P.hello.quickTags.map((t, i) => <span className="tag" key={i}>{t}</span>)}
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button className="btn" onClick={() => go(2)}>See projects <span aria-hidden="true">↓</span></button>
        <button className="btn ghost" onClick={() => go(4)}>Get in touch</button>
      </div>
    </div>
  );
  if (secId === 'about') return (
    <div className="enter show">
      <span className="eyebrow"><span className="num">02</span> {P.about.eyebrow}</span>
      <h2 className="display">{P.about.title}</h2>
      {P.about.body.map((b, i) => <p className="lede" key={i} style={{ marginBottom: 14 }}>{b}</p>)}
      <div className="stat-row" style={{ margin: '20px 0 22px' }}>
        {P.about.stats.map((s, i) => <div className="stat" key={i}><div className="k">{s.k}</div><div className="v">{s.v}</div></div>)}
      </div>
      <div className="chip-row">{P.about.stack.map((s, i) => <span className="mini-tag" key={i}>{s}</span>)}</div>
    </div>
  );
  if (secId === 'projects') return (
    <div className="enter show">
      <span className="eyebrow"><span className="num">03</span> {P.projects.eyebrow}</span>
      <h2 className="display">{P.projects.title}</h2>
      <div style={{ marginTop: 8 }}><ProjectBlocks /></div>
    </div>
  );
  if (secId === 'work') return (
    <div className="enter show">
      <span className="eyebrow"><span className="num">04</span> {P.work.eyebrow}</span>
      <h2 className="display">{P.work.title}</h2>
      <div style={{ marginTop: 8 }}><WorkBlocks /></div>
    </div>
  );
  if (secId === 'contact') return (
    <div className="enter show">
      <span className="eyebrow"><span className="num">05</span> {P.contact.eyebrow}</span>
      <h2 className="display">{P.contact.title}</h2>
      <p className="lede" style={{ margin: '12px 0 20px' }}>{P.contact.sub}</p>
      <a className="btn" href={`mailto:${P.contact.email}`} style={{ marginBottom: 22 }}>{P.contact.email} <span aria-hidden="true">→</span></a>
      <ContactLinks />
    </div>
  );
  return null;
}

/* ============================================================
   A · ANCHORED ASYMMETRIC BLOCKS
   ============================================================ */
function AnchoredLayout({ active, go }) {
  const P = window.PORTFOLIO;
  const sec = P.sections[active];
  const pin = window.ANCHOR_POINT[sec.anchor];
  const pinLabels = { room: 'the workspace', shelf: 'books & shelf', monitors: 'the monitors', desk: 'the desk', door: 'the mailbox' };

  return (
    <div className="anchored-field anchored-scroll" key={sec.id}>
      <div className="anchor-pin" style={{ left: pin.x + 'vw', top: pin.y + 'vh' }}>
        <span className="ring" /><span className="pin-label">{pinLabels[sec.anchor]}</span>
      </div>

      {sec.id === 'hello' && (
        <div className="anchor-card glass wide enter show" style={{ left: '5vw', bottom: '11vh' }}>
          <span className="eyebrow">{P.hello.greeting}</span>
          <h2 className="display" style={{ fontSize: 'clamp(34px,5vw,68px)', margin: '12px 0 16px' }}>
            {P.hello.headline.map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>)}
          </h2>
          <p className="lede" style={{ maxWidth: 460, marginBottom: 20 }}>{P.hello.sub}</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <button className="btn" onClick={() => go(2)}>See projects <span aria-hidden="true">↓</span></button>
            <div className="chip-row">{P.hello.quickTags.map((t, i) => <span className="tag" key={i}>{t}</span>)}</div>
          </div>
        </div>
      )}

      {sec.id === 'about' && (<>
        <div className="anchor-card glass wide enter show" style={{ left: '5vw', top: '15vh' }}>
          <span className="eyebrow"><span className="num">02</span> {P.about.eyebrow}</span>
          <h2 className="display" style={{ fontSize: 'clamp(24px,2.6vw,38px)', margin: '12px 0 14px' }}>{P.about.title}</h2>
          <p className="lede" style={{ maxWidth: 440 }}>{P.about.body[0]}</p>
          <div className="stat-row" style={{ marginTop: 18 }}>
            {P.about.stats.map((s, i) => <div className="stat" key={i}><div className="k">{s.k}</div><div className="v">{s.v}</div></div>)}
          </div>
        </div>
        <div className="anchor-card glass enter show" style={{ left: '5vw', bottom: '10vh' }}>
          <span className="eyebrow" style={{ marginBottom: 10, display: 'block' }}>Core stack</span>
          <div className="chip-row" style={{ maxWidth: 360 }}>{P.about.stack.map((s, i) => <span className="mini-tag" key={i}>{s}</span>)}</div>
        </div>
      </>)}

      {sec.id === 'projects' && (<>
        <div className="anchor-card glass enter show" style={{ left: '5vw', top: '13vh' }}>
          <span className="eyebrow"><span className="num">03</span> {P.projects.eyebrow}</span>
          <h2 className="display" style={{ fontSize: 'clamp(22px,2.4vw,34px)', marginTop: 8 }}>{P.projects.title}</h2>
        </div>
        {P.projects.items.map((p, i) => {
          const pos = [
            { left: '5vw', top: '40vh' }, { left: '24vw', top: '30vh' },
            { left: '5vw', top: '66vh' }, { left: '24vw', top: '56vh' },
          ][i];
          return (
            <a className="proj-mini glass enter show" href={p.url} target="_blank" rel="noopener" key={i} style={pos}>
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

      {sec.id === 'work' && (
        <div className="anchor-card glass wide enter show" style={{ left: '5vw', top: '13vh', bottom: '13vh', maxHeight: '74vh', overflowY: 'auto', maxWidth: 'min(46vw,520px)' }}>
          <span className="eyebrow"><span className="num">04</span> {P.work.eyebrow}</span>
          <h2 className="display" style={{ fontSize: 'clamp(22px,2.4vw,32px)', margin: '8px 0 6px' }}>{P.work.title}</h2>
          <WorkBlocks />
        </div>
      )}

      {sec.id === 'contact' && (
        <div className="anchor-card glass wide enter show" style={{ right: '5vw', bottom: '12vh' }}>
          <span className="eyebrow"><span className="num">05</span> {P.contact.eyebrow}</span>
          <h2 className="display" style={{ fontSize: 'clamp(30px,3.4vw,48px)', margin: '12px 0 14px' }}>{P.contact.title}</h2>
          <p className="lede" style={{ maxWidth: 380, marginBottom: 18 }}>{P.contact.sub}</p>
          <a className="btn" href={`mailto:${P.contact.email}`} style={{ marginBottom: 18 }}>{P.contact.email} <span aria-hidden="true">→</span></a>
          <ContactLinks />
        </div>
      )}
    </div>
  );
}

/* ============================================================
   B · DOCKED SIDE RAIL
   ============================================================ */
function RailLayout({ active, go }) {
  const P = window.PORTFOLIO;
  const sec = P.sections[active];
  return (
    <div className="rail">
      <div className="rail-head">
        <div className="r-name">{P.name}</div>
        <div className="r-role">{P.role} · {P.location}</div>
        <div className="rail-nav">
          {P.sections.map((s, i) => (
            <button key={s.id} className={i === active ? 'active' : ''} onClick={() => go(i)}>{s.label}</button>
          ))}
        </div>
      </div>
      <div className="rail-body" key={sec.id}>
        <ColumnContent secId={sec.id} go={go} />
      </div>
    </div>
  );
}

/* ============================================================
   C · EXPANDING BOTTOM SHEET
   ============================================================ */
function SheetLayout({ active, go }) {
  const P = window.PORTFOLIO;
  const sec = P.sections[active];
  const [open, setOpen] = React.useState(true);
  const titleMap = {
    hello: P.hello.greeting, about: P.about.title, projects: P.projects.title,
    work: P.work.title, contact: P.contact.title,
  };
  return (<>
    <div className="sheet-min">
      <span className="dot" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)' }} />
      {P.name} — {P.role}
    </div>
    <div className={'sheet' + (open ? ' open' : '')}>
      <div className="sheet-grip" onClick={() => setOpen(o => !o)}><i /></div>
      <div className="sheet-head" onClick={() => setOpen(o => !o)}>
        <div>
          <span className="eyebrow"><span className="num">{sec.num}</span> {sec.label}</span>
          <div className="sh-title" style={{ marginTop: 6 }}>{titleMap[sec.id]}</div>
        </div>
        <button className="sh-toggle" onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}>
          {open ? 'Collapse' : 'Expand'} <span className="chev" aria-hidden="true">▴</span>
        </button>
      </div>
      <div className="sheet-body" key={sec.id}>
        <ColumnContent secId={sec.id} go={go} />
      </div>
    </div>
  </>);
}

Object.assign(window, { AnchoredLayout, RailLayout, SheetLayout });
