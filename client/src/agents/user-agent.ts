import { IUser } from '../contracts';
import { InsightRoutes } from '../routes/api-routes';
import { ApiUtility } from '../utilities';

const UserAgent = {
  getUsers(budgetId: string): Promise<IUser[]> {
    return ApiUtility.getRequest(InsightRoutes.users, { budgetId });
  },
  deleteUser(userId: string): Promise<void> {
    return ApiUtility.deleteRequest(InsightRoutes.users, { userId });
  },
  updateUser(user: IUser): Promise<void> {
    return ApiUtility.postRequest(InsightRoutes.users, user);
  },
  saveUser(request: IUser): Promise<void> {
    return ApiUtility.postRequest(InsightRoutes.addUser, request);
  },
};
export default UserAgent;
