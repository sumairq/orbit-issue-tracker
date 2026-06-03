import {
  IssueStatus,
  IssueStatusCopy,
  IssuePriority,
  IssuePriorityCopy,
} from 'shared/constants/issues';

// Board column / priority order — the table mirrors the board's ordering.
export const STATUS_ORDER = [
  IssueStatus.BACKLOG,
  IssueStatus.SELECTED,
  IssueStatus.INPROGRESS,
  IssueStatus.DONE,
];

export const PRIORITY_ORDER = [
  IssuePriority.HIGHEST,
  IssuePriority.HIGH,
  IssuePriority.MEDIUM,
  IssuePriority.LOW,
  IssuePriority.LOWEST,
];

// Sentinel for the "no assignee" filter/group bucket.
export const UNASSIGNED = 'none';

export const statusOptions = STATUS_ORDER.map(value => ({ value, label: IssueStatusCopy[value] }));
export const priorityOptions = PRIORITY_ORDER.map(value => ({
  value,
  label: IssuePriorityCopy[value],
}));

export const userOptions = users => users.map(user => ({ value: user.id, label: user.name }));

export const mapUsersById = users => new Map(users.map(user => [user.id, user]));

export const issueAssignees = (issue, usersById) =>
  (issue.userIds || []).map(id => usersById.get(id)).filter(Boolean);

const primaryAssigneeName = (issue, usersById) => {
  const id = (issue.userIds || [])[0];
  if (!id) return '';
  const user = usersById.get(id);
  return user ? user.name : '';
};

/* Filtering — all conditions AND together. -------------------------------- */
export const filterIssues = (issues, { search, status, assignee, priority }) =>
  issues.filter(issue => {
    if (search && !issue.title.toLowerCase().includes(search.trim().toLowerCase())) return false;
    if (status.length && !status.includes(issue.status)) return false;
    if (priority.length && !priority.includes(issue.priority)) return false;
    if (assignee.length) {
      const ids = (issue.userIds || []).map(String);
      const matchesUser = ids.some(id => assignee.includes(id));
      const matchesNone = assignee.includes(UNASSIGNED) && ids.length === 0;
      if (!matchesUser && !matchesNone) return false;
    }
    return true;
  });

/* Sorting ----------------------------------------------------------------- */
const comparators = {
  title: (a, b) => a.title.localeCompare(b.title),
  status: (a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status),
  // Priority is '5'..'1' (highest..lowest); compare numerically.
  priority: (a, b) => Number(a.priority) - Number(b.priority),
  updated: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
  assignee: (a, b, usersById) =>
    primaryAssigneeName(a, usersById).localeCompare(primaryAssigneeName(b, usersById)),
};

export const sortIssues = (issues, sort, dir, usersById) => {
  const compare = comparators[sort] || comparators.updated;
  const factor = dir === 'desc' ? -1 : 1;
  return [...issues].sort((a, b) => factor * compare(a, b, usersById));
};

/* Grouping ---------------------------------------------------------------- */
// Returns [{ key, label, filter, issues }]. `filter` is the URL-filter slice a
// group header could deep-link to (unused for now but handy). Empty groups are
// dropped. Assignee grouping uses the issue's PRIMARY assignee (first id), so a
// multi-assignee issue appears once.
export const groupIssues = (issues, group, usersById) => {
  if (group === 'none') {
    return [{ key: 'all', label: null, issues }];
  }

  if (group === 'status') {
    return STATUS_ORDER.map(value => ({
      key: value,
      label: IssueStatusCopy[value],
      issues: issues.filter(issue => issue.status === value),
    })).filter(g => g.issues.length);
  }

  if (group === 'priority') {
    return PRIORITY_ORDER.map(value => ({
      key: value,
      label: IssuePriorityCopy[value],
      issues: issues.filter(issue => issue.priority === value),
    })).filter(g => g.issues.length);
  }

  // assignee
  const buckets = new Map();
  issues.forEach(issue => {
    const id = (issue.userIds || [])[0];
    const key = id ? String(id) : UNASSIGNED;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(issue);
  });

  return [...buckets.entries()]
    .map(([key, groupedIssues]) => ({
      key,
      label:
        key === UNASSIGNED
          ? 'Unassigned'
          : (usersById.get(Number(key)) || { name: `User ${key}` }).name,
      issues: groupedIssues,
    }))
    .sort((a, b) => {
      if (a.key === UNASSIGNED) return 1;
      if (b.key === UNASSIGNED) return -1;
      return a.label.localeCompare(b.label);
    });
};
