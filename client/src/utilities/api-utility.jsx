const urlFormatter = require('url')

const ApiUtility = {
    async getRequest(route, queryData, callback) {
        route += urlFormatter.format({query: queryData});
        const response = await fetch(route);
        const result = await response.json();
        callback(result)
    },
};

export default ApiUtility;