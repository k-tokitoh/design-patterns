// interface キーワードだとconstructorが定義できなさそうなので abstract classで定義する
abstract class Printable {
  constructor(_name: string) {}

  abstract print(content: string): string;
}

export class Printer extends Printable {
  constructor(private readonly name: string) {
    super(name);
    // 重い処理
    HeavyTask.execute();
  }

  print(content: string): string {
    return content + "[printed by " + this.name + "]";
  }
}

export class PrinterProxy extends Printable {
  constructor(
    private readonly name: string,
    private readonly realFactory: (name: string) => Printable
  ) {
    super(name);
    // 重い処理がない
  }

  private real: Printable | undefined;

  print(content: string): string {
    if (!this.real) {
      this.real = this.realFactory(this.name);
    }
    return this.real.print(content);
  }
}

export class HeavyTask {
  static execute() {}
}
