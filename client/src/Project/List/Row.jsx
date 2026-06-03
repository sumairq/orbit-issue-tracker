import React from 'react';
import PropTypes from 'prop-types';

import { IssueStatusCopy, IssuePriorityCopy } from 'shared/constants/issues';
import { IssueTypeIcon, IssuePriorityIcon, Avatar, Select } from 'shared/components';

import { statusOptions } from './utils';
import {
  Tr,
  Td,
  CheckboxCell,
  Checkbox,
  TitleCellInner,
  TitleLink,
  StatusChip,
  AssigneeCell,
  PriorityCell,
  UpdatedText,
  InlineSelectWrap,
} from './Styles';
import { formatUpdated } from './dates';

const propTypes = {
  issue: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  usersById: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onToggleSelect: PropTypes.func.isRequired,
  onUpdateStatus: PropTypes.func.isRequired,
  onUpdateAssignee: PropTypes.func.isRequired,
  onOpenIssue: PropTypes.func.isRequired,
};

const ProjectListRow = ({
  issue,
  users,
  usersById,
  isSelected,
  onToggleSelect,
  onUpdateStatus,
  onUpdateAssignee,
  onOpenIssue,
}) => {
  const userSelectOptions = users.map(user => ({ value: user.id, label: user.name }));

  return (
    <Tr $selected={isSelected} data-testid="list-row">
      <Td $sticky>
        <CheckboxCell>
          <Checkbox
            checked={isSelected}
            onChange={() => onToggleSelect(issue.id)}
            aria-label={`Select ${issue.title}`}
          />
          <TitleCellInner>
            <IssueTypeIcon type={issue.type} />
            <TitleLink onClick={() => onOpenIssue(issue.id)}>{issue.title}</TitleLink>
          </TitleCellInner>
        </CheckboxCell>
      </Td>

      <Td>
        <InlineSelectWrap>
          <Select
            variant="empty"
            withClearValue={false}
            dropdownWidth={200}
            name={`status-${issue.id}`}
            value={issue.status}
            options={statusOptions}
            onChange={status => onUpdateStatus(issue, status)}
            renderValue={({ value: status }) => (
              <StatusChip $status={status}>{IssueStatusCopy[status]}</StatusChip>
            )}
            renderOption={({ value: status }) => (
              <StatusChip $status={status}>{IssueStatusCopy[status]}</StatusChip>
            )}
          />
        </InlineSelectWrap>
      </Td>

      <Td>
        <InlineSelectWrap>
          <Select
            isMulti
            variant="empty"
            dropdownWidth={240}
            placeholder="Unassigned"
            name={`assignee-${issue.id}`}
            value={issue.userIds}
            options={userSelectOptions}
            onChange={userIds => onUpdateAssignee(issue, userIds)}
            renderValue={({ value: userId }) => {
              const user = usersById.get(userId);
              return user ? (
                <AssigneeCell key={userId}>
                  <Avatar size={24} avatarUrl={user.avatarUrl} name={user.name} />
                </AssigneeCell>
              ) : null;
            }}
            renderOption={({ value: userId }) => {
              const user = usersById.get(userId);
              return user ? (
                <AssigneeCell>
                  <Avatar size={24} avatarUrl={user.avatarUrl} name={user.name} />
                  <span>{user.name}</span>
                </AssigneeCell>
              ) : null;
            }}
          />
        </InlineSelectWrap>
      </Td>

      <Td>
        <PriorityCell>
          <IssuePriorityIcon priority={issue.priority} />
          {IssuePriorityCopy[issue.priority]}
        </PriorityCell>
      </Td>

      <Td>
        <UpdatedText>{formatUpdated(issue.updatedAt)}</UpdatedText>
      </Td>
    </Tr>
  );
};

ProjectListRow.propTypes = propTypes;

export default ProjectListRow;
