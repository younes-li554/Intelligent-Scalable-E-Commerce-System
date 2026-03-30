import { User } from '../modules/users/users.entity';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}