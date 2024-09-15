export class Plain {
  constructor(private readonly number: number) {}

  get onLand() {
    return this._onLand;
  }
  private _onLand = true;

  register(plain: Plain) {
    this.plains.push(plain);
  }

  // 滑走路を使い始める
  startUsingRunway() {
    console.log(`plain ${this.number} start using runway`);
    Logger.log(`plain ${this.number} start using runway`);
    this.usableRunwayCount -= 1;
    this._onLand = false;
    // 他の飛行機に通知する
    this.plains
      .sort((a, b) => 0.5 - Math.random())
      .forEach((plain) => plain.notifiedStartUsingRunway());

    // ランダムな時間が経過したあとに滑走路を使い終わる
    setTimeout(() => this.finishUsingRunway(), Math.random() * 100);
  }

  // 滑走路を使い終わる
  finishUsingRunway() {
    // console.log(`plain ${this.number} finish using runway`);
    this.usableRunwayCount += 1;

    // 他の飛行機に通知する
    this.plains
      .sort((a, b) => 0.5 - Math.random())
      .forEach((plain) => plain.notifiedFinishUsingRunway());
  }

  // 滑走路を使い始めたことを通知される
  notifiedStartUsingRunway() {
    this.usableRunwayCount -= 1;
  }

  // 滑走路を使い終わったことを通知される
  notifiedFinishUsingRunway() {
    this.usableRunwayCount += 1;

    setTimeout(() => this.tryToUseRunway(), 100);
  }

  // 使い始めるかどうかは、前に使っていた飛行機が判断するのも変なので、通知を受けた飛行機が自身で判断する
  // mediatorパターンでは、mediatorが判断する
  tryToUseRunway() {
    if (this.onLand === true && this.usableRunwayCount > 0) {
      this.startUsingRunway();
    }
  }

  // それぞれの飛行機がどう動くべきか判断するために、全体の状態を持つ
  private usableRunwayCount = 2;
  private readonly plains: Plain[] = [];
}

export class Logger {
  static log(_message: string) {}
}
