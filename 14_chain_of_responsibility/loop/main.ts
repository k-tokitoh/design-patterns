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
    for (let support: Support = this; true; support = support.next!) {
      if (support.canResolve(trouble)) {
        Logger.log(`解決しました by ${support.toString()}`);
        return;
      } else if (support.next == undefined) {
        Logger.log(`解決できませんでした by ${support.toString()}`);
        return;
      }
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
