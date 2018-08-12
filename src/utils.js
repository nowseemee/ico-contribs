// @flow
import { add, divide } from "mathjs";
import type { Store } from "./reducers";
export const distinctValuesOfProp = (
  propName: string,
  list: { [*]: * }[]
): *[] =>
  list.reduce(
    (acc: *[], item: { [*]: string }) =>
      acc.includes(item[propName]) ? acc : [...acc, item[propName]],
    []
  );

export const flattenObjectOfArrays = (objectOfArrays: {
  [*]: {}[]
}): { [*]: * }[] =>
  Object.keys(objectOfArrays).reduce(
    (acc, key: string) => [
      ...acc,
      ...objectOfArrays[key].map(item => ({ ...item, origin: key }))
    ],
    []
  );

const CURRENCY_UNIT_MAP = {
  ETH: 1000000000000000000,
  BTC: 100000000,
  LTC: 100000000
};

const getContributions = (store: Store) => store.contributors.body;

export const getPhases = (store: Store): string[] =>
  Object.keys(getContributions(store));

export const getSeries = (store: Store): { name: string, data: number[] }[] => {
  const data = flattenObjectOfArrays(getContributions(store));

  return distinctValuesOfProp("currency", data).map(currency => ({
    name: currency,
    data: getPhases(store).map(phase =>
      Math.round(
        data
          .filter(item => item.origin === phase && item.currency === currency)
          .map(
            ({ value }): number => divide(value, CURRENCY_UNIT_MAP[currency])
          )
          .reduce((acc, val): number => add(acc, val), 0)
      )
    )
  }));
};
