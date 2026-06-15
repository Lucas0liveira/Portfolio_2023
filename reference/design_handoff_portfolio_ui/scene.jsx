/* ============================================================
   Scene backdrop — simulates the real Three.js camera framing
   by panning/zooming the rendered still per section.
   In the real app this maps 1:1 to your camera keyframes.
   ============================================================ */
const { useRef, useEffect, useState } = React;

// camera presets: transform-origin (%) + scale, tuned to the scene objects
const CAMERA = {
  room:     { ox: 50, oy: 50, scale: 1.04 },   // hello — wide establishing
  shelf:    { ox: 90, oy: 20, scale: 1.62 },   // about — books on the window shelf
  monitors: { ox: 90, oy: 50, scale: 1.66 },   // projects — the dual monitors
  desk:     { ox: 84, oy: 70, scale: 1.5  },   // work — desk + keyboard
  door:     { ox: 39, oy: 74, scale: 1.5  },   // contact — door + mail slot
};

// where the anchor "pin" lands on screen for the anchored layout (vw/vh %)
const ANCHOR_POINT = {
  room:     { x: 70, y: 64 },
  shelf:    { x: 63, y: 40 },
  monitors: { x: 72, y: 52 },
  desk:     { x: 66, y: 66 },
  door:     { x: 41, y: 58 },
};

function Scene({ anchor }) {
  const parallaxRef = useRef(null);
  const cam = CAMERA[anchor] || CAMERA.room;

  // pointer parallax (desktop only)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let raf = null;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const dx = (e.clientX / window.innerWidth - 0.5);
        const dy = (e.clientY / window.innerHeight - 0.5);
        if (parallaxRef.current) {
          parallaxRef.current.style.transform =
            `translate(${dx * -22}px, ${dy * -16}px)`;
        }
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => { window.removeEventListener('pointermove', onMove); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="scene-stage">
      <div className="scene-parallax" ref={parallaxRef}>
        <img
          className="scene-img"
          src="assets/scene.png"
          alt="3D room scene"
          style={{
            transform: `scale(${cam.scale})`,
            transformOrigin: `${cam.ox}% ${cam.oy}%`,
          }}
        />
      </div>
      <div className="scene-scrim" />
    </div>
  );
}

window.Scene = Scene;
window.ANCHOR_POINT = ANCHOR_POINT;
