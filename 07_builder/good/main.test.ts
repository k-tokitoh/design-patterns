import { expect, test } from "vitest";
import {
  StandardLotsBuilder,
  StrongLotsBuilder,
  SquareDirector,
  SingleDirector,
} from "./main";

test("standard manner * single arrangement", () => {
  const builder = new StandardLotsBuilder({ x: 12, y: 14 });
  const director = new SingleDirector(builder);
  director.construct("masterpiece");

  const expected = `------------
                    ------------
                    --$$$$$$$$--
                    --$$$$$$$$--
                    --$$$$$$$$--
                    --$$$$$$$$--
                    --$$$$$$$$--
                    --$$$$$$$$--
                    --$$$$$$$$--
                    --$$$$$$$$--
                    ------------
                    ------------
                    masterpiece-
                    ------------
                   `
    .split("\n")
    .map((v) => v.trim())
    .join("\n");

  expect(builder.toString()).toBe(expected);
});

test("standard manner * square arrangement", () => {
  const builder = new StandardLotsBuilder({ x: 12, y: 14 });
  const director = new SquareDirector(builder);
  director.construct();

  const expected = `------------
                    ------------
                    --$$----$$--
                    --$$----$$--
                    --$$----$$--
                    ------------
                    ------------
                    ------------
                    ------------
                    --$$----$$--
                    --$$----$$--
                    --$$----$$--
                    ------------
                    ------------
                  `
    .split("\n")
    .map((v) => v.trim())
    .join("\n");

  expect(builder.toString()).toBe(expected);
});

test("strong manner * single arrangement", () => {
  const builder = new StrongLotsBuilder({ x: 12, y: 14 });
  const director = new SingleDirector(builder);
  director.construct("masterpiece");

  const expected = `------------
                    -**********-
                    -*$$$$$$$$*-
                    -*$$$$$$$$*-
                    -*$$$$$$$$*-
                    -*$$$$$$$$*-
                    -*$$$$$$$$*-
                    -*$$$$$$$$*-
                    -*$$$$$$$$*-
                    -*$$$$$$$$*-
                    -**********-
                    ------------
                    MASTERPIECE-
                    ------------
                  `
    .split("\n")
    .map((v) => v.trim())
    .join("\n");

  expect(builder.toString()).toBe(expected);
});

test("strong manner * square arrangement", () => {
  const builder = new StrongLotsBuilder({ x: 12, y: 14 });
  const director = new SquareDirector(builder);
  director.construct();

  const expected = `------------
                    -****--****-
                    -*$$*--*$$*-
                    -*$$*--*$$*-
                    -*$$*--*$$*-
                    -****--****-
                    ------------
                    ------------
                    -****--****-
                    -*$$*--*$$*-
                    -*$$*--*$$*-
                    -*$$*--*$$*-
                    -****--****-
                    ------------
                  `
    .split("\n")
    .map((v) => v.trim())
    .join("\n");

  expect(builder.toString()).toBe(expected);
});
