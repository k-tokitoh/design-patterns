import { expect, test } from "vitest";
import { Car, Bus, AwesomeEngine, NormalEngine } from "./main";

test("car with awesome engine", () => {
  const vehicle = new Car(new AwesomeEngine());

  expect(vehicle.price).toBe(300);
  expect(vehicle.acceleration).toBe(2.38);
});

test("car with normal engine", () => {
  const vehicle = new Car(new NormalEngine());

  expect(vehicle.price).toBe(250);
  expect(vehicle.acceleration).toBe(1.36);
});

test("bus with awesome engine", () => {
  const vehicle = new Bus(new AwesomeEngine());

  expect(vehicle.price).toBe(550);
  expect(vehicle.acceleration).toBe(0.98);
});

test("bus with normal engine", () => {
  const vehicle = new Bus(new NormalEngine());

  expect(vehicle.price).toBe(500);
  expect(vehicle.acceleration).toBe(0.57);
});
