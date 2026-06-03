import React, { useMemo } from 'react';

import useApi from 'shared/hooks/api';
import { Breadcrumbs, Icon } from 'shared/components';

import { statusBreakdown, priorityBreakdown, assigneeBreakdown, createdOverTime } from './utils';
import { StatusChart, PriorityChart, AssigneeChart, CreatedOverTimeChart } from './Charts';
import AnalyticsSkeleton from './Skeleton';
import {
  Page,
  PageHeader,
  PageTitle,
  PageSubtitle,
  StatRow,
  StatCard,
  StatLabelRow,
  StatDot,
  StatLabel,
  StatValue,
  ChartsGrid,
  ChartCard,
  ChartTitle,
  ChartHint,
  ChartBody,
  EmptyState,
  EmptyBadge,
  EmptyTitle,
  EmptyText,
  ErrorState,
} from './Styles';

const Analytics = () => {
  // Re-reads the active board. On normal navigation this resolves instantly from
  // the warm `/project` cache (already fetched by Project/index.jsx), but owning
  // the request lets the view render genuine loading/error states.
  const [{ data, error, isLoading }] = useApi.get('/project');

  const project = data && data.project;
  const issues = useMemo(() => (project ? project.issues : []), [project]);
  const users = useMemo(() => (project ? project.users : []), [project]);

  const status = useMemo(() => statusBreakdown(issues), [issues]);
  const priority = useMemo(() => priorityBreakdown(issues), [issues]);
  const assignees = useMemo(() => assigneeBreakdown(issues, users), [issues, users]);
  const timeline = useMemo(() => createdOverTime(issues), [issues]);

  return (
    <Page>
      <Breadcrumbs items={['Projects', project ? project.name : '…', 'Analytics']} />
      <PageHeader>
        <div>
          <PageTitle>Analytics</PageTitle>
          <PageSubtitle>An overview of the issues on this board.</PageSubtitle>
        </div>
      </PageHeader>

      {renderBody({ isLoading, error, issues, status, priority, assignees, timeline })}
    </Page>
  );
};

const renderBody = ({ isLoading, error, issues, status, priority, assignees, timeline }) => {
  if (isLoading) return <AnalyticsSkeleton />;

  if (error) {
    return (
      <ErrorState>
        <EmptyBadge>
          <Icon type="bug" size={30} />
        </EmptyBadge>
        <EmptyTitle>Couldn’t load analytics</EmptyTitle>
        <EmptyText>
          Something went wrong while loading this board’s data. Please refresh the page or try again
          in a moment.
        </EmptyText>
      </ErrorState>
    );
  }

  if (issues.length === 0) {
    return (
      <EmptyState>
        <EmptyBadge>
          <Icon type="reports" size={32} />
        </EmptyBadge>
        <EmptyTitle>No data to show yet</EmptyTitle>
        <EmptyText>
          This board doesn’t have any issues yet. Create a few issues on the Kanban board and your
          analytics will appear here automatically.
        </EmptyText>
      </EmptyState>
    );
  }

  const total = issues.length;

  return (
    <>
      <StatRow>
        <StatCard>
          <StatLabelRow>
            <StatLabel>Total issues</StatLabel>
          </StatLabelRow>
          <StatValue>{total}</StatValue>
        </StatCard>
        {status.map(item => (
          <StatCard key={item.key}>
            <StatLabelRow>
              <StatDot color={item.fill} />
              <StatLabel>{item.label}</StatLabel>
            </StatLabelRow>
            <StatValue>{item.value}</StatValue>
          </StatCard>
        ))}
      </StatRow>

      <ChartsGrid>
        <ChartCard>
          <ChartTitle>Issues by status</ChartTitle>
          <ChartHint>Distribution across the board’s columns.</ChartHint>
          <ChartBody>
            <StatusChart data={status} />
          </ChartBody>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Issues by priority</ChartTitle>
          <ChartHint>How work is weighted from Lowest to Highest.</ChartHint>
          <ChartBody>
            <PriorityChart data={priority} />
          </ChartBody>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Issues by assignee</ChartTitle>
          <ChartHint>Workload per person; unassigned issues bucketed separately.</ChartHint>
          <ChartBody height={Math.max(220, assignees.length * 44)}>
            <AssigneeChart data={assignees} />
          </ChartBody>
        </ChartCard>

        <ChartCard fullWidth>
          <ChartTitle>Issues created over time</ChartTitle>
          <ChartHint>Cumulative issues created, by day.</ChartHint>
          <ChartBody>
            <CreatedOverTimeChart data={timeline} />
          </ChartBody>
        </ChartCard>
      </ChartsGrid>
    </>
  );
};

export default Analytics;
