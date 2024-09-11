import { expect, test } from "vitest";
import { CharDisplay, StringDisplay } from "./main";

test("CharDisplay", () => {
  const display = new CharDisplay("a");

  expect(display.display()).toBe("<<aaaaa>>");
});

test("StringDisplay", () => {
  const display = new StringDisplay("abc");

  const expected = `+---+
                    |abc|
                    |abc|
                    |abc|
                    |abc|
                    |abc|
                    +---+
                  `
    .split("\n")
    .map((s) => s.trim())
    .join("\n");
  expect(display.display()).toBe(expected);
});
