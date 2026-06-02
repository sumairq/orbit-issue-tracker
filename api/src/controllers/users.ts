import { catchErrors } from 'errors';
import { updateEntity } from 'utils/typeorm';
import { User } from 'entities';

export const getCurrentUser = catchErrors((req, res) => {
  res.respond({ currentUser: req.currentUser });
});

export const updateCurrentUser = catchErrors(async (req, res) => {
  const updatedUser = await updateEntity(User, req.currentUser.id, req.body);
  res.respond({ currentUser: updatedUser });
});
