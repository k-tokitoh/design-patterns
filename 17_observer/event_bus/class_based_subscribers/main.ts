interface Subscriber<T extends Event> {
  update(event: T, params: EventParams[T]): void;
}

// Eventが付加的な情報をもつことを素直に表現しようとすると、Eventインスタンスがプロパティを持つ形が発想される
// しかしEventBusで購読状況を管理したい。Eventをkeyとしたmapが思いつくが、そのためにはEventがstring | number | symbolである必要がある
// ...という経緯からEventはstringとして、Eventに関連する情報はEventParamsによって対応関係を表現することにした
type Event = "AnHourPassedEvent" | "ClockBrokenEvent";

type EventParams = {
  AnHourPassedEvent: { currentHour: number };
  ClockBrokenEvent: { reason: string };
};

export class EventBus {
  private readonly subscribersByEvent = new Map<
    Event,
    Set<Subscriber<Event>>
  >();

  publish<T extends Event>(event: T, params: EventParams[T]) {
    const subscribers = this.subscribersByEvent.get(event);

    if (subscribers == undefined) return;
    subscribers.forEach((subscriber) => subscriber.update(event, params));
  }

  subscribe(event: Event, subscriber: Subscriber<Event>) {
    const subscribers = this.subscribersByEvent.get(event);
    if (subscribers != undefined) {
      // 既にそのeventのsubscribersが存在すれば追加
      subscribers.add(subscriber);
    } else {
      // 存在しなければ新しく作成
      this.subscribersByEvent.set(event, new Set([subscriber]));
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

export class Dove implements Subscriber<"AnHourPassedEvent"> {
  constructor(eventBus: EventBus) {
    eventBus.subscribe("AnHourPassedEvent", this);
  }

  update(
    _event: "AnHourPassedEvent",
    params: EventParams["AnHourPassedEvent"]
  ): void {
    Logger.log(`Coo coo! It's ${params.currentHour}'o clock!`);
  }
}

export class Secretary implements Subscriber<"AnHourPassedEvent"> {
  constructor(eventBus: EventBus) {
    eventBus.subscribe("AnHourPassedEvent", this);
  }

  update(
    _event: "AnHourPassedEvent",
    params: EventParams["AnHourPassedEvent"]
  ): void {
    if (params.currentHour === 1) {
      Logger.log("It is time to eat lunch.");
    } else if (params.currentHour === 3) {
      Logger.log("It is time to take a nap.");
    } else if (params.currentHour === 5) {
      Logger.log("It is time to go home.");
    }
  }
}

export class Janitor implements Subscriber<"ClockBrokenEvent"> {
  constructor(eventBus: EventBus) {
    eventBus.subscribe("ClockBrokenEvent", this);
  }

  update(
    _event: "ClockBrokenEvent",
    params: EventParams["ClockBrokenEvent"]
  ): void {
    Logger.log(`Clock broken because ${params.reason}, I'm gonna fix it.`);
  }
}

export class Logger {
  static log(_message: string): void {}
}
