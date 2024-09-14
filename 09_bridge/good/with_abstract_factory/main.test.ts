import { expect, test } from "vitest";
import { NormalCarFactory, AwesomeCarEngineFactory, BusFactory } from "./main";

test("car with awesome engine", () => {
  const vehicle = new AwesomeCarEngineFactory().create();

  expect(vehicle.price).toBe(300);
  expect(vehicle.acceleration).toBe(2.38);
});

test("car with normal engine", () => {
  const vehicle = new NormalCarFactory().create();

  expect(vehicle.price).toBe(250);
  expect(vehicle.acceleration).toBe(1.36);
});

test("bus with awesome engine", () => {
  const vehicle = new BusFactory().create();

  expect(vehicle.price).toBe(550);
  expect(vehicle.acceleration).toBe(0.98);
});
