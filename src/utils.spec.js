// @flow
import { distinctValuesOfProp, flattenObjectOfArrays } from "./utils";

describe("utils", () => {
  describe("distinctValuesOfProp", () => {
    test("returns unique values of objects in an array by property name", () => {
      const list = [
        { currency: "BTC" },
        { currency: "RPL" },
        { currency: "ETH" },
        { currency: "BTC" },
        { currency: "ETH" },
        { currency: "ETH" }
      ];

      expect(distinctValuesOfProp("currency", list)).toEqual([
        "BTC",
        "RPL",
        "ETH"
      ]);
    });
  });

  describe("flattenObjectOfArrays", () => {
    const objectOfArrays = {
      foo: [{ id: 1 }],
      bar: [{ id: 2 }, { id: 3 }, { id: 4 }],
      baz: [{ id: 5 }, { id: 6 }]
    };

    test("merges all the arrays assigned to all properties and adds an origin to each", () => {
      expect(flattenObjectOfArrays(objectOfArrays)).toEqual([
        { id: 1, origin: "foo" },
        { id: 2, origin: "bar" },
        { id: 3, origin: "bar" },
        { id: 4, origin: "bar" },
        { id: 5, origin: "baz" },
        { id: 6, origin: "baz" }
      ]);
    });
  });
});
