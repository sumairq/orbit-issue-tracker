import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';

import { color, font, mixin, shadow, radius } from 'shared/utils/styles';

/* Breakpoint at which the split collapses to a single column (showcase hidden). */
const SPLIT_BREAKPOINT = '900px';

/* One tasteful entrance: the form content fades + lifts in on mount. */
const riseIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

/* Slow drift for the showcase aurora glow. */
const drift = keyframes`
  0% { transform: translate3d(-3%, -2%, 0) scale(1); }
  100% { transform: translate3d(4%, 3%, 0) scale(1.1); }
`;

/* Low-opacity grain (data-URI, no extra asset) to kill gradient banding. */
const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

/* ─────────────────────────────────────────────────────────────────────────
   Page shell — two columns on desktop (showcase | form), one on mobile.
   Neutral base; indigo/violet is reserved for the showcase panel + actions.
   ───────────────────────────────────────────────────────────────────────── */
export const Page = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  background: ${color.backgroundLightest};

  @media (max-width: ${SPLIT_BREAKPOINT}) {
    grid-template-columns: 1fr;
  }
`;

/* ── Showcase (branded) panel ─────────────────────────────────────────────── */
export const Showcase = styled.aside`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 56px 56px 56px 64px;
  color: #fff;
  background-image: ${grain},
    linear-gradient(150deg, ${color.backgroundDarkPrimary} 0%, #312e7e 55%, ${color.accent} 130%);
  background-size: 120px 120px, cover;

  /* Aurora glow */
  &::before {
    content: '';
    position: absolute;
    inset: -25%;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(36% 36% at 18% 22%, ${mixin.rgba(color.accent, 0.55)} 0%, ${mixin.rgba(color.accent, 0)} 70%),
      radial-gradient(40% 40% at 82% 80%, ${mixin.rgba(color.primary, 0.6)} 0%, ${mixin.rgba(color.primary, 0)} 70%),
      radial-gradient(28% 28% at 72% 14%, ${mixin.rgba('#22D3EE', 0.22)} 0%, ${mixin.rgba('#22D3EE', 0)} 70%);
    filter: blur(6px);
  }

  @media (prefers-reduced-motion: no-preference) {
    &::before {
      animation: ${drift} 24s ease-in-out infinite alternate;
    }
  }

  /* Hidden on mobile — replaced by the condensed brand header above the form. */
  @media (max-width: ${SPLIT_BREAKPOINT}) {
    display: none;
  }
`;

export const ShowcaseInner = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 520px;
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
`;

export const BrandName = styled.span`
  ${font.black}
  font-size: 26px;
  letter-spacing: -0.4px;
  color: #fff;
`;

export const ValueProp = styled.h1`
  ${font.black}
  font-size: 34px;
  line-height: 1.18;
  letter-spacing: -0.6px;
  margin-bottom: 14px;
  color: #fff;
`;

export const ValuePropSub = styled.p`
  ${font.regular}
  font-size: 16px;
  line-height: 1.5;
  color: ${mixin.rgba('#FFFFFF', 0.72)};
  margin-bottom: 30px;
`;

export const FeatureList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 40px;
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 13px;
`;

export const FeatureIcon = styled.span`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: ${radius.lg};
  color: #fff;
  background: ${mixin.rgba('#FFFFFF', 0.12)};
  border: 1px solid ${mixin.rgba('#FFFFFF', 0.16)};
`;

export const FeatureText = styled.div`
  ${font.medium}
  font-size: 15px;
  color: #fff;
  padding-top: 6px;

  span {
    display: block;
    ${font.regular}
    font-size: 13px;
    color: ${mixin.rgba('#FFFFFF', 0.62)};
    margin-top: 2px;
  }
`;

/* Layered product preview: hero board screenshot + floating analytics card. */
export const PreviewStage = styled.div`
  position: relative;
  margin-top: 8px;
  /* Allow the floating card to bleed below without growing the panel. */
  padding-bottom: 36px;

  @media (max-width: 1180px) {
    display: none; /* keep the panel clean when it gets narrow */
  }
`;

const browserFrame = css`
  border-radius: ${radius.xl};
  background: #fff;
  box-shadow: 0 24px 50px -12px rgba(15, 23, 42, 0.55), 0 0 0 1px ${mixin.rgba('#FFFFFF', 0.08)};
  overflow: hidden;
`;

export const PreviewWindow = styled.div`
  ${browserFrame}
  transform: perspective(1600px) rotateY(-9deg) rotateX(3deg);
  transform-origin: left center;
`;

export const PreviewBar = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  height: 28px;
  padding: 0 12px;
  background: ${color.backgroundLight};
  border-bottom: 1px solid ${color.borderLightest};

  span {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: ${color.borderLight};
  }
`;

export const PreviewImg = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

export const PreviewFloat = styled.div`
  ${browserFrame}
  position: absolute;
  right: -14px;
  bottom: 0;
  width: 52%;
  transform: perspective(1600px) rotateY(-9deg) rotateX(3deg);
`;

export const PreviewFloatImg = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

/* ── Form panel ───────────────────────────────────────────────────────────── */
export const FormPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  background: #fff;
`;

export const FormInner = styled.div`
  width: 100%;
  max-width: 380px;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${riseIn} 0.5s ease both;
  }
