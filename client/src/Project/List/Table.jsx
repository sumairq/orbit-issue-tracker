import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'shared/components';

import Row from './Row';
import {
  TableScroll,
  Table,
  Th,
  SortArrow,
  Checkbox,
  CheckboxCell,
  GroupHeaderRow,
  GroupHeaderCell,
  GroupHeaderInner,
  GroupCount,
} from './Styles';

const COLUMNS = [
  { field: 'title', label: 'Title', sticky: true },
  { field: 'status', label: 'Status' },
  { field: 'assignee', label: 'Assignee' },
  { field: 'priority', label: 'Priority' },
  // TODO: Labels column — needs an `Issue.labels` field (does not exist today).
  // TODO: Due date column — needs an `Issue.dueDate` field (only created/updated exist).
  { field: 'updated', label: 'Updated' },
];

const propTypes = {
  groups: PropTypes.array.isRequired,
  sort: PropTypes.string.isRequired,
  dir: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  selectedIds: PropTypes.instanceOf(Set).isRequired,
  onToggleSelect: PropTypes.func.isRequired,
  onToggleSelectAll: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  usersById: PropTypes.object.isRequired,
  onUpdateStatus: PropTypes.func.isRequired,
  onUpdateAssignee: PropTypes.func.isRequired,
  onOpenIssue: PropTypes.func.isRequired,
};

// Header checkbox that also reflects the indeterminate (some-but-not-all) state.
const SelectAllCheckbox = ({ checked, indeterminate, onChange }) => (
  <Checkbox
    checked={checked}
    onChange={onChange}
    aria-label="Select all visible issues"
    ref={el => {
      if (el) el.indeterminate = indeterminate;
    }}
  />
);
SelectAllCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  indeterminate: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

const ProjectListTable = ({
  groups,
  sort,
  dir,
  onSortChange,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  users,
  usersById,
  onUpdateStatus,
  onUpdateAssignee,
  onOpenIssue,
}) => {
  const [collapsed, setCollapsed] = useState(() => new Set());

  const toggleGroup = key =>
    setCollapsed(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  // Visible = rows in groups that aren't collapsed (drives select-all-visible).
  const visibleIds = useMemo(
    () =>
      groups
        .filter(group => !collapsed.has(group.key))
        .flatMap(group => group.issues.map(issue => issue.id)),
    [groups, collapsed],
  );

  const selectedVisible = visibleIds.filter(id => selectedIds.has(id)).length;
  const allSelected = visibleIds.length > 0 && selectedVisible === visibleIds.length;
  const someSelected = selectedVisible > 0 && !allSelected;

  return (
    <TableScroll>
      <Table>
        <thead>
          <tr>
            {COLUMNS.map(col => (
              <Th
                key={col.field}
                $sticky={col.sticky}
                $sortable
                onClick={() => onSortChange(col.field)}
              >
                {col.sticky ? (
                  <CheckboxCell>
                    <SelectAllCheckbox
                      checked={allSelected}
                      indeterminate={someSelected}
                      onChange={e => {
                        e.stopPropagation();
                        onToggleSelectAll(visibleIds, !allSelected);
                      }}
                      onClick={e => e.stopPropagation()}
                    />
                    <span>{col.label}</span>
                  </CheckboxCell>
                ) : (
                  col.label
                )}
                {sort === col.field && <SortArrow>{dir === 'asc' ? '▲' : '▼'}</SortArrow>}
              </Th>
            ))}
          </tr>
        </thead>

        <tbody>
          {groups.map(group => {
            const isCollapsed = collapsed.has(group.key);
            return (
              <React.Fragment key={group.key}>
                {group.label !== null && (
                  <GroupHeaderRow onClick={() => toggleGroup(group.key)}>
                    <GroupHeaderCell colSpan={COLUMNS.length}>
                      <GroupHeaderInner $collapsed={isCollapsed}>
                        <Icon type="chevron-down" size={18} />
                        {group.label}
                        <GroupCount>{group.issues.length}</GroupCount>
                      </GroupHeaderInner>
                    </GroupHeaderCell>
                  </GroupHeaderRow>
                )}
                {!isCollapsed &&
                  group.issues.map(issue => (
                    <Row
                      key={issue.id}
                      issue={issue}
                      users={users}
                      usersById={usersById}
                      isSelected={selectedIds.has(issue.id)}
                      onToggleSelect={onToggleSelect}
                      onUpdateStatus={onUpdateStatus}
                      onUpdateAssignee={onUpdateAssignee}
                      onOpenIssue={onOpenIssue}
                    />
                  ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </Table>
    </TableScroll>
  );
};

ProjectListTable.propTypes = propTypes;

export default ProjectListTable;
