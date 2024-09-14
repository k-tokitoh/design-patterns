// 「実装を変更せずに任意の文字列挿入/塗りつぶしが可能である」を要件とする
// これはbuilderメソッドの呼び出しにより実現される

type Coordinate = { x: number; y: number };

abstract class LotsBuilder {
  protected lots: Array<Array<string>>;

  constructor(protected readonly coordinate: Coordinate) {
    this.lots = new Array(this.height)
      .fill(undefined)
      .map(() => new Array(this.width).fill("-"));
  }

  get width(): number {
    return this.coordinate.x;
  }

  get height(): number {
    return this.coordinate.y;
  }

  abstract fill(start: Coordinate, end: Coordinate): void;
  abstract text(text: string, line: number, wrap: boolean): void;

  toString(): string {
    return this.lots.map((row) => row.join("")).join("\n") + "\n";
  }
}

export class StandardLotsBuilder extends LotsBuilder {
  fill(start: Coordinate, end: Coordinate): void {
    for (let i = start.y; i < end.y; i++) {
      for (let j = start.x; j < end.x; j++) {
        this.lots[i][j] = "$";
      }
    }
  }

  text(text: string, line: number, wrap: boolean): void {
    const textArray = text.split("");
    textArray.forEach((char, i) => (this.lots[line][i] = char));
  }
}

export class StrongLotsBuilder extends LotsBuilder {
  fill(start: Coordinate, end: Coordinate): void {
    for (let i = start.y; i < end.y; i++) {
      for (let j = start.x; j < end.x; j++) {
        this.lots[i][j] = "$";
      }
    }

    // top
    for (let i = start.x - 1; i < end.x + 1; i++) {
      this.lots[start.y - 1][i] = "*";
    }

    // bottom
    for (let i = start.x - 1; i < end.x + 1; i++) {
      this.lots[end.y][i] = "*";
    }

    // left/right
    for (let i = start.y - 1; i < end.y + 1; i++) {
      this.lots[i][start.x - 1] = "*";
      this.lots[i][end.x] = "*";
    }
  }

  text(text: string, line: number, wrap: boolean): void {
    const textArray = text.toUpperCase().split("");
    textArray.forEach((char, i) => (this.lots[line][i] = char));
  }
}

interface Director {
  construct(text: string): void;
}

export class SingleDirector implements Director {
  constructor(private readonly builder: LotsBuilder) {}

  construct(text: string): void {
    const edge = this.builder.width - 2;
    this.builder.fill({ x: 2, y: 2 }, { x: edge, y: edge });
    this.builder.text(text, edge + 2, false);
  }
}

export class SquareDirector implements Director {
  constructor(private readonly builder: LotsBuilder) {}

  construct(): void {
    const widthCenter = Math.floor(this.builder.width / 2);
    const heightCenter = Math.floor(this.builder.height / 2);
    // 左上
    this.builder.fill(
      { x: 2, y: 2 },
      { x: widthCenter - 2, y: heightCenter - 2 }
    );
    // 右上
    this.builder.fill(
      { x: widthCenter + 2, y: 2 },
      { x: this.builder.width - 2, y: heightCenter - 2 }
    );
    // 左下
    this.builder.fill(
      { x: 2, y: heightCenter + 2 },
      { x: widthCenter - 2, y: this.builder.height - 2 }
    );
    // 右下
    this.builder.fill(
      { x: widthCenter + 2, y: heightCenter + 2 },
      { x: this.builder.width - 2, y: this.builder.height - 2 }
    );
  }
}
