import ApiUtility from "../utilities/api-utility";
import InsightRoutes from "../common/api-routes";

const UserAgent = {
  async getUsers(budgetId) {
    const users = await ApiUtility.getRequest(InsightRoutes.users, {budgetId});
    return users;
  },
  deleteUser(userId) {
    return ApiUtility.deleteRequest(InsightRoutes.users, {userId});
  },
  updateUser(user) {
    return ApiUtility.postRequest(InsightRoutes.users, user);
  },
  saveUser(request) {
    return ApiUtility.postRequest(InsightRoutes.addUser, request);
  }
};
export default UserAgent;
