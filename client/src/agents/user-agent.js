import ApiUtility from "../utilities/api-utility";
import InsightRoutes from "../common/api-routes";

const UserAgent = {
  async getUsers() {
    const users = await ApiUtility.getRequest(InsightRoutes.getUsers);
    return users;
  },

  async saveUser(request) {
    await ApiUtility.postRequest(InsightRoutes.postAddUser, request);
  }
};

export default UserAgent;
