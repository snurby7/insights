import urlFormatter from 'url';

const ApiUtility = {
  async getRequest<T extends any>(route: string, query?: T) {
    route += urlFormatter.format({ query });
    const response = (await fetch(route).catch(error => {
      alert(error);
    })) as Response;
    const result = await response.json();
    return result;
  },
  async postRequest<T extends any>(route: string, data: T) {
    const response = (await fetch(route, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch(error => {
      alert(error);
    })) as Response;
    const result = await response.json();
    return result;
  },
  async deleteRequest<T extends any>(route: string, data: T) {
    const response = (await fetch(route, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(error => {
      alert(error);
    })) as Response;
    return await response.json();
  },
};

export default ApiUtility;
