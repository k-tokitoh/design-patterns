type Event = "AnHourPassedEvent" | "ClockBrokenEvent";

type eventParams = {
  AnHourPassedEvent: { currentHour: number };
  ClockBrokenEvent: { reason: string };
};

// eventごとにparamsも異なることを表現している
type Subscriber<T extends Event> = (event: T, params: eventParams[T]) => void;

// eventごとに登録する関数のsignatureも異なることをmapped typesで表現している
type SubscribersByEvent = {
  [key in Event]?: Set<Subscriber<key>>;
};

export class EventBus {
  private readonly subscribersByEvent: SubscribersByEvent = {};

  publish<T extends Event>(event: T, params: eventParams[T]) {
    const subscribers = this.subscribersByEvent[event];

    if (subscribers == undefined) return;
    subscribers.forEach((subscriber) => subscriber(event, params));
  }

  subscribe<T extends Event>(event: T, subscriber: Subscriber<T>) {
    const subscribers = this.subscribersByEvent[event];
    if (subscribers != undefined) {
      // 既にそのeventのsubscribersが存在すれば追加
      subscribers.add(subscriber);
    } else {
      // 存在しなければ新しく作成
      // 型推論を適切に効かせることができなかったためやむなくasを使用
      (this.subscribersByEvent[event] as Set<Subscriber<T>>) = new Set([
        subscriber,
      ]);
    }
  }
}

export class Clock {
  constructor(private readonly eventBus: EventBus) {}

  public get hour(): number {
    return this._hour;
  }
  private _hour: number = 0;

  spendAnHour(): void {
    this._hour += 1;
    this.eventBus.publish("AnHourPassedEvent", { currentHour: this._hour });
  }

  throw(): void {
    this.eventBus.publish("ClockBrokenEvent", {
      reason: "thrown 50 feet away",
    });
  }
}

export class Logger {
  static log(_message: string): void {}
}
