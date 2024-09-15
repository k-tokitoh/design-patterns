import { expect, test, vi } from "vitest";
import { EventBus, Clock, Logger } from "./main";

test("subscribe events", () => {
  const eventBus = new EventBus();
  const clock = new Clock(eventBus);

  // class-based / function-based という軸と、subscriber が sync / async という軸は直交している
  eventBus.subscribe("AnHourPassedEvent", async (_event, params) => {
    Logger.log(`Coo coo! It's ${params.currentHour}'o clock!`);
  });
  eventBus.subscribe("AnHourPassedEvent", async (_event, params) => {
    if (params.currentHour === 1) {
      Logger.log("It is time to eat lunch.");
    } else if (params.currentHour === 3) {
      Logger.log("It is time to take a nap.");
    } else if (params.currentHour === 5) {
      Logger.log("It is time to go home.");
    }
  });
  eventBus.subscribe("ClockBrokenEvent", async (_event, params) => {
    Logger.log(`Clock broken because ${params.reason}, I'm gonna fix it.`);
  });

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
