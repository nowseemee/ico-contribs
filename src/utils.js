// @flow
export const sumOfProp = (propName: string, list: {}[]): number =>
  list.reduce((acc: number, item: { [*]: number }) => acc + item[propName], 0);

export const distinctValuesOfProp = (propName: string, list: {}[]): *[] =>
  list.reduce(
    (acc: *[], item: { [*]: number | string }) =>
      acc.includes(item[propName]) ? acc : [...acc, item[propName]],
    []
  );
