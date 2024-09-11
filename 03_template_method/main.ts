abstract class Display {
  abstract start(): string;
  abstract end(): string;
  abstract print(): string;

  display(): string {
    return (
      this.start() +
      Array(5)
        .fill(undefined)
        .map(() => this.print())
        .join("") +
      this.end()
    );
  }
}

export class CharDisplay extends Display {
  private readonly char: string;

  constructor(char: string) {
    super();
    this.char = char;
  }

  override start(): string {
    return "<<";
  }

  override end(): string {
    return ">>";
  }

  override print(): string {
    return this.char;
  }
}

export class StringDisplay extends Display {
  constructor(private readonly str: string) {
    super();
  }

  override start(): string {
    return (
      "+" +
      Array(this.str.length)
        .fill(undefined)
        .map(() => "-")
        .join("") +
      "+\n"
    );
  }

  override end(): string {
    return (
      "+" +
      Array(this.str.length)
        .fill(undefined)
        .map(() => "-")
        .join("") +
      "+\n"
    );
  }

  override print(): string {
    return "|" + this.str + "|\n";
  }
}
