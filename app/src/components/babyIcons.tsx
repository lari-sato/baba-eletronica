import React from "react";
import Svg, { Path, G } from "react-native-svg";

interface BabyIconsProps {
  size?: number;
  color?: string;
}


export default function BabyIcon({ size, color }: BabyIconsProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <Path d="M10 16c.456.607 1.182 1 2 1s1.544-.393 2-1m1.625-4.742v.353m-7.25-.353v.353m.375-.111c0-.276-.168-.5-.375-.5S8 11.224 8 11.5s.168.5.375.5s.375-.224.375-.5m7.25 0c0-.276-.168-.5-.375-.5s-.375.224-.375.5s.168.5.375.5s.375-.224.375-.5" />
        <Path d="M3.186 10.173a2 2 0 0 0 0 3.654a9.002 9.002 0 0 0 17.628 0a2 2 0 0 0 0-3.654a9.002 9.002 0 0 0-17.628 0" />
        <Path d="M12 3c2 0 3.5 1.27 3.5 2.712c0 .933-.472 2.288-2 2.288c-.82 0-1.342-.606-1.5-1" />
      </G>
    </Svg>
  );
}


export function BabyBottle({ size, color }: BabyIconsProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <Path d="M20 11c1.1-1.4 1.3-3.3.7-4.9l.8-.8a1.5 1.5 0 0 0-2.8-2.8l-.8.8A5.33 5.33 0 0 0 13 4" />
        <Path d="M11.3 3.7a1 1 0 0 1 1.4 0l7.6 7.6a1 1 0 0 1 0 1.4l-1.6 1.6a1 1 0 0 1-1.4 0L9.7 6.7a1 1 0 0 1 0-1.4Z" />
        <Path d="m10 7l-7.3 7.3c-.9.9-.9 2.5 0 3.4l3.6 3.6c.9.9 2.5.9 3.4 0L17 14M4 13l2 2m1-5l2 2" />
      </G>
    </Svg>
  );
}

export function SleepyIcon({ size, color }: BabyIconsProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <G fill={color}>
        <Path d="M6 24c0-9.941 8.059-18 18-18v2C15.163 8 8 15.163 8 24s7.163 16 16 16s16-7.163 16-16c0-1.599-.234-3.142-.67-4.599l1.915-.575A18 18 0 0 1 42 24c0 9.941-8.059 18-18 18S6 33.941 6 24" />
        <Path d="M18.53 13.952a1 1 0 0 0 1 1.732l.936-.541l-.451 3.75a1 1 0 0 0 1.492.986l3.002-1.733a1 1 0 1 0-1-1.732l-1.27.733l.452-3.75a1 1 0 0 0-1.492-.986zm7.287-4.658a1 1 0 0 1 .707-1.225l3.864-1.035a1 1 0 0 1 1.187 1.338l-2.049 5.105l2.415-.647a1 1 0 0 1 .518 1.931l-4.347 1.165a1 1 0 0 1-1.187-1.338l2.049-5.104l-1.932.517a1 1 0 0 1-1.225-.707M36.556 6a1 1 0 1 0 0 2h2.64l-4.044 6.47A1 1 0 0 0 36 16h5a1 1 0 1 0 0-2h-3.196l4.044-6.47A1 1 0 0 0 41 6zM12.888 27.106c.076.743.743 1.297 1.516 1.543c.808.256 1.855.235 2.967-.247a3.8 3.8 0 0 0 2.132-2.295c.29-.868.25-1.82-.152-2.425a.5.5 0 0 0-.843.016c-1.294 2.111-3.144 3.04-5.075 2.86a.5.5 0 0 0-.545.548M32.28 21.91c.306.681.006 1.494-.54 2.094c-.572.626-1.49 1.13-2.693 1.27a3.8 3.8 0 0 1-2.995-.922c-.684-.607-1.125-1.45-1.08-2.176a.5.5 0 0 1 .738-.408c2.176 1.182 4.243 1.061 5.825-.061a.5.5 0 0 1 .745.203m.168 9.945c-2.251-3.084-5.587-4.715-8.707-3.879c-3.12.837-5.194 3.916-5.601 7.713c-.115 1.069.923 1.823 1.961 1.545l11.42-3.06c1.039-.279 1.56-1.45.927-2.319" />
      </G>
    </Svg>
  );
}

