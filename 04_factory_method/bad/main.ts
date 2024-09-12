// headerについて、markdown/htmlというバリエーションがある
abstract class Header {
  constructor(protected readonly value: string) {}

  abstract output(): string;
}

class MarkdownHeader extends Header {
  output(): string {
    return "# " + this.value + "\n";
  }
}

class HtmlHeader extends Header {
  output(): string {
    return "<h1>" + this.value + "</h1>\n";
  }
}

// 利用者は、headerのインスタンスを生成したい場合に、都度どちらの実装を使うか分岐により判断しないといけない
// どちらの実装をつかうべきか、という情報はコンストラクタ経由で指定する
// 利用者がそれぞれの実装クラスに依存してしまっているのが最大の問題
export class Client {
  constructor(private readonly type: "markdown" | "html") {}

  private header(value: string): Header {
    switch (this.type) {
      case "markdown":
        return new MarkdownHeader(value);
      case "html":
        return new HtmlHeader(value);
    }
  }

  createDocument(): string {
    const headers = [
      this.header("introduction"),
      this.header("main content"),
      this.header("conclusion"),
    ];

    return headers.map((header) => header.output()).join("");
  }
}
