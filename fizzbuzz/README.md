# FizzBuzz

Implementation of the classic FizzBuzz algorithm in TypeScript, built with scalability and clean code in mind.

## Rules

- If a number is divisible by **3** → display `Fizz`
- If a number is divisible by **5** → display `Buzz`
- If a number is divisible by **3 and 5** → display `FizzBuzz`
- Otherwise → display the number

## Architecture

```
fizzbuzz/
├── src/
│   ├── types/
│   │   └── index.ts        # Rule and Result types
│   ├── rules/
│   │   └── index.ts        # Default rules (divisor + word)
│   └── fizzbuzz.ts         # Core function
├── tests/
│   └── fizzbuzz.test.ts    # Unit tests (Vitest)
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Design decisions

### Scalable rule system

Instead of hardcoding the FizzBuzz logic with `if/else` conditions, rules are defined as data:

```typescript
export const defaultRules: Rule[] = [
  { divisor: 3, word: "Fizz" },
  { divisor: 5, word: "Buzz" },
];
```

The core function filters matching rules and concatenates their words. This means:

- Adding a new rule requires zero changes to the core logic
- Multiple rules matching the same number are automatically combined (e.g. 15 → `"FizzBuzz"`)
- Custom rule sets can be injected for testing or extension

### Example

```typescript
// Default usage
fizzBuzz(15);
// ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']

// Custom rules — extensible without touching core logic
fizzBuzz(14, [
  { divisor: 2, word: "Foo" },
  { divisor: 7, word: "Bar" },
]);
// ['1', 'Foo', '3', 'Foo', '5', 'Foo', 'Bar', 'Foo', '9', 'Foo', '11', 'Foo', '13', 'FooBar']
```

## Getting started

```bash
pnpm install
```

## Run tests

```bash
pnpm test
```

## Test coverage

| Case                    | Example                             |
| ----------------------- | ----------------------------------- |
| Divisible by 3          | 3 → `Fizz`                          |
| Divisible by 5          | 5 → `Buzz`                          |
| Divisible by 3 and 5    | 15 → `FizzBuzz`                     |
| Not divisible by either | 4 → `4`                             |
| First element           | 1 → `1`                             |
| Empty array (n = 0)     | `[]`                                |
| Correct array length    | `fizzBuzz(10).length === 10`        |
| Custom rules            | 14 with `[Foo/2, Bar/7]` → `FooBar` |
| n cannot be negative    | n = -1 → throw                      |
| n must be an integer    | n = 1.5 → throw                     |
| Divisor cannot be 0     | { divisor: 0, word:"Test"} → throw  |
