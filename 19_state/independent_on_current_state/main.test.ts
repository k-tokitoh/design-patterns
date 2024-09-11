import { expect, test } from "vitest";
import { Man } from "./main";

test("default", () => {
  const man = new Man();

  expect(man.greet()).toBe("Good Morning");
});

test("morning", () => {
  const man = new Man();
  man.updateState(8);

  expect(man.greet()).toBe("Good Morning");
});

test("afternoon", () => {
  const man = new Man();
  man.updateState(15);

  expect(man.greet()).toBe("Good Afternoon");
});

test("night", () => {
  const man = new Man();
  man.updateState(23);

  expect(man.greet()).toBe("Good Night");
});

test("tripping", () => {
  const man = new Man();
  man.dose();

  expect(man.greet()).toBe("AAAAAAAHHHHHH!!!!");
});
