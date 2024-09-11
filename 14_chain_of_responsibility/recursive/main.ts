export class Trouble {
  constructor(readonly number: number) {}
}

abstract class Support {
  private next: Support | undefined = undefined;

  setNext(next: Support) {
    this.next = next;
    return next;
  }

  support(trouble: Trouble) {
    if (this.canResolve(trouble)) {
      // まずは自身で解決できるかどうかを判定
      Logger.log(`解決しました by ${this.toString()}`);
    } else if (this.next) {
      // 自身で解決できない場合は次の人に任せる
      this.next.support(trouble);
    } else {
      // 自身で解決できず、任せるべき次の人もいなければ解決できない
      Logger.log(`解決できませんでした by ${this.toString()}`);
    }
  }

  protected abstract canResolve(trouble: Trouble): boolean;

  toString(): string {
    return `${this.constructor.name}`;
  }

  private readonly logger = new Logger();
}

export class NoSupport extends Support {
  protected canResolve(_trouble: Trouble) {
    return false;
  }
}

export class LimitSupport extends Support {
  constructor(private readonly limit: number) {
    super();
  }

  protected canResolve(trouble: Trouble) {
    return trouble.number <= this.limit;
  }

  override toString(): string {
    return super.toString() + `[${this.limit}]`;
  }
}

export class OddSupport extends Support {
  protected canResolve(trouble: Trouble) {
    return trouble.number % 2 === 1;
  }
}

export class SpecialSupport extends Support {
  constructor(private readonly specialNumber: number) {
    super();
  }

  protected canResolve(trouble: Trouble) {
    return trouble.number === this.specialNumber;
  }

  override toString(): string {
    return super.toString() + `[${this.specialNumber}]`;
  }
}

export class Logger {
  static log(_message: string) {}
}
