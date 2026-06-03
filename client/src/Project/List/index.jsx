import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import api from 'shared/utils/api';
import useApi from 'shared/hooks/api';
import { updateArrayItemById } from 'shared/utils/javascript';
import { createQueryParamModalHelpers } from 'shared/utils/queryParamModal';
import { Breadcrumbs, Icon } from 'shared/components';

import useViewState from './useViewState';
import { filterIssues, sortIssues, groupIssues, mapUsersById } from './utils';
import FilterBar from './FilterBar';
import Table from './Table';
import BulkBar from './BulkBar';
import Skeleton from './Skeleton';
import {
  Page,
  PageHeader,
  PageTitle,
  PageSubtitle,
  StateCard,
  StateBadge,
  StateTitle,
  StateText,
  StateAction,
} from './Styles';

// New-field-aware sort defaults: most-useful direction when a column is first
// clicked. (Date/priority read best high→low; text/status/assignee A→Z.)
const DEFAULT_DESC = ['updated', 'priority'];

const issueCreateModal = createQueryParamModalHelpers('issue-create');

const ProjectList = () => {
  const navigate = useNavigate();

  // Owns its read of the active board — instant from the warm `/project` cache,
  // but still surfaces real loading/error states. `setLocalData` writes back to
  // the shared cache so inline/bulk edits also reflect on the board.
  const [{ data, error, isLoading, setLocalData }] = useApi.get('/project');

  const { view, setView, clearFilters, isFiltered } = useViewState();
  const [selectedIds, setSelectedIds] = useState(() => new Set());

  const project = data && data.project;
  const issues = useMemo(() => (project ? project.issues : []), [project]);
  const users = useMemo(() => (project ? project.users : []), [project]);
  const usersById = useMemo(() => mapUsersById(users), [users]);

  const filtered = useMemo(() => filterIssues(issues, view), [issues, view]);
  const sorted = useMemo(() => sortIssues(filtered, view.sort, view.dir, usersById), [
    filtered,
    view.sort,
    view.dir,
    usersById,
  ]);
  const groups = useMemo(() => groupIssues(sorted, view.group, usersById), [
    sorted,
    view.group,
    usersById,
  ]);

  // --- persistence (mirrors the board's optimistic update path) -----------
  const updateLocalProjectIssues = (issueId, updatedFields) =>
    setLocalData(currentData => ({
      project: {
        ...currentData.project,
        issues: updateArrayItemById(currentData.project.issues, issueId, updatedFields),
      },
    }));

  const updateIssue = (issue, updatedFields) =>
    api.optimisticUpdate(`/issues/${issue.id}`, {
      updatedFields,
      currentFields: issue,
      setLocalData: fields => updateLocalProjectIssues(issue.id, fields),
    });

  const handleUpdateStatus = (issue, status) => updateIssue(issue, { status });

  // `userIds` is a read-only RelationId — assignee changes must send the `users`
  // relation, exactly like the board's IssueDetails does.
  const handleUpdateAssignee = (issue, userIds) =>
    updateIssue(issue, { userIds, users: userIds.map(id => usersById.get(id)).filter(Boolean) });

  // --- selection ----------------------------------------------------------
  const toggleSelect = issueId =>
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(issueId)) next.delete(issueId);
      else next.add(issueId);
      return next;
    });

  const toggleSelectAll = (ids, checked) =>
    setSelectedIds(prev => {
      const next = new Set(prev);
      ids.forEach(id => (checked ? next.add(id) : next.delete(id)));
      return next;
    });

  const clearSelection = () => setSelectedIds(new Set());

  const selectedIssues = issues.filter(issue => selectedIds.has(issue.id));
  const bulkSetStatus = status => selectedIssues.forEach(issue => handleUpdateStatus(issue, status));
  const bulkSetAssignee = userIds =>
    selectedIssues.forEach(issue => handleUpdateAssignee(issue, userIds));

  // --- sorting ------------------------------------------------------------
  const handleSortChange = field => {
    if (field === view.sort) {
      setView({ dir: view.dir === 'asc' ? 'desc' : 'asc' });
    } else {
      setView({ sort: field, dir: DEFAULT_DESC.includes(field) ? 'desc' : 'asc' });
    }
  };

  const openIssue = issueId => navigate(`/project/board/issues/${issueId}`);

  // --- render -------------------------------------------------------------
  const header = (
    <PageHeader>
      <Breadcrumbs items={['Projects', project ? project.name : '…', 'List']} />
      <PageTitle>List</PageTitle>
      <PageSubtitle>Find, filter, and update issues across this board.</PageSubtitle>
    </PageHeader>
  );

  if (isLoading) {
    return (
      <Page>
        {header}
        <Skeleton />
      </Page>
    );
  }

  if (error) {
    return (
      <Page>
        {header}
        <StateCard>
          <StateBadge>
            <Icon type="bug" size={28} />
          </StateBadge>
          <StateTitle>Couldn’t load issues</StateTitle>
          <StateText>
            Something went wrong while loading this board. Please refresh the page or try again in a
            moment.
          </StateText>
        </StateCard>
      </Page>
    );
  }

  // Empty board — no issues at all (distinct from "no filter match").
  if (issues.length === 0) {
    return (
      <Page>
        {header}
        <StateCard>
          <StateBadge>
            <Icon type="issues" size={30} />
          </StateBadge>
          <StateTitle>No issues yet</StateTitle>
          <StateText>
            This board doesn’t have any issues yet. Create your first issue and it’ll show up here.
          </StateText>
          <StateAction variant="primary" icon="plus" onClick={issueCreateModal.open}>
            Create issue
          </StateAction>
        </StateCard>
      </Page>
    );
  }

  const selectedCount = selectedIds.size;

  return (
    <Page>
      {header}

      <FilterBar
        view={view}
        setView={setView}
        clearFilters={clearFilters}
        isFiltered={isFiltered}
        users={users}
      />

      {selectedCount > 0 && (
        <BulkBar
          count={selectedCount}
          users={users}
          onSetStatus={bulkSetStatus}
          onSetAssignee={bulkSetAssignee}
          onClear={clearSelection}
        />
      )}

      {filtered.length === 0 ? (
        // Valid board, but the active filters match nothing — visually distinct
        // from the empty-board state, with a one-click escape hatch.
        <StateCard>
          <StateBadge $muted>
            <Icon type="search" size={28} />
          </StateBadge>
          <StateTitle>No issues match these filters</StateTitle>
          <StateText>Try removing a filter or broadening your search.</StateText>
          <StateAction variant="secondary" onClick={clearFilters}>
            Clear filters
          </StateAction>
        </StateCard>
      ) : (
        <Table
          groups={groups}
          sort={view.sort}
          dir={view.dir}
          onSortChange={handleSortChange}
          selectedIds={selectedIds}
          onToggleSelect={toggleSelect}
          onToggleSelectAll={toggleSelectAll}
          users={users}
          usersById={usersById}
          onUpdateStatus={handleUpdateStatus}
          onUpdateAssignee={handleUpdateAssignee}
          onOpenIssue={openIssue}
        />
      )}
    </Page>
  );
};

export default ProjectList;
