// User は Printer インターフェースを利用したい
class User {
  hello(printer: Printer) {
    printer.printWeak("hello");
    printer.printStrong("hello");
  }
}

interface Printer {
  printWeak(str: string): void;
  printStrong(str: string): void;
}

// 実装としてはBannerが存在しており、これを利用したい
class Banner {
  showWithParen(str: string): void {
    console.log(`(${str})`);
  }

  showWithAster(str: string): void {
    console.log(`*${str}*`);
  }
}

// Banner を adaptee として Printer インターフェースを備えた BannerPrinter という adapter を定義する
class BannerPrinter implements Printer {
  private readonly banner = new Banner();

  printWeak(str: string): void {
    this.banner.showWithParen(str);
  }

  printStrong(str: string): void {
    this.banner.showWithAster(str);
  }
}

const bannerPrinter = new BannerPrinter();
const user = new User();
user.hello(bannerPrinter);
// (hello)
// *hello*
