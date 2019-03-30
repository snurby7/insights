import { utils } from 'ynab';

const currencyDecimalDigits = 2;

export const FormatUtility = {
  currencyFormat<T>(data: T, key: keyof T): T {
      const amount = data[key] as unknown as number;
      data[key] = <T[keyof T]><any>utils.convertMilliUnitsToCurrencyAmount(amount, currencyDecimalDigits);
      return data;
  },
};