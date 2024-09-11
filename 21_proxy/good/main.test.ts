import { expect, test, vi } from "vitest";
import { Printer, PrinterProxy, HeavyTask } from "./main";

test("print", () => {
  const heavyTaskExecute = vi.spyOn(HeavyTask, "execute");
  const printer = new PrinterProxy(
    "awesome printer",
    (name: string) => new Printer(name)
  );

  // printを呼ぶ前の時点では重い処理が実行されていない
  expect(heavyTaskExecute).toBeCalledTimes(0);
  expect(printer.print("great content")).toBe(
    "great content[printed by awesome printer]"
  );
  expect(heavyTaskExecute).toBeCalledTimes(1);
});
