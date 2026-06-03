import React from 'react';
import PropTypes from 'prop-types';

import { InputDebounced, Select } from 'shared/components';

import { statusOptions, priorityOptions, UNASSIGNED } from './utils';
import {
  FilterBar,
  SearchInputWrap,
  FilterSelectWrap,
  GroupSelectWrap,
  ControlGroup,
  ControlLabel,
  Spacer,
  ClearAll,
} from './Styles';

const propTypes = {
  view: PropTypes.object.isRequired,
  setView: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
  isFiltered: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
};

// Assignee filter values are kept as strings (incl. the 'none' sentinel) so the
// Select doesn't numeric-coerce the Unassigned bucket. Status/priority values
// are already strings.
const ProjectListFilterBar = ({ view, setView, clearFilters, isFiltered, users }) => {
  const assigneeOptions = [
    { value: UNASSIGNED, label: 'Unassigned' },
    ...users.map(user => ({ value: String(user.id), label: user.name })),
  ];

  const groupOptions = [
    { value: 'none', label: 'No grouping' },
    { value: 'status', label: 'Status' },
    { value: 'assignee', label: 'Assignee' },
    { value: 'priority', label: 'Priority' },
  ];

  return (
    <FilterBar data-testid="list-filters">
      <SearchInputWrap>
        <InputDebounced
          icon="search"
          placeholder="Search issues by title"
          value={view.search}
          onChange={value => setView({ search: value })}
        />
      </SearchInputWrap>

      <FilterSelectWrap>
        <Select
          isMulti
          placeholder="Status"
          name="filter-status"
          value={view.status}
          options={statusOptions}
          onChange={value => setView({ status: value })}
        />
      </FilterSelectWrap>

      <FilterSelectWrap>
        <Select
          isMulti
          placeholder="Assignee"
          name="filter-assignee"
          value={view.assignee}
          options={assigneeOptions}
          onChange={value => setView({ assignee: value })}
        />
      </FilterSelectWrap>

      <FilterSelectWrap>
        <Select
          isMulti
          placeholder="Priority"
          name="filter-priority"
          value={view.priority}
          options={priorityOptions}
          onChange={value => setView({ priority: value })}
        />
      </FilterSelectWrap>

      {isFiltered && <ClearAll onClick={clearFilters}>Clear all</ClearAll>}

      <Spacer />

      <ControlGroup>
        <ControlLabel>Group by</ControlLabel>
        <GroupSelectWrap>
          <Select
            withClearValue={false}
            name="group-by"
            value={view.group}
            options={groupOptions}
            onChange={value => setView({ group: value })}
          />
        </GroupSelectWrap>
      </ControlGroup>
    </FilterBar>
  );
};

ProjectListFilterBar.propTypes = propTypes;

export default ProjectListFilterBar;
