import { describe, expect, test } from "vitest";
import { fizzBuzz } from "../src/fizzbuzz";

describe("FizzBuzz", () => {
  test("should display 'Fizz' if number can be divided by 3", () => {
    const results = fizzBuzz(3);
    expect(results[2]).toEqual("Fizz");
  });

  test("should display 'Buzz' if number can be divided by 5", () => {
    const results = fizzBuzz(5);
    expect(results[4]).toEqual("Buzz");
  });

  test("should display 'FizzBuzz' if number can be divided by 3 and 5 at the same time", () => {
    const results = fizzBuzz(15);
    expect(results[14]).toEqual("FizzBuzz");
  });

  test("should display number if number can't be divided by 3 or 5", () => {
    const results = fizzBuzz(4);
    expect(results[3]).toEqual("4");
  });

  // Edges cases
  test("should return empty array if n is 0", () => {
    const results = fizzBuzz(0);
    expect(results).toEqual([]);
  });

  test("should return correct array length", () => {
    const results = fizzBuzz(10);
    expect(results).toHaveLength(10);
  });

  test("should support custom rules", () => {
    const customRules = [
      { divisor: 2, word: "Foo" },
      { divisor: 7, word: "Bar" },
    ];
    const results = fizzBuzz(14, customRules);
    expect(results[1]).toEqual("Foo"); // 2
    expect(results[6]).toEqual("Bar"); // 7
    expect(results[13]).toEqual("FooBar"); // 14 divisible par 2 et 7
  });

  test("should return '1' as first element", () => {
    const results = fizzBuzz(1);
    expect(results[0]).toEqual("1");
  });

  // input validation

  test("should throw if n is negative", () => {
    expect(() => fizzBuzz(-1)).toThrow("n must be a positive number");
  });

  test("should throw if n is not an integer", () => {
    expect(() => fizzBuzz(1.5)).toThrow("n must be an integer");
  });

  // rules validation

  test("should throw if a rule has divisor 0", () => {
    expect(() => fizzBuzz(10, [{ divisor: 0, word: "Test" }])).toThrow(
      "divisor cannot be 0",
    );
  });
});
