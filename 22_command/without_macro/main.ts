// デザインパターンのアイデアを捉えるためのコードなので、エラーハンドリングとかは丁寧にやってないです

// invoker, client, receiverを管理する
export class Editor {
  // タブを2つもつとする
  private readonly tabs = new Array(2)
    .fill(undefined)
    .map(() => new EditorTab());

  // 現在のタブ
  // 外からは読み取り専用にするために、_currentTabをかませる
  private _currentTab = this.tabs[0];
  get currentTab(): EditorTab {
    return this._currentTab;
  }

  // タブ切り替え
  switchTab(tabIndex: number): void {
    this._currentTab = this.tabs[tabIndex];
  }

  private readonly invoker = new EditorCommandInvoker();
  readonly client = new EditorClient((command: Command) => {
    this.invoker.append(command);
  });

  undo(): void {
    this.invoker.undo();
  }

  redo(): void {
    this.invoker.redo();
  }
}

// invoker: コマンドの履歴管理及び実行を行う
class EditorCommandInvoker {
  private readonly commands: Command[] = [];

  // cursorがiであることは、indexがi-1のコマンドまで実行済みであることを意味する。
  private cursor = -1;

  // コマンドを追加して実行する
  append(command: Command): void {
    if (this.cursor < this.commands.length - 1) {
      this.commands.splice(this.cursor + 1);
    }
    this.commands.push(command);

    command.execute();
    this.cursor += 1;
  }

  undo(): void {
    this.commands[this.cursor].undo();
    this.cursor -= 1;
  }

  redo(): void {
    this.cursor += 1;
    this.commands[this.cursor].execute();
  }
}

// Client: コマンドの生成を行う
// ユーザーからの入力を受け取る
class EditorClient {
  // コマンドを生成しおえたときに実行する関数を受け取る
  constructor(private readonly onCreate: (command: Command) => void) {}

  // 文字コードを受け取って、登録されたフックを呼び出す
  input(value: string, editorTab: EditorTab): void {
    const command = (() => {
      if (value === "\b") {
        return new DeleteCommand(editorTab);
      } else {
        return new InsertCommand(editorTab, value);
      }
    })();
    this.onCreate(command);
  }
}

interface Command {
  execute(): void;
  undo(): void;
}

class InsertCommand implements Command {
  constructor(
    private readonly editorTab: EditorTab,
    private readonly char: string
  ) {}

  execute(): void {
    this.editorTab.insertChar(this.char);
  }

  undo(): void {
    this.editorTab.deleteChar();
  }
}

class DeleteCommand implements Command {
  constructor(private readonly editorTab: EditorTab) {}

  private char: string;

  execute(): void {
    this.char = this.editorTab.deleteChar();
  }

  undo(): void {
    this.editorTab.insertChar(this.char);
  }
}

// receiver: コマンドの実行対象
// 各タブが1行だけ内容をもてるとする。
class EditorTab {
  private content: string = "";

  // cursorがiであることは、index: iの文字の前にカーソルがあることを意味する。
  // 0 <= cursor <= content.length を満たす必要がある。
  private cursor: number = 0;

  // 現在の位置に指定した文字を挿入する
  insertChar(char: string): void {
    this.content =
      this.content.slice(0, this.cursor) +
      char +
      this.content.slice(this.cursor);
    this.cursor += 1;
  }

  // 現在のカーソル位置の文字を削除して、削除した文字を返す
  deleteChar(): string {
    const deletedChar = this.content[this.cursor - 1];
    this.content =
      this.content.slice(0, this.cursor - 1) + this.content.slice(this.cursor);
    this.cursor -= 1;
    return deletedChar;
  }

  toString(): string {
    return this.content;
  }
}
