export const FormatUtility = {
  /**
   * @param {number} amount This just turns it into US Dollars string equivalent.
   * @returns {string} The format USD version (i.e. $1.23)
   */
  toUSD(amount: number): string {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  },
};
