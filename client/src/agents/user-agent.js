import ApiUtility from "../utilities/api-utility";
import InsightRoutes from "../common/api-routes";

const UserAgent = {
  async getUsers() {
    const users = await ApiUtility.getRequest(InsightRoutes.users);
    return users;
  },

  async deleteUser(userId) {
    const result = await ApiUtility.deleteRequest(InsightRoutes.users, {userId});
    return result;
  },

  async saveUser(request) {
    await ApiUtility.postRequest(InsightRoutes.postAddUser, request);
  }
};

export default UserAgent;
