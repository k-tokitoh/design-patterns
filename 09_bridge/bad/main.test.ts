import { expect, test } from "vitest";
import { Car, Bus } from "./main";

test("car with awesome engine", () => {
  const vehicle = new Car("awesome");

  expect(vehicle.price).toBe(300);
  expect(vehicle.acceleration).toBe(2.38);
});

test("car with normal engine", () => {
  const vehicle = new Car("normal");

  expect(vehicle.price).toBe(250);
  expect(vehicle.acceleration).toBe(1.36);
});

test("bus with awesome engine", () => {
  const vehicle = new Bus("awesome");

  expect(vehicle.price).toBe(550);
  expect(vehicle.acceleration).toBe(0.98);
});

test("bus with normal engine", () => {
  const vehicle = new Bus("normal");

  expect(vehicle.price).toBe(500);
  expect(vehicle.acceleration).toBe(0.57);
});
