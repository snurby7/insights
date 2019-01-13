export const YnabDataUtility = {
  format(value: number): string {
    return `${value < 0 ? '-' : ''}$${(Math.abs(value) / 1000).toFixed(2)}`;
  },
};
