import { useLocation, useNavigate } from 'react-router-dom';

import { queryStringToObject, objectToQueryString } from 'shared/utils/url';

const SORT_FIELDS = ['title', 'status', 'assignee', 'priority', 'updated'];
const GROUPS = ['none', 'status', 'assignee', 'priority'];

// URL query keys owned by this view. Anything else in the query string
// (e.g. `modal-issue-create`) is preserved untouched when we write.
const VIEW_KEYS = ['q', 'status', 'assignee', 'priority', 'sort', 'dir', 'group'];

export const defaultView = {
  search: '',
  status: [],
  assignee: [],
  priority: [],
  sort: 'updated',
  dir: 'desc',
  group: 'none',
};

const toArray = v => {
  if (v === undefined || v === null) return [];
  return Array.isArray(v) ? v : [v];
};

export const parseView = search => {
  const q = queryStringToObject(search);
  return {
    search: q.q || '',
    status: toArray(q.status),
    assignee: toArray(q.assignee),
    priority: toArray(q.priority),
    sort: SORT_FIELDS.includes(q.sort) ? q.sort : 'updated',
    dir: q.dir === 'asc' ? 'asc' : 'desc',
    group: GROUPS.includes(q.group) ? q.group : 'none',
  };
};

// `q.qs` builder — only writes non-default values so shared URLs stay clean.
const viewToQueryObject = (view, preserved) => {
  const obj = { ...preserved };
  if (view.search) obj.q = view.search;
  if (view.status.length) obj.status = view.status;
  if (view.assignee.length) obj.assignee = view.assignee;
  if (view.priority.length) obj.priority = view.priority;
  if (view.sort !== 'updated') obj.sort = view.sort;
  if (view.dir !== 'desc') obj.dir = view.dir;
  if (view.group !== 'none') obj.group = view.group;
  return obj;
};

const useViewState = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const view = parseView(location.search);

  const setView = updates => {
    const next = { ...view, ...updates };
    const existing = queryStringToObject(location.search);
    const preserved = Object.keys(existing)
      .filter(key => !VIEW_KEYS.includes(key))
      .reduce((acc, key) => ({ ...acc, [key]: existing[key] }), {});

    navigate(
      { pathname: location.pathname, search: objectToQueryString(viewToQueryObject(next, preserved)) },
      { replace: true },
    );
  };

  const clearFilters = () =>
    setView({ search: '', status: [], assignee: [], priority: [] });

  const isFiltered =
    !!view.search || view.status.length > 0 || view.assignee.length > 0 || view.priority.length > 0;

  return { view, setView, clearFilters, isFiltered };
};

export default useViewState;
