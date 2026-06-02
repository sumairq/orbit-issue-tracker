import { css } from 'styled-components';
import Color from 'color';

import { IssueType, IssueStatus, IssuePriority } from 'shared/constants/issues';

/**
 * Orbit design tokens — single source of truth.
 *
 * Direction "Orbit Indigo": indigo-600 brand, violet accent, cool slate
 * neutrals. Replaces the previous Atlassian-derived palette. Every key from
 * the original theme is preserved (only revalued) so existing styled-components
 * keep working; new scales (spacing/radius/shadow) are added below.
 */
export const color = {
  primary: '#4F46E5', // indigo-600 (brand)
  primaryDark: '#4338CA', // indigo-700 (hover/pressed)
  accent: '#7C3AED', // violet-600
  success: '#16A34A', // green-600
  danger: '#DC2626', // red-600
  warning: '#D97706', // amber-600
  secondary: '#F1F5F9', // slate-100 (subtle neutral fill)

  textDarkest: '#0F172A', // slate-900
  textDark: '#334155', // slate-700
  textMedium: '#64748B', // slate-500
  textLight: '#94A3B8', // slate-400
  textLink: '#4F46E5', // indigo-600

  backgroundDarkPrimary: '#1E1B4B', // deep indigo (left nav rail / brand surfaces)
  backgroundMedium: '#E2E8F0', // slate-200
  backgroundLight: '#F1F5F9', // slate-100
  backgroundLightest: '#F8FAFC', // slate-50 (app background)
  backgroundLightPrimary: '#E0E7FF', // indigo-100 (selected / hover brand tint)
  backgroundLightSuccess: '#DCFCE7', // green-100

  borderLightest: '#E2E8F0', // slate-200
  borderLight: '#CBD5E1', // slate-300
  borderInputFocus: '#6366F1', // indigo-500 (focus ring)
};

export const issueTypeColors = {
  [IssueType.TASK]: '#6366F1', // indigo-500
  [IssueType.BUG]: '#EF4444', // red-500
  [IssueType.STORY]: '#22C55E', // green-500
};

export const issuePriorityColors = {
  [IssuePriority.HIGHEST]: '#DC2626', // red-600
  [IssuePriority.HIGH]: '#EA580C', // orange-600
  [IssuePriority.MEDIUM]: '#D97706', // amber-600
  [IssuePriority.LOW]: '#16A34A', // green-600
  [IssuePriority.LOWEST]: '#22C55E', // green-500
};

export const issueStatusColors = {
  [IssueStatus.BACKLOG]: color.textDark,
  [IssueStatus.INPROGRESS]: '#fff',
  [IssueStatus.SELECTED]: color.textDark,
  [IssueStatus.DONE]: '#fff',
};

export const issueStatusBackgroundColors = {
  [IssueStatus.BACKLOG]: color.backgroundMedium,
  [IssueStatus.INPROGRESS]: color.primary,
  [IssueStatus.SELECTED]: color.backgroundMedium,
  [IssueStatus.DONE]: color.success,
};

export const sizes = {
  appNavBarLeftWidth: 64,
  secondarySideBarWidth: 230,
  minViewportWidth: 1000,
};

// 4px-based spacing scale (px strings, ready to drop into template literals).
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
};

// Border-radius scale. Cards/inputs/buttons default to `lg` for a modern feel;
// small chips/tags use `sm`/`md`; avatars/pills use `pill`.
export const radius = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  pill: '999px',
};

// Layered, cool-neutral shadows (replaces the old Atlassian navy tint).
export const shadow = {
  xs: '0 1px 2px rgba(16, 24, 40, 0.06)',
  sm: '0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06)',
  md: '0 4px 8px -2px rgba(16, 24, 40, 0.1), 0 2px 4px -2px rgba(16, 24, 40, 0.06)',
  lg: '0 12px 16px -4px rgba(16, 24, 40, 0.08), 0 4px 6px -2px rgba(16, 24, 40, 0.03)',
  focus: '0 0 0 3px rgba(79, 70, 229, 0.35)', // indigo focus ring
};

export const zIndexValues = {
  modal: 1000,
  dropdown: 101,
  navLeft: 100,
};

const fontStack = '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

export const font = {
  regular: `font-family: ${fontStack}; font-weight: 400;`,
  medium: `font-family: ${fontStack}; font-weight: 500;`,
  bold: `font-family: ${fontStack}; font-weight: 600;`,
  black: `font-family: ${fontStack}; font-weight: 800;`,
  size: size => `font-size: ${size}px;`,
};

export const mixin = {
  darken: (colorValue, amount) =>
    Color(colorValue)
      .darken(amount)
      .string(),
  lighten: (colorValue, amount) =>
    Color(colorValue)
      .lighten(amount)
      .string(),
  rgba: (colorValue, opacity) =>
    Color(colorValue)
      .alpha(opacity)
      .string(),
  boxShadowMedium: css`
    box-shadow: ${shadow.lg};
  `,
  boxShadowDropdown: css`
    box-shadow: ${shadow.md};
  `,
  truncateText: css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  clickable: css`
    cursor: pointer;
    user-select: none;
  `,
  hardwareAccelerate: css`
    transform: translateZ(0);
  `,
  cover: css`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  `,
  placeholderColor: colorValue => css`
    ::-webkit-input-placeholder {
      color: ${colorValue} !important;
      opacity: 1 !important;
    }
    :-moz-placeholder {
      color: ${colorValue} !important;
      opacity: 1 !important;
    }
    ::-moz-placeholder {
      color: ${colorValue} !important;
      opacity: 1 !important;
    }
    :-ms-input-placeholder {
      color: ${colorValue} !important;
      opacity: 1 !important;
    }
  `,
  scrollableY: css`
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  `,
  customScrollbar: ({ width = 8, background = color.backgroundMedium } = {}) => css`
    &::-webkit-scrollbar {
      width: ${width}px;
    }
    &::-webkit-scrollbar-track {
      background: none;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 99px;
      background: ${background};
    }
  `,
  backgroundImage: imageURL => css`
    background-image: url("${imageURL}");
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: ${color.backgroundLight};
  `,
  link: (colorValue = color.textLink) => css`
    cursor: pointer;
    color: ${colorValue};
    ${font.medium}
    &:hover, &:visited, &:active {
      color: ${colorValue};
    }
    &:hover {
      text-decoration: underline;
    }
  `,
  tag: (background = color.backgroundMedium, colorValue = color.textDarkest) => css`
    display: inline-flex;
    align-items: center;
    height: 24px;
    padding: 0 8px;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    color: ${colorValue};
    background: ${background};
    ${font.bold}
    ${font.size(12)}
    i {
      margin-left: 4px;
    }
  `,
};
