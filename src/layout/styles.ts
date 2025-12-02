// src/layout/styles.ts
import styled, { keyframes } from 'styled-components'

export const fade = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`

export const FadeIn = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: #ffb6d4; /* soft pink */
  animation: ${fade} 4s normal forwards ease-in-out;
`

const containerFadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const titlePop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
    letter-spacing: 0.2em;
  }
  60% {
    opacity: 1;
    transform: translateY(0);
    letter-spacing: -0.01em;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    letter-spacing: -0.03em;
  }
`

export const Container = styled.div`
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    sans-serif;
  font-size: 16px;
  color: #000000ff;

  /* subtle entrance for the whole overlay */
  opacity: 0;
  animation: ${containerFadeUp} 0.8s ease-out forwards;
  animation-delay: 0.15s;

  & h1 {
    padding: 0;
    margin: 0 0 0.05em 0;
    font-family: 'Ayer Poster', serif;
    font-weight: 400;
    font-size: min(18vw, 14em);
    line-height: 0.85em;
    letter-spacing: -0.03em;

    /* hero title animation */
    opacity: 0;
    animation: ${titlePop} 0.9s cubic-bezier(0.19, 1, 0.22, 1) forwards;
    animation-delay: 0.25s;
  }

  & p {
    line-height: 1.3em;
  }
`

export const TopLeft = styled.div`
  position: absolute;
  top: 5vw;
  left: 5vw;
`

export const BottomLeft = styled.div`
  position: absolute;
  bottom: 5vw;
  left: 5vw;
  width: 30ch;
  max-width: 40%;
`

export const BottomRight = styled.div`
  position: absolute;
  bottom: 5vw;
  right: 5vw;
  width: 35ch;
  max-width: 40%;
  line-height: 1.2em;
  letter-spacing: -0.01em;
  text-align: right;
`

export const Hamburger = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 5vw;
  right: 5vw;

  & > div {
    position: relative;
    width: 24px;
    height: 2px;
    background: #2b1b24;
    margin-bottom: 6px;
    border-radius: 999px;
  }
`

export const LeftMiddle = styled.div`
  position: absolute;
  bottom: 50%;
  right: 5vw;
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    sans-serif;
  font-weight: 400;
  line-height: 1em;
  letter-spacing: -0.01em;
  font-size: 12px;
  transform: rotate(90deg) translate3d(50%, 0, 0);
  transform-origin: 100% 50%;

  & input[type='range'] {
    margin-left: 0.75rem;
  }
`
const scrollPulse = keyframes`
  0% {
    transform: translateY(0);
    opacity: 0.4;
  }
  50% {
    transform: translateY(6px);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 0.4;
  }
`
// 👇 New: scroll indicator at bottom center
export const ScrollIndicator = styled.div`
  position: absolute;
  left: 50%;
  bottom: 2.5vh;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    sans-serif;
  font-size: 10px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #2b1b24;
  pointer-events: none;

  /* tiny "scroll" text */
  & span {
    opacity: 0.7;
  }

  /* vertical line that pulses down */
  &::after {
    content: '';
    width: 1px;
    height: 22px;
    background: #2b1b24;
    animation: ${scrollPulse} 1.6s ease-in-out infinite;
    border-radius: 999px;
  }

  @media (min-width: 768px) {
    font-size: 11px;
    bottom: 3vh;
  }
`