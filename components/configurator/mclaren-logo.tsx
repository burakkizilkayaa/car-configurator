import React from 'react';

interface McLarenLogoProps {
  className?: string;
  /** Width in px — height is calculated from aspect ratio */
  size?: number;
  /** Wordmark colour (default white for dark backgrounds) */
  color?: string;
  /** Hide the orange speedmark — show wordmark only */
  textOnly?: boolean;
}

/**
 * Faithful recreation of the McLaren logo:
 *  - Italic bold "McLaren" wordmark (Barlow Condensed Bold Italic)
 *  - Orange curved speedmark swoosh positioned above the 'n'
 *
 * viewBox 0 0 310 88
 * The speedmark is traced as two bezier curves forming the wing shape.
 */
const McLarenLogo: React.FC<McLarenLogoProps> = ({
  className = '',
  size = 160,
  color = '#ffffff',
  textOnly = false,
}) => {
  /* Aspect ratio of the full logo is ~310:88 ≈ 3.52 */
  const w = size;
  const h = Math.round(size / 3.52);

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 310 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="McLaren"
    >
      {/* ── Orange speedmark swoosh ────────────────────────────────
          Outer arc: left anchor → sweeps up-right → tip at far right
          Inner arc: tip → tighter sweep back to left anchor
          This recreates the characteristic McLaren "speed mark".
      ─────────────────────────────────────────────────────────── */}
      {!textOnly && (
        <path
          d={[
            'M 196 60',                        /* left anchor — narrow tip */
            'C 220 28, 272 4, 307 3',          /* outer sweep up-right */
            'C 302 22, 274 36, 204 63',        /* inner sweep back-left */
            'Z',
          ].join(' ')}
          fill="#FF8000"
        />
      )}

      {/* ── McLaren wordmark ──────────────────────────────────────
          Barlow Condensed 800 Italic is visually close to the
          custom McLaren typeface (condensed, angled, bold).
      ─────────────────────────────────────────────────────────── */}
      <text
        x="2"
        y="80"
        fill={color}
        fontFamily="'Barlow Condensed', 'Barlow', sans-serif"
        fontSize="76"
        fontWeight="800"
        fontStyle="italic"
        letterSpacing="-1"
      >
        McLaren
      </text>
    </svg>
  );
};

export default McLarenLogo;
