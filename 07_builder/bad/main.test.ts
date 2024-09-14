import { expect, test } from "vitest";
import { Lots } from "./main";

test("standard manner * single director", () => {
  const lots = new Lots(
    { x: 12, y: 14 },
    [{ y: 12, text: "masterpiece" }],
    [{ start: { x: 2, y: 2 }, end: { x: 10, y: 10 } }],
    false
  );

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

  expect(lots.toString()).toBe(expected);
});

test("standard manner * square arrangement", () => {
  const lots = new Lots(
    { x: 12, y: 14 },
    [],
    [
      { start: { x: 2, y: 2 }, end: { x: 4, y: 5 } },
      { start: { x: 8, y: 2 }, end: { x: 10, y: 5 } },
      { start: { x: 2, y: 9 }, end: { x: 4, y: 12 } },
      { start: { x: 8, y: 9 }, end: { x: 10, y: 12 } },
    ],
    false
  );

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

  expect(lots.toString()).toBe(expected);
});

test("strong manner * single arrangement", () => {
  const lots = new Lots(
    { x: 12, y: 14 },
    [{ y: 12, text: "masterpiece" }],
    [{ start: { x: 2, y: 2 }, end: { x: 10, y: 10 } }],
    true
  );

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

  expect(lots.toString()).toBe(expected);
});

test("strong manner * square arrangement", () => {
  const lots = new Lots(
    { x: 12, y: 14 },
    [],
    [
      { start: { x: 2, y: 2 }, end: { x: 4, y: 5 } },
      { start: { x: 8, y: 2 }, end: { x: 10, y: 5 } },
      { start: { x: 2, y: 9 }, end: { x: 4, y: 12 } },
      { start: { x: 8, y: 9 }, end: { x: 10, y: 12 } },
    ],
    true
  );

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

  expect(lots.toString()).toBe(expected);
});
