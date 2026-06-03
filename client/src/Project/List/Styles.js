import styled, { css, keyframes } from 'styled-components';

import {
  color,
  font,
  mixin,
  spacing,
  radius,
  shadow,
  issueStatusColors,
  issueStatusBackgroundColors,
} from 'shared/utils/styles';
import { Button } from 'shared/components';

export const Page = styled.div`
  padding-bottom: 40px;
`;

export const PageHeader = styled.div`
  margin: 6px 0 18px;
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
  margin-top: 2px;
`;

/* Filter bar -------------------------------------------------------------- */

export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${spacing.md};
  margin-bottom: ${spacing.md};
`;

export const SearchInputWrap = styled.div`
  width: 240px;
  max-width: 100%;
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ControlLabel = styled.span`
  ${font.medium}
  ${font.size(12.5)}
  color: ${color.textMedium};
`;

export const FilterSelectWrap = styled.div`
  min-width: 150px;
`;

export const GroupSelectWrap = styled.div`
  min-width: 130px;
`;

export const ClearAll = styled.button`
  ${mixin.link(color.textMedium)}
  ${font.size(12.5)}
`;

/* Table ------------------------------------------------------------------- */

export const TableScroll = styled.div`
  overflow: auto;
  max-height: calc(100vh - 240px);
  background: #fff;
  border: 1px solid ${color.borderLightest};
  border-radius: ${radius.xl};
  box-shadow: ${shadow.sm};
  ${mixin.customScrollbar()}
`;

export const Table = styled.table`
  width: 100%;
  min-width: 760px;
  border-collapse: separate;
  border-spacing: 0;
  ${font.size(13.5)}
`;

export const Th = styled.th`
  position: sticky;
  top: 0;
  z-index: 2;
  background: ${color.backgroundLightest};
  text-align: left;
  white-space: nowrap;
  padding: 10px 16px;
  border-bottom: 1px solid ${color.borderLightest};
  ${font.medium}
  ${font.size(12)}
  color: ${color.textMedium};
  text-transform: uppercase;
  letter-spacing: 0.4px;
  user-select: none;

  ${props =>
    props.$sortable &&
    css`
      cursor: pointer;
      &:hover {
        color: ${color.textDark};
      }
    `}

  ${props =>
    props.$sticky &&
    css`
      left: 0;
      z-index: 3;
      box-shadow: 1px 0 0 ${color.borderLightest};
    `}

  ${props => props.$center && 'text-align: center;'}
`;

export const SortArrow = styled.span`
  display: inline-block;
  margin-left: 5px;
  color: ${color.primary};
  ${font.size(11)}
`;

export const Tr = styled.tr`
  --row-bg: #fff;
  &:hover {
    --row-bg: ${color.backgroundLight};
  }
  ${props =>
    props.$selected &&
    css`
      --row-bg: ${color.backgroundLightPrimary};
      &:hover {
        --row-bg: ${color.backgroundLightPrimary};
      }
    `}
`;

export const Td = styled.td`
  background: var(--row-bg);
  padding: 9px 16px;
  border-bottom: 1px solid ${color.borderLightest};
  color: ${color.textDark};
  vertical-align: middle;

  ${props =>
    props.$sticky &&
    css`
      position: sticky;
      left: 0;
      z-index: 1;
      box-shadow: 1px 0 0 ${color.borderLightest};
    `}

  ${props => props.$center && 'text-align: center;'}
`;

export const CheckboxCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 16px;
  height: 16px;
  accent-color: ${color.primary};
  cursor: pointer;
  flex: 0 0 auto;
`;

export const TitleCellInner = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

export const TitleLink = styled.span`
  ${font.medium}
  color: ${color.textDarkest};
  cursor: pointer;
  ${mixin.truncateText}
  max-width: 360px;

  &:hover {
    color: ${color.primary};
    text-decoration: underline;
  }
`;

export const StatusChip = styled.span`
  ${props => mixin.tag(issueStatusBackgroundColors[props.$status], issueStatusColors[props.$status])}
  height: 24px;
  text-transform: uppercase;
  white-space: nowrap;
  ${font.size(11.5)}
`;

export const PriorityCell = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${color.textDark};
  white-space: nowrap;
`;

export const AssigneeCell = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const UpdatedText = styled.span`
  color: ${color.textMedium};
  white-space: nowrap;
`;

/* Inline-edit select tuned for table density */
export const InlineSelectWrap = styled.div`
  display: inline-flex;
  max-width: 100%;
`;

/* Group header row -------------------------------------------------------- */

export const GroupHeaderRow = styled.tr`
  cursor: pointer;
`;

export const GroupHeaderCell = styled.td`
  background: ${color.backgroundLight};
  border-bottom: 1px solid ${color.borderLightest};
  padding: 0;
`;

export const GroupHeaderInner = styled.div`
  position: sticky;
  left: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  ${font.bold}
  ${font.size(12.5)}
  color: ${color.textDark};

  i {
    transition: transform 0.12s;
    transform: rotate(${props => (props.$collapsed ? -90 : 0)}deg);
    color: ${color.textMedium};
  }
`;

export const GroupCount = styled.span`
  ${font.medium}
  color: ${color.textLight};
`;

/* Bulk-action bar --------------------------------------------------------- */

export const BulkBar = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${spacing.md};
  margin-bottom: ${spacing.md};
  padding: 10px 16px;
  background: ${color.backgroundDarkPrimary};
  border-radius: ${radius.lg};
  box-shadow: ${shadow.md};
  color: #fff;
`;

export const BulkInfo = styled.span`
  ${font.bold}
  ${font.size(13.5)}
  color: #fff;
`;

export const BulkSelectWrap = styled.div`
  min-width: 170px;
  background: #fff;
  border-radius: ${radius.md};
  padding: 0 4px;
`;

export const BulkClear = styled.button`
  ${mixin.clickable}
  ${font.medium}
  ${font.size(13)}
  color: ${mixin.rgba('#fff', 0.85)};
  margin-left: auto;
  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;

/* Skeleton ---------------------------------------------------------------- */

const shimmer = keyframes`
  0% { background-position: -700px 0; }
  100% { background-position: 700px 0; }
`;

export const SkeletonBar = styled.div`
  height: ${props => props.height || 14}px;
  width: ${props => props.width || '100%'};
  border-radius: ${radius.sm};
  background: linear-gradient(
    90deg,
    ${color.backgroundLight} 25%,
    ${color.backgroundMedium} 37%,
    ${color.backgroundLight} 63%
  );
  background-size: 700px 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/* Empty / error states ---------------------------------------------------- */

export const StateCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 64px 24px;
  background: #fff;
  border: 1px solid ${color.borderLightest};
  border-radius: ${radius.xl};
  box-shadow: ${shadow.sm};
`;

export const StateBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin-bottom: 18px;
  border-radius: 18px;
  background: ${props =>
    props.$muted
      ? color.backgroundLight
      : `linear-gradient(135deg, ${color.primary} 0%, ${color.accent} 100%)`};
  i {
    color: ${props => (props.$muted ? color.textLight : '#fff')};
  }
`;

export const StateTitle = styled.h2`
  ${font.bold}
  ${font.size(19)}
  color: ${color.textDarkest};
  margin-bottom: 6px;
`;

export const StateText = styled.p`
  ${font.regular}
  ${font.size(14.5)}
  color: ${color.textMedium};
  max-width: 380px;
  line-height: 1.5;
  margin-bottom: 20px;
`;

export const StateAction = styled(Button)`
  height: 40px;
`;
