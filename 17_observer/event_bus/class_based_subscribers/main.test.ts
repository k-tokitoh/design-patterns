import { expect, test, vi } from "vitest";
import { EventBus, Clock, Dove, Secretary, Logger, Janitor } from "./main";

test("subscribe events", () => {
  const eventBus = new EventBus();
  const clock = new Clock(eventBus);
  new Dove(eventBus);
  new Secretary(eventBus);
  new Janitor(eventBus);

  const loggerSpy = vi.spyOn(Logger, "log");

  clock.spendAnHour();
  expect(loggerSpy).toBeCalledTimes(2);
  expect(loggerSpy).toBeCalledWith("Coo coo! It's 1'o clock!");
  expect(loggerSpy).toBeCalledWith("It is time to eat lunch.");

  clock.spendAnHour();
  expect(loggerSpy).toBeCalledTimes(3);
  expect(loggerSpy).toBeCalledWith("Coo coo! It's 2'o clock!");

  clock.throw();
  expect(loggerSpy).toBeCalledTimes(4);
  expect(loggerSpy).toBeCalledWith(
    "Clock broken because thrown 50 feet away, I'm gonna fix it."
  );
});
