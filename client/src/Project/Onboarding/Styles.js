import styled from 'styled-components';

import { color, font, mixin } from 'shared/utils/styles';
import { Button } from 'shared/components';

export const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${color.backgroundLightest};
`;

export const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 28px;
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const BrandName = styled.span`
  ${font.bold}
  ${font.size(20)}
  color: ${color.textDarkest};
  letter-spacing: -0.3px;
`;

export const LogoutLink = styled.button`
  ${mixin.clickable}
  ${font.medium}
  ${font.size(14)}
  color: ${color.textMedium};
  &:hover {
    color: ${color.textDark};
  }
`;

export const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 24px 80px;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 520px;
  text-align: center;
`;

export const IconBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 88px;
  height: 88px;
  margin-bottom: 28px;
  border-radius: 24px;
  background: linear-gradient(135deg, ${color.primary} 0%, ${color.accent} 100%);
  color: #fff;
  i {
    color: #fff;
  }
`;

export const Title = styled.h1`
  ${font.black}
  ${font.size(28)}
  color: ${color.textDarkest};
  margin-bottom: 12px;
`;

export const Description = styled.p`
  ${font.regular}
  ${font.size(16)}
  line-height: 1.5;
  color: ${color.textMedium};
  max-width: 440px;
  margin: 0 auto 32px;
`;

export const CreateButton = styled(Button)`
  height: 44px;
  padding: 0 22px;
  ${font.size(15)}
`;
