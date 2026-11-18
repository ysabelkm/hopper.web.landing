'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

/**
 * A modern iPhone-style device drawn in CSS around a bare screenshot: titanium
 * edge, side buttons, black bezel, a faint glass glare and a floor shadow.
 *
 * Everything is sized in container units (cqw = 1% of the phone's width), so
 * the frame scales with whatever width the parent gives it. The screenshots'
 * own rounded corners measure 12.4% of their width; the radii below nest
 * around that.
 *
 * `tilt` is any CSS transform (e.g. a rotateY for a 3D lean); give an
 * ancestor a `perspective` for it to read as depth. `hoverTilt` replaces it,
 * eased, while an ancestor with the `group` class is hovered.
 *
 * `hoverLift` (a length, e.g. '11cqw') raises the phone on that same hover,
 * and `hoverScale` grows it. Only the phone moves: its floor shadow stays on
 * the ground and fades, widens and blurs, as a shadow does when the object
 * casting it is lifted further from the floor.
 *
 * If the screenshot fails to load it is retried once, then hidden, so the
 * phone shows a dark, switched-off screen rather than the browser's
 * broken-image icon.
 */
export const PhoneFrame = ({
  src,
  tilt = 'none',
  hoverTilt = tilt,
  hoverLift = '0px',
  hoverScale = 1,
  className = '',
}: {
  src: string;
  tilt?: string;
  hoverTilt?: string;
  hoverLift?: string;
  hoverScale?: number;
  className?: string;
}) => (
  <div
    className={`[container-type:inline-size] ${className}`}
    style={{ '--lift': `calc(-1 * ${hoverLift})`, '--lift-scale': hoverScale } as CSSProperties}
  >
    {/* Lift: raises (and grows) the phone on hover, leaving the shadow below. */}
    <div className={`${ease} transition-[translate,scale] motion-safe:group-hover:[translate:0_var(--lift)] motion-safe:group-hover:[scale:var(--lift-scale)]`}>
    <div
      className="relative [transform-style:preserve-3d] [transform:var(--tilt)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:[transform:var(--tilt-hover)]"
      style={{ '--tilt': tilt, '--tilt-hover': hoverTilt } as CSSProperties}
    >
      {/* Side buttons sit just outside the edge, behind it. */}
      <span className={`${button} left-[-0.75cqw] top-[19%] h-[5%]`} />
      <span className={`${button} left-[-0.75cqw] top-[27%] h-[9%]`} />
      <span className={`${button} left-[-0.75cqw] top-[38%] h-[9%]`} />
      <span className={`${button} right-[-0.75cqw] top-[30%] h-[14%]`} />

      {/* Titanium edge. The hard offset shadow reads as the phone's depth. */}
      <div className="relative rounded-[15.2cqw] p-[1.2cqw]" style={edge}>
        {/* Bezel */}
        <div className="rounded-[14cqw] bg-[#0a0a0b] p-[2.3cqw]">
          <div className="relative overflow-hidden rounded-[11.6cqw]">
            <Screen src={src} />
            {/* Glass glare */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(118deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 28%, transparent 42%)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
    </div>

    {/* Floor shadow: a soft ellipse just under the phone, densest in the
        middle and fading to nothing, not tied to the tilt. It stays on the
        floor when the phone lifts: lighter, wider and softer, never higher. */}
    <div
      aria-hidden="true"
      className={`mx-auto mt-[3cqw] h-[6cqw] w-[70%] ${ease} transition-[opacity,scale,filter] motion-safe:group-hover:scale-x-[1.22] motion-safe:group-hover:scale-y-[1.35] motion-safe:group-hover:opacity-50 motion-safe:group-hover:blur-[1.2cqw]`}
      style={{ background: 'radial-gradient(closest-side, rgb(0 0 0 / 0.22), rgb(0 0 0 / 0.08) 55%, transparent)' }}
    />
  </div>
);

/** The screenshot, or a blank screen of the same size if it won't load. */
const Screen = ({ src }: { src: string }) => {
  const ref = useRef<HTMLImageElement>(null);
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);

  // A new screenshot (e.g. after a theme toggle) gets a fresh try.
  useEffect(() => {
    setAttempt(0);
    setFailed(false);
  }, [src]);

  const onError = () => (attempt === 0 ? setAttempt(1) : setFailed(true));

  // An image that failed before hydration never fires onError, so check once mounted.
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0) onError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <img
      ref={ref}
      src={attempt ? `${src}?retry=${attempt}` : src}
      alt=""
      width={804}
      height={1748}
      draggable={false}
      onError={onError}
      className={`block h-auto w-full ${failed ? 'invisible' : ''}`}
    />
  );
};

const ease = 'duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]';

const button =
  'absolute w-[1.1cqw] rounded-[0.6cqw] bg-[linear-gradient(90deg,#2a2a2d,#8d8d92_45%,#3a3a3d)] [transform:translateZ(-1px)]';

const edge: CSSProperties = {
  background:
    'linear-gradient(135deg, #8e8e93 0%, #3a3a3c 18%, #6e6e73 42%, #2c2c2e 62%, #7c7c81 82%, #3a3a3c 100%)',
  boxShadow: [
    // Polished inner lip
    'inset 0 0 0 0.35cqw rgb(255 255 255 / 0.10)',
    'inset 0 0 0 0.6cqw rgb(0 0 0 / 0.35)',
    // Depth: the side of the phone
    '1.1cqw 1.4cqw 0 -0.2cqw #232325',
    // Cast shadow in layers, tight and dark close in, wide and faint further
    // out, so it fades like real light instead of a flat grey slab.
    '0 0.6cqw 1.2cqw rgb(0 0 0 / 0.10)',
    '0 2.5cqw 5cqw -1cqw rgb(0 0 0 / 0.12)',
    '0 8cqw 16cqw -6cqw rgb(0 0 0 / 0.16)',
    '0 18cqw 32cqw -14cqw rgb(0 0 0 / 0.14)',
  ].join(', '),
};
