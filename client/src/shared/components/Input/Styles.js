import styled, { css } from 'styled-components';

import { color, font, radius, shadow } from 'shared/utils/styles';
import Icon from 'shared/components/Icon';

export const StyledInput = styled.div`
  position: relative;
  display: inline-block;
  height: 32px;
  width: 100%;
`;

export const InputElement = styled.input`
  height: 100%;
  width: 100%;
  padding: 0 10px;
  border-radius: ${radius.lg};
  border: 1px solid ${color.borderLight};
  color: ${color.textDarkest};
  background: ${color.backgroundLightest};
  transition: background 0.1s;
  ${font.regular}
  ${font.size(15)}
  ${props => props.hasIcon && 'padding-left: 32px;'}
  &:hover {
    background: ${color.backgroundLight};
  }
  &:focus {
    background: #fff;
    border: 1px solid ${color.borderInputFocus};
    box-shadow: ${shadow.focus};
  }
  ${props =>
    props.invalid &&
    css`
      &,
      &:focus {
        border: 1px solid ${color.danger};
        box-shadow: none;
      }
    `}
`;

export const StyledIcon = styled(Icon)`
  position: absolute;
  top: 8px;
  left: 8px;
  pointer-events: none;
  color: ${color.textMedium};
`;
