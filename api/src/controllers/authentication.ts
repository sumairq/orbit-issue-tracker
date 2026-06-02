import bcrypt from 'bcryptjs';
import { catchErrors, BadUserInputError } from 'errors';
import { signToken } from 'utils/authToken';
import { User } from 'entities';
import createAccount from 'database/createGuestAccount';

export const createGuestAccount = catchErrors(async (_req, res) => {
  const user = await createAccount();
  res.respond({
    authToken: signToken({ sub: user.id }),
  });
});

export const register = catchErrors(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadUserInputError({ fields: { name: !name ? 'Required' : undefined, email: !email ? 'Required' : undefined, password: !password ? 'Required' : undefined } });
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new BadUserInputError({ fields: { email: 'An account with this email already exists.' } });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = User.create({
    name,
    email,
    avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=5C6BC0&color=fff`,
    password: hashedPassword,
  });
  await user.save();

  res.respond({
    authToken: signToken({ sub: user.id }),
  });
});

export const login = catchErrors(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadUserInputError({ fields: { email: !email ? 'Required' : undefined, password: !password ? 'Required' : undefined } });
  }

  const user = await User.createQueryBuilder('user')
    .addSelect('user.password')
    .where('user.email = :email', { email })
    .getOne();

  if (!user || !user.password) {
    throw new BadUserInputError({ fields: { email: 'No account found with this email.' } });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new BadUserInputError({ fields: { password: 'Incorrect password.' } });
  }

  res.respond({
    authToken: signToken({ sub: user.id }),
  });
});
