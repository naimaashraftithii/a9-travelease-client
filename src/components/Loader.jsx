
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

   
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    </Wrap>
  );
}

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
  ${({ $fullscreen }) =>
    $fullscreen
      ? `
    position: fixed; inset: 0; z-index: 9999;
    display: grid; place-items: center;
    background: rgba(2,6,23,0.6); backdrop-filter: blur(2px);
  `
      : `
    min-height: 40vh; display: grid; place-items: center;
  `}

  #container { position: relative; width: 320px; height: 160px; }
  .circle {
    position: relative; left: -100px; width: 0; height: 0;
    border: 50px solid #FDD835; border-radius: 50%;
    border-right-color: transparent; animation: ${move} 5s linear infinite;
  }
  .circle:before, .circle:after {
    content: ""; position: absolute; top: -50px; left: -50px;
    width: 0; height: 0; border: 50px solid #FDD835; border-radius: 50%;
    border-right-color: transparent;
  }
  .circle:before { animation: ${chomp1} .25s ease-in-out infinite; }
  .circle:after  { animation: ${chomp2} .25s ease-in-out infinite; }

  .dots, .dots2 {
    position: relative; display: flex; justify-content: center; align-items: center;
  }
  .dots { top: 60px; } .dots2 { top: 50px; left: 10px; }

  .dot, .dot2 { width: 10px; height: 10px; margin: 0 10px; border-radius: 50%; }
  .dot { background: #1E88E5; animation: ${dot1} 5s linear infinite; }
  .dot2 { background: #F44336; opacity: 0; animation: ${dot2} 5s linear infinite; left: -10px; }

  .hint { margin-top: 12px; text-align: center; font-size: .9rem; opacity: .75; color: #e5e7eb; }

  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
`;
