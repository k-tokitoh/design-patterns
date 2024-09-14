// 「実装を変更せずに任意の文字列挿入/塗りつぶしが可能である」を要件とする
// これはLotsのコンストラクタ引数の変更により実現される

type Coordinate = { x: number; y: number };
type TextInput = { y: number; text: string };
type FillInput = { start: Coordinate; end: Coordinate };

export class Lots {
  constructor(
    private readonly coordinate: Coordinate,
    textInputs: Array<TextInput>,
    fillInputs: Array<FillInput>,
    strong: boolean
  ) {
    this.value = new Array(this.height)
      .fill(undefined)
      .map(() => new Array(this.width).fill("-"));

    // 文字列挿入
    textInputs.forEach(({ y, text }) => {
      const textArray = (strong ? text.toUpperCase() : text).split("");
      textArray.forEach((char, i) => (this.value[y][i] = char));
    });

    // 塗りつぶし
    fillInputs.forEach(({ start, end }) => {
      for (let i = start.y; i < end.y; i++) {
        for (let j = start.x; j < end.x; j++) {
          this.value[i][j] = "$";
        }
      }

      if (!strong) return;
      // top
      for (let i = start.x - 1; i < end.x + 1; i++) {
        this.value[start.y - 1][i] = "*";
      }

      // bottom
      for (let i = start.x - 1; i < end.x + 1; i++) {
        this.value[end.y][i] = "*";
      }

      // left/right
      for (let i = start.y - 1; i < end.y + 1; i++) {
        this.value[i][start.x - 1] = "*";
        this.value[i][end.x] = "*";
      }
    });
  }

  private value: Array<Array<string>>;

  get width(): number {
    return this.coordinate.x;
  }

  get height(): number {
    return this.coordinate.y;
  }

  toString(): string {
    return this.value.map((row) => row.join("")).join("\n") + "\n";
  }
}
