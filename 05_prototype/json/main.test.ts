import { expect, test, describe } from "vitest";
import { Man } from "./main";

test("clone", () => {
  const man = new Man("Taro", { country: "Japan", city: "Tokyo" });
  const clone = man.clone();

  expect(clone.name).toBe("Taro");
  expect(clone.address.country).toBe("Japan");
  expect(clone.address.city).toBe("Tokyo");
});

describe("update > shallow", () => {
  const man = new Man("Taro", { country: "Japan", city: "Tokyo" });
  const clone = man.clone();
  clone.name = "Jiro";

  test("clone updated", () => {
    expect(clone.name).toBe("Jiro");
    expect(clone.address.country).toBe("Japan");
    expect(clone.address.city).toBe("Tokyo");
  });

  test("original not updated", () => {
    expect(man.name).toBe("Taro");
    expect(man.address.country).toBe("Japan");
    expect(man.address.city).toBe("Tokyo");
  });
});

describe("update > deep", () => {
  const man = new Man("Taro", { country: "Japan", city: "Tokyo" });
  const clone = man.clone();
  clone.address.city = "Osaka";

  test("clone updated", () => {
    expect(clone.name).toBe("Taro");
    expect(clone.address.country).toBe("Japan");
    expect(clone.address.city).toBe("Osaka");
  });

  test("original not updated", () => {
    expect(man.name).toBe("Taro");
    expect(man.address.country).toBe("Japan");
    expect(man.address.city).toBe("Tokyo");
  });
});
