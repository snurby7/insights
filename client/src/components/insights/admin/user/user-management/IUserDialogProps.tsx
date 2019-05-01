import { IUser } from '../../../../../contracts';

export interface IUserDialogProps {
  budgetId: string;
  open: boolean;
  user?: IUser;
  onClose: (refresh?: boolean) => void;
}
