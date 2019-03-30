export const YnabDataUtility = {
  /**
   * @param {number} amount This just turns it into US Dollars now.
   * @returns {string} The format USD version
   */
  format(amount: number): string {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  },
};
