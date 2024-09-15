interface Observable {
  addObserver(observer: Observer<unknown>): void;
  deleteObserver(observer: Observer<unknown>): void;
}

interface Observer<T> {
  update(value: T): void;
}

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
    this.observers.forEach((observer) => observer.update(this));
  }

  spendAnHour(): void {
    this._hour += 1;
    this.notify();
  }
}

export class Dove implements Observer<Clock> {
  update(clock: Clock): void {
    Logger.log(`Coo coo! It's ${clock.hour}'o clock!`);
  }
}

export class Secretary implements Observer<Clock> {
  update(clock: Clock): void {
    if (clock.hour === 1) {
      Logger.log("It is time to eat lunch.");
    } else if (clock.hour === 3) {
      Logger.log("It is time to take a nap.");
    } else if (clock.hour === 5) {
      Logger.log("It is time to go home.");
    }
  }
}

export class Logger {
  static log(_message: string): void {}
}
