import { IUser } from '../../contracts/user.interface';

export interface IUserDialogProps {
  budgetId: string;
  open: boolean;
  user?: IUser;
  onClose: (refresh?: boolean) => void;
}
