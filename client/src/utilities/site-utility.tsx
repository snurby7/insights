export const SiteUtility = {
  accumulate(values: number[]) {
    return values.reduce((accumulator, currentValue) => accumulator + currentValue);
  },
};
