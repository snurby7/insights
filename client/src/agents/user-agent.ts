import { InsightRoutes } from '../common/api-routes';
import { IUser } from '../contracts/user.interface';
import ApiUtility from '../utilities/api-utility';

const UserAgent = {
  getUsers(budgetId: string): Promise<IUser[]> {
    return ApiUtility.getRequest(InsightRoutes.users, {budgetId});
  },
  deleteUser(userId: string): Promise<void> {
    return ApiUtility.deleteRequest(InsightRoutes.users, {userId});
  },
  updateUser(user: IUser): Promise<void> {
    return ApiUtility.postRequest(InsightRoutes.users, user);
  },
  saveUser(request: IUser): Promise<void> {
    return ApiUtility.postRequest(InsightRoutes.addUser, request);
  }
};
export default UserAgent;
