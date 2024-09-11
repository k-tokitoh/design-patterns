export class Printer {
  constructor(private readonly name: string) {
    // 重い処理
    HeavyTask.execute();
  }

  print(content: string): string {
    return content + "[printed by " + this.name + "]";
  }
}

export class HeavyTask {
  static execute() {}
}
