export const UrlFormatUtility = {
  /**
   * @description Takes a string and searches for matching keys form the object prefixed with :<string>
   * @param {string} matchString A string of the format 'my-test/:replace/waffles'
   * @param {*} keyObject An object that would have { replace : 'spicy' } inside of it
   * @returns {string} A replaced string like 'my-test/spicy/waffles'
   */
  formatUrl(matchString: string, keyObject: any): string {
    Object.keys(keyObject).forEach(key => {
      matchString = matchString.replace(`:${key}`, keyObject[key]);
    });
    return matchString;
  },
};
