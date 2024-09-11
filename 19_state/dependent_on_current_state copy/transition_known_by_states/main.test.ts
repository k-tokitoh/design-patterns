import { expect, test } from "vitest";
import { Man } from "./main";

test("default", () => {
  const man = new Man();

  expect(man.greet()).toBe("Starving...");
});

test("starve -> starve", () => {
  const man = new Man();
  man.updateState(false);
  man.updateState(false);

  expect(man.greet()).toBe("Starving...");
});

test("starve -> feed", () => {
  const man = new Man();
  man.updateState(false);
  man.updateState(true);

  expect(man.greet()).toBe("Can't eat anymore");
});

test("feed -> starve", () => {
  const man = new Man();
  man.updateState(true);
  man.updateState(false);

  expect(man.greet()).toBe("Can't eat anymore");
});

test("feed -> feed", () => {
  const man = new Man();
  man.updateState(true);
  man.updateState(true);

  expect(man.greet()).toBe("Can't eat anymore");
});
