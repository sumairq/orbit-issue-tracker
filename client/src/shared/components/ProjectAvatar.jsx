import React from 'react';
import PropTypes from 'prop-types';

import { radius } from 'shared/utils/styles';

const propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};

const defaultProps = {
  className: undefined,
  size: 40,
};

// Orbit brand tile — indigo→violet gradient with the orbit glyph (planet +
// ring), consistent with <Logo>. Brand gradient stops mirror color.primary /
// color.accent.
const ProjectAvatar = ({ className, size }) => (
  <span className={className}>
    <svg
      width={size}
      height={size}
      style={{ borderRadius: radius.lg }}
      viewBox="0 0 128 128"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="orbit-avatar-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <rect width="128" height="128" fill="url(#orbit-avatar-grad)" />
      <ellipse
        cx="64"
        cy="64"
        rx="46"
        ry="20"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="6"
        opacity="0.9"
        transform="rotate(-35 64 64)"
      />
      <circle cx="64" cy="64" r="15" fill="#FFFFFF" />
      <circle cx="100" cy="46" r="5.5" fill="#FFFFFF" opacity="0.85" />
    </svg>
  </span>
);

ProjectAvatar.propTypes = propTypes;
ProjectAvatar.defaultProps = defaultProps;

export default ProjectAvatar;
