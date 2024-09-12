// headerについて、markdown/htmlというバリエーションがある
abstract class Header {
  constructor(protected readonly value: string) {}

  abstract output(): string;
}

class MarkdownHeader extends Header {
  constructor(value: string, private readonly serial: number) {
    super(value);
  }

  output(): string {
    return "# " + this.serial + ". " + this.value + "\n";
  }
}

class HtmlHeader extends Header {
  output(): string {
    return "<h1>" + this.value + "</h1>\n";
  }
}

// 利用者がこれらをポリモーフィックに生成できるように、factory methodパターンを利用する
// すなわち、それぞれのFactoryクラスを定義する

abstract class HeaderFactory {
  abstract create(value: string): Header;
}

export class MarkdownHeaderFactory {
  private record: Record<number, string> = {};
  private serial: number = 0;

  create(value: string): MarkdownHeader {
    this.serial += 1;
    this.record[this.serial] = value;
    return new MarkdownHeader(value, this.serial);
  }
}

export class HtmlHeaderFactory {
  create(value: string): HtmlHeader {
    return new HtmlHeader(value);
  }
}

// 利用者は、headerをポリモーフィックに生成することができる
// headerの生成ロジック = 「どの具象クラスを生成するか」はコンストラクタ経由で外部から注入される
// 利用者はheaderの具象クラスに依存していない！！
export class Client {
  constructor(private readonly headerFactory: HeaderFactory) {}

  createDocument(): string {
    const headers = [
      this.headerFactory.create("introduction"),
      this.headerFactory.create("main content"),
      this.headerFactory.create("conclusion"),
    ];
    return headers.map((header) => header.output()).join("");
  }
}
