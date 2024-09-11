import { describe, expect, test, vi } from "vitest";
import {
  NoSupport,
  LimitSupport,
  OddSupport,
  SpecialSupport,
  Trouble,
  Logger,
} from "./main";

describe("Chain of Responsibility", () => {
  const support = new NoSupport();
  support
    .setNext(new LimitSupport(100))
    .setNext(new SpecialSupport(429))
    .setNext(new LimitSupport(200))
    .setNext(new OddSupport())
    .setNext(new LimitSupport(300));

  test("0", () => {
    const loggerSpy = vi.spyOn(Logger, "log");
    const trouble = new Trouble(0);
    support.support(trouble);

    expect(loggerSpy).toBeCalledTimes(1);
    expect(loggerSpy).toBeCalledWith("解決しました by LimitSupport[100]");
  });

  test("429", () => {
    const loggerSpy = vi.spyOn(Logger, "log");
    const trouble = new Trouble(429);
    support.support(trouble);

    expect(loggerSpy).toBeCalledTimes(1);
    expect(loggerSpy).toBeCalledWith("解決しました by SpecialSupport[429]");
  });

  test("190", () => {
    const loggerSpy = vi.spyOn(Logger, "log");
    const trouble = new Trouble(190);
    support.support(trouble);

    expect(loggerSpy).toBeCalledTimes(1);
    expect(loggerSpy).toBeCalledWith("解決しました by LimitSupport[200]");
  });

  test("201", () => {
    const loggerSpy = vi.spyOn(Logger, "log");
    const trouble = new Trouble(201);
    support.support(trouble);

    expect(loggerSpy).toBeCalledTimes(1);
    expect(loggerSpy).toBeCalledWith("解決しました by OddSupport");
  });

  test("202", () => {
    const loggerSpy = vi.spyOn(Logger, "log");
    const trouble = new Trouble(202);
    support.support(trouble);

    expect(loggerSpy).toBeCalledTimes(1);
    expect(loggerSpy).toBeCalledWith("解決しました by LimitSupport[300]");
  });

  test("302", () => {
    const loggerSpy = vi.spyOn(Logger, "log");
    const trouble = new Trouble(302);
    support.support(trouble);

    expect(loggerSpy).toBeCalledTimes(1);
    expect(loggerSpy).toBeCalledWith(
      "解決できませんでした by LimitSupport[300]"
    );
  });
});
