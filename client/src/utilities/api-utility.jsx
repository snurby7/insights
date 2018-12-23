const urlFormatter = require("url");

const ApiUtility = {
  async getRequest(route, query) {
    route += urlFormatter.format({ query });
    const response = await fetch(route);
    const result = await response.json();
    return result;
  },
  async postRequest(route, data) {
    const response = await fetch(route, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
  }
};

export default ApiUtility;
