import React from 'react';

interface McLarenLogoProps {
  className?: string;
  size?: number;
  textOnly?: boolean;
}

/* McLaren diamond speedmark + wordmark */
const McLarenLogo: React.FC<McLarenLogoProps> = ({ className = '', size = 44, textOnly = false }) => {
  const h = size * 0.52;
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 120 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="McLaren"
    >
      {/* Speedmark — tapered diamond/pennant shape */}
      {!textOnly && (
        <>
          {/* left wing */}
          <path
            d="M0 31 L18 10 L36 31 L18 52 Z"
            fill="white"
            opacity="0.9"
          />
          {/* right wing — narrower, pointing right */}
          <path
            d="M28 31 L46 14 L120 31 L46 48 Z"
            fill="white"
            opacity="0.9"
          />
          {/* inner cutout to create hollow speedmark */}
          <path
            d="M18 22 L28 31 L18 40 L10 31 Z"
            fill="#0d0d0d"
          />
        </>
      )}
      {/* Wordmark */}
      <text
        x={textOnly ? 60 : 70}
        y="36"
        textAnchor={textOnly ? 'middle' : 'start'}
        fill="white"
        fontFamily="Bebas Neue, Barlow Condensed, sans-serif"
        fontSize={textOnly ? '28' : '20'}
        letterSpacing={textOnly ? '5' : '3.5'}
        dominantBaseline="middle"
        opacity="0.92"
      >
        McLAREN
      </text>
    </svg>
  );
};

export default McLarenLogo;
