import { defaultRules } from "./rules";
import type { Rule } from "./types";

export const fizzBuzz = (n: number, rules: Rule[] = defaultRules) => {
  // Validation input
  if (n < 0) throw new Error("n must be a positive number"); // ex : si n=-1
  if (n % 1 !== 0) throw new Error("n must be an integer"); // ex : si n=1.5

  // Validation rules
  if (rules.some((rule) => rule.divisor === 0)) {
    throw new Error("divisor cannot be 0");
  }

  const output: string[] = [];

  for (let num = 1; num <= n; num++) {
    // Les règles qui matchent sont concaténées dans l'ordre (ex: 15 → "FizzBuzz")
    // Si aucune règle ne matche, on retourne le nombre tel quel
    const words = rules
      .filter((rule) => num % rule.divisor === 0)
      .map((rule) => rule.word)
      .join("");

    output.push(words || String(num));
  }

  return output;
};
