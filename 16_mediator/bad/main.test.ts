import { expect, test, vi } from "vitest";
import { Plain, Logger } from "./main";

test("all took off", async () => {
  const loggerSpy = vi.spyOn(Logger, "log");

  const plains: Plain[] = [];

  for (let i = 0; i < 10; i++) {
    const newPlain = new Plain(i);
    plains.forEach((plain) => plain.register(newPlain));
    plains.forEach((plain) => newPlain.register(plain));
    plains.push(newPlain);
  }

  plains[0].tryToUseRunway();
  plains[1].tryToUseRunway();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  expect(loggerSpy).toBeCalledTimes(10);
  expect(loggerSpy).toBeCalledWith("plain 0 start using runway");
  expect(loggerSpy).toBeCalledWith("plain 1 start using runway");
  expect(loggerSpy).toBeCalledWith("plain 2 start using runway");
  expect(loggerSpy).toBeCalledWith("plain 3 start using runway");
  expect(loggerSpy).toBeCalledWith("plain 4 start using runway");
  expect(loggerSpy).toBeCalledWith("plain 5 start using runway");
  expect(loggerSpy).toBeCalledWith("plain 6 start using runway");
  expect(loggerSpy).toBeCalledWith("plain 7 start using runway");
  expect(loggerSpy).toBeCalledWith("plain 8 start using runway");
  expect(loggerSpy).toBeCalledWith("plain 9 start using runway");
});
