import urlFormatter from 'url';

import { UrlFormatUtility } from './url-format-utility';

export const ApiUtility = {
  /**
   * @description A wrapper around the fetch operation in case my needs ever hange
   *
   * @template T The Object that the query is of the type of
   * @param {string} route The route that needs to be hit
   * @param {T} [query] The optional query object
   * @param {boolean} [useFormatter=false] Whether or not to use the urlFormatter format method
   * @returns A promise of type any
   */
  async getRequest<T extends any>(route: string, query?: T, useFormatter: boolean = false) {
    if (useFormatter) {
      route += urlFormatter.format({ query });
    }
    if (query && !useFormatter) {
      route = UrlFormatUtility.formatUrl(route, query);
    }
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
