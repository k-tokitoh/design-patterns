//////// database

import users from "../users.json";

class Database {
  static get users() {
    return users;
  }
}

//////// html writer

import fs from "fs";

class HtmlWriter {
  constructor(private readonly filename: string) {}

  title(title: string): void {
    fs.appendFileSync(this.filename, "<!DOCTYPE html>");
    fs.appendFileSync(this.filename, "<html>");
    fs.appendFileSync(this.filename, "<head>");
    fs.appendFileSync(this.filename, `<title>${title}</title>`);
    fs.appendFileSync(this.filename, "</head>");
    fs.appendFileSync(this.filename, "<body>");
    fs.appendFileSync(this.filename, "\n");
    fs.appendFileSync(this.filename, `<h1>${title}</h1>`);
    fs.appendFileSync(this.filename, "\n");
  }

  paragraph(msg: string): void {
    fs.appendFileSync(this.filename, `<p>${msg}</p>`);
    fs.appendFileSync(this.filename, "\n");
  }

  link(href: string, caption: string): void {
    fs.appendFileSync(this.filename, `<a href="${href}">${caption}</a>`);
  }

  mailto(email: string, username: string): void {
    this.link(`mailto:${email}`, username);
  }

  close(): void {
    fs.appendFileSync(this.filename, "</body>");
    fs.appendFileSync(this.filename, "</html>");
    fs.appendFileSync(this.filename, "\n");
  }
}

//////// 指定したemailアドレスをもとに、そのユーザーの名前を含むHTMLを作成したくなったとする。処理はMain.execute()で実行されるようにしたい。

//////// DatabaseとHtmlWriterの取り回しが一定複雑なので、Mainがその詳細を知ることを防ぎたい
//////// そのためにfacadeとしてPageMakerを定義する

class PageMaker {
  static makeWelcomePage(email: string, filename: string) {
    const username = Database.users.find((user) => user.email === email)?.name;

    const htmlWriter = new HtmlWriter(filename);
    htmlWriter.title(`Welcome to ${username}'s page!`);
    htmlWriter.paragraph(`${username}のページへようこそ`);
    htmlWriter.paragraph("メールをお待ちしております");
    htmlWriter.mailto(email, "メールを送る");
    console.log(`${filename} is created for ${email} (${username})`);
  }
}

class Main {
  static execute() {
    // Mainが知っていることは PageMakerのシンプルなインターフェースだけ
    PageMaker.makeWelcomePage("hyuki@example.com", "welcome.html");
  }
}

Main.execute();
