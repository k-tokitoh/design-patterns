import { expect, test, vi, vitest } from "vitest";
import { Printer, HeavyTask } from "./main";

test("print", () => {
  vi.spyOn(HeavyTask, "execute");
  const printer = new Printer("awesome printer");

  // printを呼ぶ前の時点で重い処理が実行されている
  expect(HeavyTask.execute).toBeCalledTimes(1);
  expect(printer.print("great content")).toBe(
    "great content[printed by awesome printer]"
  );
  expect(HeavyTask.execute).toBeCalledTimes(1);
});
