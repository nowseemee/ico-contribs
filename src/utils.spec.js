// @flow
import { sumOfProp, distinctValuesOfProp } from "./utils";

describe("utils", () => {
  describe("sumOfProp", () => {
    test("sums up objects in an array by property name", () => {
      const list = [
        { addsUpToAHundred: 10, addUpToTwoHundred: 20 },
        { addsUpToAHundred: 40, addUpToTwoHundred: 80 },
        { addsUpToAHundred: 50, addUpToTwoHundred: 100 }
      ];

      expect(sumOfProp("addsUpToAHundred", list)).toEqual(100);
    });
  });
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
});
