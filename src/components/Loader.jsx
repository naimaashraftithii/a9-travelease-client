// src/components/Loader.jsx
import React from "react";
import styled, { keyframes } from "styled-components";

export default function Loader({ fullscreen = false, text = "Loading…" }) {
  return (
    <Wrap $fullscreen={fullscreen} role="status" aria-live="polite">
      <main id="container">
        <div className="dots">
          {Array.from({ length: 10 }).map((_, i) => (
            <div className="dot" key={`d1-${i}`} />
          ))}
        </div>

        <div className="dots2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div className="dot2" key={`d2-${i}`} />
          ))}
        </div>

        <div className="circle" />
      </main>

      <p className="sr-only">{text}</p>
      {!fullscreen && <div className="hint">{text}</div>}
    </Wrap>
  );
}

/* ---------- styled-components ---------- */

const move = keyframes`
  0%, 100% { left: -100px; }
  0%, 48% { transform: rotateY(0deg); }
  50%, 100% { transform: rotateY(180deg); }
  50% { left: 100%; }
`;
const chomp1 = keyframes`
  0% { transform: rotate(0deg); }
  50% { transform: rotate(45deg); }
  100% { transform: rotate(0deg); }
`;
const chomp2 = keyframes`
  0% { transform: rotate(0deg); }
  50% { transform: rotate(-45deg); }
  100% { transform: rotate(0deg); }
`;
const loaderLine = keyframes`
  0%, 48% { border-top: 10px dotted #1E88E5; }
  50%, 100% { border-top: 10px dotted #F44336; }
`;
const dot1 = keyframes`
  0%,4% { background: #1E88E5; opacity: 1; }
  5%,94% { background: #F44336; opacity: 0; }
  95%,100% { background: #1E88E5; opacity: 1; }
`;
const dot2 = keyframes`
  0%,4% { background: #F44336; opacity: 1; }
  5%,94% { opacity: 0; }
  95%,100% { background: #F44336; opacity: 1; }
`;

const Wrap = styled.div`
  /* Fullscreen overlay mode */
  ${({ $fullscreen }) =>
    $fullscreen
      ? `
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: grid;
    place-items: center;
    background: rgba(2,6,23,0.6); /* slate-950/60 */
    backdrop-filter: blur(2px);
  `
      : `
    min-height: 40vh;
    display: grid;
    place-items: center;
  `}

  #container {
    position: relative;
    width: 320px;
    height: 160px;
  }

  .circle {
    position: relative;
    left: -100px;
    width: 0;
    height: 0;
    border: 50px solid #FDD835;
    border-radius: 50%;
    border-right-color: transparent;
    animation: ${move} 5s linear infinite;
  }
  .circle:before,
  .circle:after {
    content: "";
    position: absolute;
    top: -50px;
    left: -50px;
    width: 0;
    height: 0;
    border: 50px solid #FDD835;
    border-radius: 50%;
    border-right-color: transparent;
  }
  .circle:before { animation: ${chomp1} .25s ease-in-out infinite; }
  .circle:after  { animation: ${chomp2} .25s ease-in-out infinite; }

  .loader {
    position: relative;
    top: 50px;
    width: 300px;
    height: 0px;
    border-top: 10px dotted black;
    animation: ${loaderLine} 5s ease-in-out infinite;
  }

  .dots, .dots2 {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dots { top: 60px; }
  .dots2 { top: 50px; left: 10px; }

  .dot, .dot2 {
    width: 10px;
    height: 10px;
    margin: 0 10px;
    border-radius: 50%;
  }

  .dot { background: #1E88E5; animation: ${dot1} 5s linear infinite; }
  .dot2 { background: #F44336; opacity: 0; animation: ${dot2} 5s linear infinite; left: -10px; }

  /* staggering */
  .dots .dot:nth-child(1)  { animation-delay: 0s; }
  .dots .dot:nth-child(2)  { animation-delay: .25s; }
  .dots .dot:nth-child(3)  { animation-delay: .5s; }
  .dots .dot:nth-child(4)  { animation-delay: .75s; }
  .dots .dot:nth-child(5)  { animation-delay: 1s; }
  .dots .dot:nth-child(6)  { animation-delay: 1.25s; }
  .dots .dot:nth-child(7)  { animation-delay: 1.5s; }
  .dots .dot:nth-child(8)  { animation-delay: 1.75s; }
  .dots .dot:nth-child(9)  { animation-delay: 1.9s; }
  .dots .dot:nth-child(10) { animation-delay: 2.1s; }

  .dots2 .dot2:nth-child(10) { animation-delay: 2.5s; }
  .dots2 .dot2:nth-child(9)  { animation-delay: 2.75s; }
  .dots2 .dot2:nth-child(8)  { animation-delay: 3.0s; }
  .dots2 .dot2:nth-child(7)  { animation-delay: 3.25s; }
  .dots2 .dot2:nth-child(6)  { animation-delay: 3.5s; }
  .dots2 .dot2:nth-child(5)  { animation-delay: 3.75s; }
  .dots2 .dot2:nth-child(4)  { animation-delay: 4.0s; }
  .dots2 .dot2:nth-child(3)  { animation-delay: 4.25s; }
  .dots2 .dot2:nth-child(2)  { animation-delay: 4.5s; }
  .dots2 .dot2:nth-child(1)  { animation-delay: 4.6s; }

  /* visible hint when not fullscreen */
  .hint {
    margin-top: 12px;
    text-align: center;
    font-size: 0.9rem;
    opacity: 0.75;
    color: #e5e7eb; /* slate-200 */
  }

  /* a11y helper for screen readers only */
  .sr-only {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
  }
`;
