interface Observable {
  addObserver(observer: Observer<unknown>): void;
  deleteObserver(observer: Observer<unknown>): void;
}

type Observer<T> = (value: T) => void;

export class Clock implements Observable {
  private observers: Observer<Clock>[] = [];

  public get hour(): number {
    return this._hour;
  }
  private _hour: number = 0;

  addObserver(observer: Observer<Clock>): void {
    this.observers.push(observer);
  }

  deleteObserver(target: Observer<Clock>): void {
    this.observers = this.observers.filter((observer) => observer !== target);
  }

  private notify(): void {
    this.observers.forEach((observer) => observer(this));
  }

  spendAnHour(): void {
    this._hour += 1;
    this.notify();
  }
}

export class Logger {
  static log(_message: string): void {}
}
