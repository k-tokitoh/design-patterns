import { expect, test } from "vitest";
import { Client, HtmlHeaderFactory, MarkdownHeaderFactory } from "./main";

test("markdown", () => {
  const headerFactory = new MarkdownHeaderFactory();

  const document = new Client(headerFactory).createDocument();

  const expected = `# 1. introduction
                    # 2. main content
                    # 3. conclusion
                   `
    .split("\n")
    .map((v) => v.trim())
    .join("\n");

  expect(document).toBe(expected);
  expect((headerFactory as any).record).toEqual({
    1: "introduction",
    2: "main content",
    3: "conclusion",
  });
});

test("html", () => {
  const headerFactory = new HtmlHeaderFactory();

  const document = new Client(headerFactory).createDocument();

  const expected = `<h1>introduction</h1>
                    <h1>main content</h1>
                    <h1>conclusion</h1>
                   `
    .split("\n")
    .map((v) => v.trim())
    .join("\n");

  expect(document).toBe(expected);
});
