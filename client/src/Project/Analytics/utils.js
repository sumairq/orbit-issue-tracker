import { groupBy } from 'lodash';
import moment from 'moment';

import { color, issuePriorityColors } from 'shared/utils/styles';
import {
  IssueStatus,
  IssueStatusCopy,
  IssuePriority,
  IssuePriorityCopy,
} from 'shared/constants/issues';

// Column order mirrors the Kanban board so the two views stay in sync.
const STATUS_ORDER = [
  IssueStatus.BACKLOG,
  IssueStatus.SELECTED,
  IssueStatus.INPROGRESS,
  IssueStatus.DONE,
];

const PRIORITY_ORDER = [
  IssuePriority.HIGHEST,
  IssuePriority.HIGH,
  IssuePriority.MEDIUM,
  IssuePriority.LOW,
  IssuePriority.LOWEST,
];

/**
 * On-brand colors for the by-status chart.
 *
 * The board's status *badges* reuse a single slate for both Backlog and
 * Selected (issueStatusBackgroundColors), which would collide in a chart. So we
 * keep the two colors that DO carry meaning on the board — In progress = indigo
 * primary, Done = success green — and give Backlog/Selected distinct, on-brand
 * indigo/slate tints so all four slices stay readable.
 */
export const statusChartColors = {
  [IssueStatus.BACKLOG]: color.textLight, // slate-400 (not started)
  [IssueStatus.SELECTED]: '#818CF8', // indigo-400 (queued)
  [IssueStatus.INPROGRESS]: color.primary, // indigo-600 (active) — matches board
  [IssueStatus.DONE]: color.success, // green-600 — matches board
};

export const statusBreakdown = issues =>
  STATUS_ORDER.map(status => ({
    key: status,
    label: IssueStatusCopy[status],
    value: issues.filter(issue => issue.status === status).length,
    fill: statusChartColors[status],
  }));

export const priorityBreakdown = issues =>
  PRIORITY_ORDER.map(priority => ({
    key: priority,
    label: IssuePriorityCopy[priority],
    value: issues.filter(issue => issue.priority === priority).length,
    fill: issuePriorityColors[priority],
  }));

/**
 * Workload per person. An issue can have multiple assignees, so it counts
 * toward each (the bucket sum can exceed the issue count for multi-assignee
 * boards — expected). Issues with no assignee land in their own "Unassigned"
 * bucket. Names are resolved from the project's user list.
 */
export const assigneeBreakdown = (issues, users) => {
  const nameById = new Map(users.map(user => [user.id, user.name]));
  const counts = new Map();

  issues.forEach(issue => {
    const ids = issue.userIds || [];
    if (ids.length === 0) {
      counts.set('__unassigned__', (counts.get('__unassigned__') || 0) + 1);
      return;
    }
    ids.forEach(id => {
      const name = nameById.get(id) || `User ${id}`;
      counts.set(name, (counts.get(name) || 0) + 1);
    });
  });

  return [...counts.entries()]
    .map(([key, value]) => ({
      key,
      label: key === '__unassigned__' ? 'Unassigned' : key,
      value,
      isUnassigned: key === '__unassigned__',
    }))
    .sort((a, b) => b.value - a.value);
};

/**
 * Issues created over time, bucketed by day and accumulated, using the real
 * `createdAt` timestamp. Returns a point per distinct creation day with the
 * per-day count and the running total.
 */
export const createdOverTime = issues => {
  if (!issues.length) return [];

  const byDay = groupBy(issues, issue =>
    moment(issue.createdAt)
      .startOf('day')
      .valueOf(),
  );

  const days = Object.keys(byDay)
    .map(Number)
    .sort((a, b) => a - b);

  let total = 0;
  return days.map(timestamp => {
    const created = byDay[timestamp].length;
    total += created;
    return {
      date: moment(timestamp).format('MMM D'),
      created,
      total,
    };
  });
};
