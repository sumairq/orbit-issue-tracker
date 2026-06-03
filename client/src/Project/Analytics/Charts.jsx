import React from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  Legend,
} from 'recharts';

import { color } from 'shared/utils/styles';

import { TooltipBox, TooltipLabel, TooltipValue, EmptyChart } from './Styles';

const axisTick = { fill: color.textMedium, fontSize: 12 };
const gridStroke = color.borderLightest;

const CustomTooltip = ({ active, payload, label, suffix }) => {
  if (!active || !payload || !payload.length) return null;
  const title = label || payload[0].name;
  // Each chart shows a single series, so the value line alone is clearest.
  const value = payload[0].value;
  return (
    <TooltipBox>
      <TooltipLabel>{title}</TooltipLabel>
      <TooltipValue>{`${value} ${suffix}${value === 1 ? '' : 's'}`}</TooltipValue>
    </TooltipBox>
  );
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string,
  suffix: PropTypes.string,
};
CustomTooltip.defaultProps = {
  active: false,
  payload: [],
  label: undefined,
  suffix: 'issue',
};

/* By status — donut ----------------------------------------------------- */
export const StatusChart = ({ data, onSelect }) => {
  const hasData = data.some(d => d.value > 0);
  if (!hasData) return <EmptyChart>No issues to chart yet.</EmptyChart>;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="label"
          innerRadius="55%"
          outerRadius="80%"
          paddingAngle={2}
          stroke="none"
          style={onSelect ? { cursor: 'pointer' } : undefined}
          onClick={(_, index) => onSelect && onSelect(data[index])}
        >
          {data.map(entry => (
            <Cell key={entry.key} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          iconSize={9}
          formatter={value => <span style={{ color: color.textMedium, fontSize: 12.5 }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

/* By priority — vertical bars ------------------------------------------- */
export const PriorityChart = ({ data, onSelect }) => {
  const hasData = data.some(d => d.value > 0);
  if (!hasData) return <EmptyChart>No issues to chart yet.</EmptyChart>;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
        <XAxis dataKey="label" tick={axisTick} tickLine={false} axisLine={{ stroke: gridStroke }} />
        <YAxis allowDecimals={false} tick={axisTick} tickLine={false} axisLine={false} width={32} />
        <Tooltip cursor={{ fill: color.backgroundLight }} content={<CustomTooltip />} />
        <Bar
          dataKey="value"
          name="Issues"
          radius={[6, 6, 0, 0]}
          maxBarSize={48}
          style={onSelect ? { cursor: 'pointer' } : undefined}
          onClick={(_, index) => onSelect && onSelect(data[index])}
        >
          {data.map(entry => (
            <Cell key={entry.key} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

/* By assignee — horizontal bars ----------------------------------------- */
export const AssigneeChart = ({ data, onSelect }) => {
  if (!data.length) return <EmptyChart>No issues to chart yet.</EmptyChart>;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 4, right: 16, left: 8, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} horizontal={false} />
        <XAxis
          type="number"
          allowDecimals={false}
          tick={axisTick}
          tickLine={false}
          axisLine={{ stroke: gridStroke }}
        />
        <YAxis
          type="category"
          dataKey="label"
          width={110}
          tick={axisTick}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip cursor={{ fill: color.backgroundLight }} content={<CustomTooltip />} />
        <Bar
          dataKey="value"
          name="Issues"
          radius={[0, 6, 6, 0]}
          maxBarSize={28}
          style={onSelect ? { cursor: 'pointer' } : undefined}
          onClick={(_, index) => onSelect && onSelect(data[index])}
        >
          {data.map(entry => (
            <Cell key={entry.key} fill={entry.isUnassigned ? color.textLight : color.primary} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

/* Created over time — cumulative area ----------------------------------- */
export const CreatedOverTimeChart = ({ data }) => {
  if (!data.length) return <EmptyChart>No issues to chart yet.</EmptyChart>;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="orbitAreaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color.primary} stopOpacity={0.28} />
            <stop offset="100%" stopColor={color.primary} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
        <XAxis dataKey="date" tick={axisTick} tickLine={false} axisLine={{ stroke: gridStroke }} />
        <YAxis allowDecimals={false} tick={axisTick} tickLine={false} axisLine={false} width={32} />
        <Tooltip content={<CustomTooltip suffix="issue" />} />
        <Area
          type="monotone"
          dataKey="total"
          name="Total issues"
          stroke={color.primary}
          strokeWidth={2.5}
          fill="url(#orbitAreaFill)"
          dot={{ r: 3, fill: color.primary, strokeWidth: 0 }}
          activeDot={{ r: 5, fill: color.accent, strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const dataShape = PropTypes.arrayOf(PropTypes.object).isRequired;
StatusChart.propTypes = { data: dataShape, onSelect: PropTypes.func };
PriorityChart.propTypes = { data: dataShape, onSelect: PropTypes.func };
AssigneeChart.propTypes = { data: dataShape, onSelect: PropTypes.func };
CreatedOverTimeChart.propTypes = { data: dataShape };

StatusChart.defaultProps = { onSelect: undefined };
PriorityChart.defaultProps = { onSelect: undefined };
AssigneeChart.defaultProps = { onSelect: undefined };
