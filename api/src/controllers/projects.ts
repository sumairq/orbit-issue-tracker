import { Project, User } from 'entities';
import { ProjectCategory } from 'constants/projects';
import { catchErrors, BadUserInputError, EntityNotFoundError } from 'errors';
import { findEntityOrThrow, createEntity, updateEntity } from 'utils/typeorm';
import { issuePartial } from 'serializers/issues';

// Returns the user's currently active board (with users + issues), or
// `{ project: null }` when the user has no board yet (new-account onboarding).
export const getProjectWithUsersAndIssues = catchErrors(async (req, res) => {
  if (!req.currentUser.projectId) {
    res.respond({ project: null });
    return;
  }

  const project = await findEntityOrThrow(Project, {
    where: {
      id: req.currentUser.projectId,
    },
    relations: ['users', 'issues'],
  });
  res.respond({
    project: {
      ...project,
      issues: project.issues.map(issuePartial),
    },
  });
});

// Lists every board the current user is a member of (for the board switcher).
export const list = catchErrors(async (req, res) => {
  const user = await findEntityOrThrow(User, {
    where: { id: req.currentUser.id },
    relations: ['projects'],
  });
  const projects = [...user.projects].sort((a, b) => a.id - b.id);
  res.respond({ projects });
});

// Creates a board owned by the current user, adds them as a member, and makes
// it their active board. New boards start with no issues; the four columns are
// rendered from the IssueStatus constants, so nothing needs seeding here.
export const create = catchErrors(async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    throw new BadUserInputError({ fields: { name: 'This field is required' } });
  }

  const project = await createEntity(Project, {
    name,
    description: description || null,
    category: ProjectCategory.SOFTWARE,
    users: [req.currentUser],
  });

  req.currentUser.project = project;
  await req.currentUser.save();

  res.respond({ project });
});

// Switches the current user's active board (membership-checked).
export const switchBoard = catchErrors(async (req, res) => {
  const { projectId } = req.body;

  const user = await findEntityOrThrow(User, {
    where: { id: req.currentUser.id },
    relations: ['projects'],
  });

  const target = user.projects.find((project) => project.id === Number(projectId));
  if (!target) {
    throw new EntityNotFoundError('Project');
  }

  user.project = target;
  await user.save();

  res.respond({ project: target });
});

export const update = catchErrors(async (req, res) => {
  const project = await updateEntity(Project, req.currentUser.projectId, req.body);
  res.respond({ project });
});
