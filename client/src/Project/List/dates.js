import moment from 'moment';

// Compact relative time for the Updated column (e.g. "2 days ago"). Uses the
// real updatedAt timestamp — see CLAUDE.md: there is no due-date field.
export const formatUpdated = value => moment(value).fromNow();
