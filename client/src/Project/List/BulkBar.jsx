import React from 'react';
import PropTypes from 'prop-types';

import { Select } from 'shared/components';

import { statusOptions } from './utils';
import { BulkBar, BulkInfo, BulkSelectWrap, BulkClear } from './Styles';

const propTypes = {
  count: PropTypes.number.isRequired,
  users: PropTypes.array.isRequired,
  onSetStatus: PropTypes.func.isRequired,
  onSetAssignee: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

// Bulk edits apply to every selected row. Assignee uses a fresh (uncontrolled)
// Select so picking a value applies it and resets; clearing all = unassign.
const ProjectListBulkBar = ({ count, users, onSetStatus, onSetAssignee, onClear }) => {
  const userSelectOptions = users.map(user => ({ value: user.id, label: user.name }));

  return (
    <BulkBar data-testid="list-bulk-bar">
      <BulkInfo>
        {count} issue{count === 1 ? '' : 's'} selected
      </BulkInfo>

      <BulkSelectWrap>
        <Select
          name="bulk-status"
          placeholder="Set status…"
          options={statusOptions}
          onChange={status => onSetStatus(status)}
        />
      </BulkSelectWrap>

      <BulkSelectWrap>
        <Select
          isMulti
          name="bulk-assignee"
          placeholder="Set assignees…"
          options={userSelectOptions}
          onChange={userIds => onSetAssignee(userIds)}
        />
      </BulkSelectWrap>

      <BulkClear onClick={onClear}>Clear selection</BulkClear>
    </BulkBar>
  );
};

ProjectListBulkBar.propTypes = propTypes;

export default ProjectListBulkBar;
