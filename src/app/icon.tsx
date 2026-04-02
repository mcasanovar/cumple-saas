import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="80" r="45" fill="#E63946" />
          <circle cx="65" cy="110" r="45" fill="#F77F00" />
          <circle cx="135" cy="110" r="45" fill="#4ECDC4" />

          <ellipse cx="100" cy="75" rx="18" ry="28" fill="#FF6B7A" opacity="0.6" />
          <path
            d="M 100 75 Q 95 68 92 65"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          <ellipse cx="65" cy="105" rx="18" ry="28" fill="#FFB347" opacity="0.6" />
          <path
            d="M 65 105 Q 60 98 57 95"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          <ellipse cx="135" cy="105" rx="18" ry="28" fill="#7FDBDA" opacity="0.6" />
          <path
            d="M 135 105 Q 130 98 127 95"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          <path
            d="M 100 105 Q 100 130 100 150"
            stroke="#D1D5DB"
            strokeWidth="2.5"
            fill="none"
          />
          <path
            d="M 65 135 Q 80 145 100 150"
            stroke="#D1D5DB"
            strokeWidth="2.5"
            fill="none"
          />
          <path
            d="M 135 135 Q 120 145 100 150"
            stroke="#D1D5DB"
            strokeWidth="2.5"
            fill="none"
          />

          <circle cx="50" cy="50" r="3" fill="#F77F00" />
          <circle cx="150" cy="60" r="3" fill="#E63946" />
          <circle cx="160" cy="100" r="2.5" fill="#4ECDC4" />
          <circle cx="40" cy="90" r="2.5" fill="#F77F00" />

          <path
            d="M 30 70 L 34 74 L 30 78 L 26 74 Z"
            fill="#E63946"
          />
          <path
            d="M 170 80 L 174 84 L 170 88 L 166 84 Z"
            fill="#4ECDC4"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
