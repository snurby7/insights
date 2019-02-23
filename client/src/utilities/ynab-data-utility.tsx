export const YnabDataUtility = {
  /**
   * @param {number} amount This is scaled up by 1000 so need to divide by that amount
   * @returns {string} The format USD version
   */
  format(amount: number): string {
    const scaledAmount = amount / 1000;
    return scaledAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  },
};