export function DiscomfortIcon({ size, color }: BabyIconsProps) {
  return (
  <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <mask id="lagrimaMask">
          <circle cx="24" cy="25" r="24" fill="#FFFFFF" />
          <Path
            d="M 11.04 8.64 C 6.24 13.44 8.16 18.24 11.52 18.24 C 14.88 18.24 16.32 13.92 11.04 8.64 Z"
            fill="#000000"
            stroke="#000000"
            strokeWidth="2.64"
          />
        </mask>
      </defs>

  
      <G stroke={color}>
        <circle
          cx="24"
          cy="25"
          r="19.68"
          strokeWidth="2.88"
          strokeLinecap="round"
          mask="url(#lagrimaMask)"
        />

        <Path
          d="M 11.04 8.64 C 6.24 13.44 8.16 18.24 11.52 18.24 C 14.88 18.24 16.32 13.92 11.04 8.64 Z"
          strokeWidth="2.64"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <Path
          d="M 13.44 23.04 C 14.88 18.24 19.68 18.24 21.12 23.04"
          strokeWidth="2.88"
          strokeLinecap="round"
        />

        <Path
          d="M 26.88 23.04 C 28.32 18.24 33.12 18.24 34.56 23.04"
          strokeWidth="2.88"
          strokeLinecap="round"
        />

        <Path
          d="M 16.8 35.04 C 19.2 27.84 28.8 27.84 31.2 35.04"
          strokeWidth="2.88"
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
  
}
export function PainIcon({ size, color }: BabyIconsProps) {
  return (
   <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
  <G
    fill="none"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
  >
    <Path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" />
    <Path d="M7 8.5l2 2l-2 2" />
    <Path d="M17 8.5l-2 2l2 2" />
    <Path d="m8 16l2-2l2 2l2-2l2 2" />
  </G>
</Svg>
  );
}

export function UndefinedIcon({ size, color }: BabyIconsProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 640 640" fill="none">
      <G fill={color}>
        <Path d="M280 88c0-30.9-25.1-56-56-56s-56 25.1-56 56s25.1 56 56 56s56-25.1 56-56m24 212.7l37 49.9c12.8-17.5 28.5-32.7 46.3-45l-56.2-75.7C306 196 266.3 176 224 176s-82 20-107.2 53.9l-70.5 95c-10.5 14.2-7.6 34.2 6.6 44.8s34.2 7.6 44.8-6.6l46.3-62.4V576c0 17.7 14.3 32 32 32s32-14.3 32-32V416c0-8.8 7.2-16 16-16s16 7.2 16 16v160c0 17.7 14.3 32 32 32s32-14.3 32-32zM496 608c79.5 0 144-64.5 144-144s-64.5-144-144-144s-144 64.5-144 144s64.5 144 144 144m0-100c11 0 20 9 20 20s-9 20-20 20s-20-9-20-20s9-20 20-20m0-100c-11.6 0-21.3 8.2-23.5 19.2c-1.8 8.7-10.2 14.3-18.9 12.5s-14.3-10.2-12.5-18.9c5.2-25.6 27.8-44.8 54.9-44.8c30.9 0 56 25.1 56 56c0 19.8-11.7 37.8-29.8 45.9l-10.4 4.6c-1.2 7.7-7.8 13.5-15.8 13.5c-8.8 0-16-7.2-16-16c0-11.2 6.6-21.3 16.8-25.9l12.4-5.5c6.6-2.9 10.8-9.4 10.8-16.6c0-13.3-10.7-24-24-24" />
      </G>
    </Svg>
  );
}
