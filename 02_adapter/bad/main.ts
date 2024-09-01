//

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
// class Banner {
//   showWithParen(str: string): void {
//     console.log(`(${str})`);
//   }

//   showWithAster(str: string): void {
//     console.log(`*${str}*`);
//   }
// }

// BAD: Bannerの実装を変更することで対応する
// これだと、BannerのshowWithParen, showWithAsterに依存している箇所全てを書き換えないといけない
class Banner implements Printer {
  printWeak(str: string): void {
    console.log(`(${str})`);
  }

  printStrong(str: string): void {
    console.log(`*${str}*`);
  }
}

const bannerPrinter = new Banner();
const user = new User();
user.hello(bannerPrinter);
// (hello)
// *hello*

// 何もimport/exportしないファイルはvscodeからmoduleではなくscriptと認識されてしまい、別ファイルとの名前衝突が発生する
// これを回避するために空のexportを記述する
// see: https://github.com/denoland/deno/issues/9593
export {};
