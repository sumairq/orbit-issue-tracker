import styled, { keyframes } from 'styled-components';

import { color, font, mixin, spacing, radius, shadow } from 'shared/utils/styles';

export const Page = styled.div`
  padding-bottom: 40px;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  margin: 6px 0 22px;
`;

export const PageTitle = styled.h1`
  ${font.black}
  ${font.size(24)}
  color: ${color.textDarkest};
  letter-spacing: -0.4px;
`;

export const PageSubtitle = styled.p`
  ${font.regular}
  ${font.size(14)}
  color: ${color.textMedium};
`;

/* Stat cards row -------------------------------------------------------- */

export const StatRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${spacing.lg};
  margin-bottom: ${spacing.xl};
`;

export const StatCard = styled.div`
  background: #fff;
  border: 1px solid ${color.borderLightest};
  border-radius: ${radius.xl};
  box-shadow: ${shadow.sm};
  padding: 18px 20px;
`;

export const StatLabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;

export const StatDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: ${radius.pill};
  background: ${props => props.color || color.primary};
  flex: 0 0 auto;
`;

export const StatLabel = styled.span`
  ${font.medium}
  ${font.size(13)}
  color: ${color.textMedium};
  ${mixin.truncateText}
`;

export const StatValue = styled.div`
  ${font.black}
  ${font.size(30)}
  color: ${color.textDarkest};
  line-height: 1;
`;

/* Charts grid ----------------------------------------------------------- */

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: ${spacing.xl};
`;

export const ChartCard = styled.div`
  background: #fff;
  border: 1px solid ${color.borderLightest};
  border-radius: ${radius.xl};
  box-shadow: ${shadow.sm};
  padding: 22px 24px 18px;
  min-width: 0;

  ${props =>
    props.fullWidth &&
    `
    grid-column: 1 / -1;
  `}
`;

export const ChartTitle = styled.h2`
  ${font.bold}
  ${font.size(15)}
  color: ${color.textDarkest};
  margin-bottom: 4px;
`;

export const ChartHint = styled.p`
  ${font.regular}
  ${font.size(12.5)}
  color: ${color.textLight};
  margin-bottom: 16px;
`;

export const ChartBody = styled.div`
  width: 100%;
  height: ${props => props.height || 260}px;
`;

/* recharts tooltip --------------------------------------------------------
   Styled wrapper for the custom tooltip so it matches Orbit surfaces. */
export const TooltipBox = styled.div`
  background: ${color.textDarkest};
  color: #fff;
  border-radius: ${radius.md};
  padding: 8px 12px;
  box-shadow: ${shadow.md};
  ${font.size(12.5)}
`;

export const TooltipLabel = styled.div`
  ${font.bold}
  margin-bottom: 2px;
`;

export const TooltipValue = styled.div`
  ${font.regular}
  color: ${mixin.rgba('#fff', 0.85)};
`;

export const EmptyChart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  ${font.regular}
  ${font.size(13)}
  color: ${color.textLight};
`;

/* Empty state (board with no issues) ------------------------------------ */

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 72px 24px;
  background: #fff;
  border: 1px solid ${color.borderLightest};
  border-radius: ${radius.xl};
  box-shadow: ${shadow.sm};
`;

export const EmptyBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  margin-bottom: 22px;
  border-radius: 20px;
  background: linear-gradient(135deg, ${color.primary} 0%, ${color.accent} 100%);
  i {
    color: #fff;
  }
`;

export const EmptyTitle = styled.h2`
  ${font.bold}
  ${font.size(20)}
  color: ${color.textDarkest};
  margin-bottom: 8px;
`;

export const EmptyText = styled.p`
  ${font.regular}
  ${font.size(15)}
  color: ${color.textMedium};
  max-width: 380px;
  line-height: 1.5;
`;

/* Error state ----------------------------------------------------------- */

export const ErrorState = styled(EmptyState)``;

/* Loading skeleton ------------------------------------------------------ */

const shimmer = keyframes`
  0% { background-position: -800px 0; }
  100% { background-position: 800px 0; }
`;

export const Skeleton = styled.div`
  border-radius: ${props => props.radius || radius.md};
  height: ${props => props.height || 16}px;
  width: ${props => props.width || '100%'};
  background: linear-gradient(
    90deg,
    ${color.backgroundLight} 25%,
    ${color.backgroundMedium} 37%,
    ${color.backgroundLight} 63%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const SkeletonCard = styled.div`
  background: #fff;
  border: 1px solid ${color.borderLightest};
  border-radius: ${radius.xl};
  box-shadow: ${shadow.sm};
  padding: 22px 24px;
`;
