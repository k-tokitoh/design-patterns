import { expect, test, vi } from "vitest";
import { Clock, Dove, Secretary, Logger } from "./main";

test("add observers", () => {
  const clock = new Clock();
  const secretary = new Secretary();
  clock.addObserver(secretary);

  const loggerSpy = vi.spyOn(Logger, "log");

  clock.spendAnHour();
  expect(loggerSpy).toBeCalledTimes(1);
  expect(loggerSpy).toBeCalledWith("It is time to eat lunch.");

  clock.spendAnHour();
  expect(loggerSpy).toBeCalledTimes(1);

  const dove = new Dove();
  clock.addObserver(dove);
  clock.spendAnHour();
  expect(loggerSpy).toBeCalledTimes(3);
  expect(loggerSpy).toBeCalledWith("Coo coo! It's 3'o clock!");
  expect(loggerSpy).toBeCalledWith("It is time to take a nap.");

  clock.spendAnHour();
  expect(loggerSpy).toBeCalledTimes(4);
  expect(loggerSpy).toBeCalledWith("Coo coo! It's 4'o clock!");

  clock.spendAnHour();
  expect(loggerSpy).toBeCalledTimes(6);
  expect(loggerSpy).toBeCalledWith("Coo coo! It's 5'o clock!");
  expect(loggerSpy).toBeCalledWith("It is time to go home.");
});

test("delete observer", () => {
  const clock = new Clock();
  const dove = new Dove();
  const secretary = new Secretary();
  clock.addObserver(dove);
  clock.addObserver(secretary);

  const loggerSpy = vi.spyOn(Logger, "log");

  clock.spendAnHour();
  expect(loggerSpy).toBeCalledTimes(2);
  expect(loggerSpy).toBeCalledWith("Coo coo! It's 1'o clock!");
  expect(loggerSpy).toBeCalledWith("It is time to eat lunch.");

  clock.spendAnHour();
  expect(loggerSpy).toBeCalledTimes(3);
  expect(loggerSpy).toBeCalledWith("Coo coo! It's 2'o clock!");

  clock.deleteObserver(dove);
  clock.spendAnHour();
  expect(loggerSpy).toBeCalledTimes(4);
  expect(loggerSpy).toBeCalledWith("It is time to take a nap.");

  clock.spendAnHour();
  expect(loggerSpy).toBeCalledTimes(4);

  clock.spendAnHour();
  expect(loggerSpy).toBeCalledTimes(5);
  expect(loggerSpy).toBeCalledWith("It is time to go home.");
});
