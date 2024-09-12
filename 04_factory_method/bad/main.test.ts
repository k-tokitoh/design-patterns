import { expect, test } from "vitest";
import { Client } from "./main";

test("markdown", () => {
  const document = new Client("markdown").createDocument();

  const expected = `# introduction   
                    # main content
                    # conclusion
                   `
    .split("\n")
    .map((v) => v.trim())
    .join("\n");

  expect(document).toBe(expected);
});

test("html", () => {
  const document = new Client("html").createDocument();

  const expected = `<h1>introduction</h1>   
                    <h1>main content</h1>
                    <h1>conclusion</h1>
                   `
    .split("\n")
    .map((v) => v.trim())
    .join("\n");

  expect(document).toBe(expected);
});
