import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
};

const defaultProps = {
  className: undefined,
  size: 28,
  color: undefined,
};

const Logo = ({ className, size, color }) => (
  <span className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width={size} height={size}>
      <defs>
        <linearGradient id="orbit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color || '#7C4DFF'} />
          <stop offset="100%" stopColor={color || '#5C6BC0'} />
        </linearGradient>
      </defs>
      {/* Orbit ring */}
      <ellipse
        cx="20"
        cy="20"
        rx="18"
        ry="7"
        fill="none"
        stroke={color || 'url(#orbit-grad)'}
        strokeWidth="2.5"
        transform="rotate(-35 20 20)"
        opacity="0.85"
      />
      {/* Planet */}
      <circle cx="20" cy="20" r="5.5" fill={color || 'url(#orbit-grad)'} />
      {/* Satellite dot on orbit */}
      <circle cx="34" cy="16" r="2" fill={color || '#7C4DFF'} opacity="0.7" />
    </svg>
  </span>
);

Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;

export default Logo;
