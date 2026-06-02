import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { color, font, mixin } from 'shared/utils/styles';

// Slow, calm drift for the aurora glow blobs.
const drift = keyframes`
  0% {
    transform: translate3d(-4%, -3%, 0) scale(1);
  }
  100% {
    transform: translate3d(5%, 4%, 0) scale(1.12);
  }
`;

// Ultra-slow rotation for the faint orbit rings.
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Tiny tiled SVG turbulence used as a low-opacity grain overlay (kills gradient
// banding and adds a premium texture). Inlined as a data-URI — no extra assets.
const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

export const Page = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  /* grain layer stacked above the deep-indigo base gradient */
  background-image: ${grain},
    linear-gradient(135deg, ${color.backgroundDarkPrimary} 0%, #2d2f4e 100%);
  background-size: 120px 120px, cover;

  /* Aurora glow blobs */
  &::before {
    content: '';
    position: absolute;
    inset: -20%;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(
        38% 38% at 22% 28%,
        ${mixin.rgba(color.accent, 0.5)} 0%,
        ${mixin.rgba(color.accent, 0)} 70%
      ),
      radial-gradient(
        42% 42% at 80% 78%,
        ${mixin.rgba(color.primary, 0.55)} 0%,
        ${mixin.rgba(color.primary, 0)} 70%
      ),
      radial-gradient(
        30% 30% at 68% 18%,
        ${mixin.rgba('#22D3EE', 0.22)} 0%,
        ${mixin.rgba('#22D3EE', 0)} 70%
      );
    filter: blur(8px);
  }

  /* Faint concentric orbit rings echoing the logo */
  &::after {
    content: '';
    position: absolute;
    z-index: 0;
    top: -30%;
    right: -25%;
    width: 90vmax;
    height: 90vmax;
    pointer-events: none;
    border-radius: 50%;
    background: repeating-radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0) 62px,
      rgba(255, 255, 255, 0.05) 63px,
      rgba(255, 255, 255, 0.05) 64px
    );
  }

  @media (prefers-reduced-motion: no-preference) {
    &::before {
      animation: ${drift} 22s ease-in-out infinite alternate;
    }
    &::after {
      animation: ${spin} 240s linear infinite;
    }
  }
`;

export const Card = styled.div`
  position: relative;
  z-index: 1;
  background: #fff;
  border-radius: 16px;
  padding: 48px 40px 40px;
  width: 100%;
  max-width: 420px;
  ${mixin.boxShadowMedium}
`;

export const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`;

export const AppName = styled.span`
  ${font.bold}
  font-size: 22px;
  color: ${color.backgroundDarkPrimary};
  letter-spacing: -0.3px;
`;

export const Heading = styled.h1`
  ${font.bold}
  font-size: 24px;
  color: ${color.textDarkest};
  margin-bottom: 6px;
  margin-top: 24px;
`;

export const Subheading = styled.p`
  ${font.regular}
  font-size: 14px;
  color: ${color.textMedium};
  margin-bottom: 28px;
`;

export const FieldGroup = styled.div`
  margin-bottom: 18px;
`;

export const Label = styled.label`
  display: block;
  ${font.medium}
  font-size: 13px;
  color: ${color.textDark};
  margin-bottom: 6px;
`;

export const Input = styled.input`
  width: 100%;
  height: 44px;
  border: 1.5px solid ${color.borderLight};
  border-radius: 8px;
  padding: 0 14px;
  ${font.regular}
  font-size: 15px;
  color: ${color.textDarkest};
  transition: border-color 0.15s;
  background: #fff;

  &:focus {
    outline: none;
    border-color: ${color.borderInputFocus};
    box-shadow: 0 0 0 3px ${mixin.rgba(color.accent, 0.12)};
  }

  &::placeholder {
    color: ${color.textLight};
  }
`;

export const FieldError = styled.p`
  ${font.regular}
  font-size: 12px;
  color: ${color.danger};
  margin-top: 4px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 46px;
  background: linear-gradient(135deg, ${color.primary} 0%, ${color.accent} 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  ${font.bold}
  font-size: 15px;
  cursor: pointer;
  margin-top: 8px;
  transition: opacity 0.15s, transform 0.1s;

  &:hover {
    opacity: 0.92;
  }
  &:active {
    transform: scale(0.99);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 22px 0;
  color: ${color.textLight};
  font-size: 13px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${color.borderLightest};
  }
`;

export const GuestButton = styled.button`
  width: 100%;
  height: 44px;
  background: ${color.backgroundLightest};
  color: ${color.textDark};
  border: 1.5px solid ${color.borderLight};
  border-radius: 8px;
  ${font.medium}
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${color.backgroundLight};
  }
`;

export const Footer = styled.p`
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: ${color.textMedium};
`;

export const FooterLink = styled(Link)`
  color: ${color.primary};
  ${font.medium}

  &:hover {
    text-decoration: underline;
  }
`;
