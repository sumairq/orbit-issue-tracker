import styled, { css } from 'styled-components';

import { color, font, radius, shadow } from 'shared/utils/styles';

export const StyledTextarea = styled.div`
  display: inline-block;
  width: 100%;
  textarea {
    overflow-y: hidden;
    width: 100%;
    padding: 8px 12px 9px;
    border-radius: ${radius.lg};
    border: 1px solid ${color.borderLight};
    color: ${color.textDarkest};
    background: ${color.backgroundLightest};
    ${font.regular}
    ${font.size(15)}
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
        }
      `}
  }
`;
