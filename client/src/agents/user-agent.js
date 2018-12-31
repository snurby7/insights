import ApiUtility from "../utilities/api-utility";
import InsightRoutes from "../common/api-routes";

const UserAgent = {
  async getUsers(budgetId) {
    const users = await ApiUtility.getRequest(InsightRoutes.users, {budgetId});
    return users;
  },
  async deleteUser(userId) {
    const result = await ApiUtility.deleteRequest(InsightRoutes.users, {userId});
    return result;
  },
  async updateUser(user) {
    const result = await ApiUtility.postRequest(InsightRoutes.users, user);
    return result;
  },
  async saveUser(request) {
    await ApiUtility.postRequest(InsightRoutes.addUser, request);
  }
};
export default UserAgent;
