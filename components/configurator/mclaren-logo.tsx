import React from 'react';

interface McLarenLogoProps {
  className?: string;
  /** Width in px — height scales from aspect ratio */
  size?: number;
  /** Wordmark colour (default white for dark backgrounds) */
  color?: string;
  /** Show wordmark only — no speedmark */
  textOnly?: boolean;
  /** Show speedmark only — no wordmark (for compact buttons) */
  markOnly?: boolean;
}

const McLarenLogo: React.FC<McLarenLogoProps> = ({
  className = '',
  size = 160,
  color = '#ffffff',
  textOnly = false,
  markOnly = false,
}) => {
  /* ── Mark-only variant (speedmark swoosh standalone) ── */
  if (markOnly) {
    const w = size;
    const h = Math.round(size * 0.55);
    return (
      <svg
        width={w}
        height={h}
        viewBox="0 0 100 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="McLaren"
      >
        <path
          d="M 4 50 C 24 22, 70 2, 97 1 C 92 17, 66 30, 10 53 Z"
          fill="#FF8000"
        />
      </svg>
    );
  }

  /* ── Full logo: wordmark + optional speedmark ── */
  const w = size;
  const h = Math.round(size / 3.52); // ~310:88 aspect ratio

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
      {/* Orange speedmark swoosh */}
      {!textOnly && (
        <path
          d="M 196 60 C 220 28, 272 4, 307 3 C 302 22, 274 36, 204 63 Z"
          fill="#FF8000"
        />
      )}

      {/* McLaren wordmark — Barlow Condensed 800 Italic */}
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