`;

/* Condensed brand header — only shown on mobile (when the showcase is hidden). */
export const MobileBrand = styled.div`
  display: none;

  @media (max-width: ${SPLIT_BREAKPOINT}) {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 28px;
  }
`;

export const MobileBrandName = styled.span`
  ${font.bold}
  font-size: 20px;
  letter-spacing: -0.3px;
  color: ${color.textDarkest};
`;

export const Heading = styled.h1`
  ${font.black}
  font-size: 26px;
  letter-spacing: -0.4px;
  color: ${color.textDarkest};
  margin-bottom: 6px;
`;

export const Subheading = styled.p`
  ${font.regular}
  font-size: 14px;
  color: ${color.textMedium};
  margin-bottom: 24px;
`;

/* Prominent, first-class demo entry — sits ABOVE the form, not below an "or". */
export const GuestButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  padding: 13px 16px;
  border-radius: ${radius.lg};
  cursor: pointer;
  background: ${color.backgroundLightPrimary};
  border: 1.5px solid ${mixin.rgba(color.primary, 0.35)};
  color: ${color.primary};
  transition: background 0.15s, border-color 0.15s, box-shadow 0.15s, transform 0.1s;

  &:hover:not(:disabled) {
    background: ${mixin.lighten(color.backgroundLightPrimary, 0.02)};
    border-color: ${color.primary};
  }
  &:focus-visible {
    outline: none;
    box-shadow: ${shadow.focus};
  }
  &:active:not(:disabled) {
    transform: scale(0.99);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const GuestIcon = styled.span`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: ${radius.md};
  color: #fff;
  background: linear-gradient(135deg, ${color.primary} 0%, ${color.accent} 100%);
`;

export const GuestText = styled.span`
  ${font.bold}
  font-size: 14px;
  color: ${color.textDarkest};

  span {
    display: block;
    ${font.regular}
    font-size: 12px;
    color: ${color.textMedium};
    margin-top: 1px;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0;
  ${font.medium}
  color: ${color.textLight};
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.4px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${color.borderLightest};
  }
`;

export const FieldGroup = styled.div`
  margin-bottom: 16px;
`;

export const Label = styled.label`
  display: block;
  ${font.medium}
  font-size: 13px;
  color: ${color.textDark};
  margin-bottom: 6px;
`;

export const InputWrap = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  height: 44px;
  border: 1.5px solid ${props => (props.hasError ? color.danger : color.borderLight)};
  border-radius: ${radius.lg};
  padding: 0 14px;
  /* room for the show/hide toggle on password fields */
  padding-right: ${props => (props.hasToggle ? '64px' : '14px')};
  ${font.regular}
  font-size: 15px;
  color: ${color.textDarkest};
  background: #fff;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus {
    outline: none;
    border-color: ${props => (props.hasError ? color.danger : color.borderInputFocus)};
    box-shadow: 0 0 0 3px
      ${props => (props.hasError ? mixin.rgba(color.danger, 0.14) : mixin.rgba(color.primary, 0.16))};
  }

  &::placeholder {
    color: ${color.textLight};
  }

  &:disabled {
    background: ${color.backgroundLightest};
    cursor: not-allowed;
  }
`;

export const PasswordToggle = styled.button`
  position: absolute;
  top: 0;
  right: 8px;
  height: 44px;
  padding: 0 6px;
  display: inline-flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  ${font.medium}
  font-size: 12px;
  color: ${color.textMedium};
  border-radius: ${radius.sm};

  &:hover {
    color: ${color.primary};
  }
  &:focus-visible {
    outline: none;
    box-shadow: ${shadow.focus};
  }
`;

export const FieldError = styled.p`
  ${font.regular}
  font-size: 12px;
  color: ${color.danger};
  margin-top: 5px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 46px;
  margin-top: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  background: linear-gradient(135deg, ${color.primary} 0%, ${color.accent} 100%);
  color: #fff;
  border: none;
  border-radius: ${radius.lg};
  ${font.bold}
  font-size: 15px;
  cursor: pointer;
  transition: filter 0.15s, transform 0.1s, box-shadow 0.15s;

  &:hover:not(:disabled) {
    filter: brightness(1.05);
    box-shadow: 0 8px 18px -6px ${mixin.rgba(color.primary, 0.6)};
  }
  &:focus-visible {
    outline: none;
    box-shadow: ${shadow.focus};
  }
  &:active:not(:disabled) {
    transform: scale(0.99);
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
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
  &:focus-visible {
    outline: 2px solid ${color.borderInputFocus};
    outline-offset: 2px;
    border-radius: 2px;
  }
`;
