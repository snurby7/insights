const urlFormatter = require("url");

const ApiUtility = {
  async getRequest(route, query) {
    route += urlFormatter.format({ query });
    const response = await fetch(route).catch(error => {
      console.log(error);
    });
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
    }).catch(error => {
      console.log(error);
    });
    const result = await response.json();
    return result;
  },
  async deleteRequest(route, data) {
    const response = await fetch(route, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).catch(error => {
      console.log(error);
    });
    return await response.json();
  }
};

export default ApiUtility;
