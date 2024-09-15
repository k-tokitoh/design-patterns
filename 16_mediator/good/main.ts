// interfaceを切らないとmediator/colleagueが循環依存してしまう
interface ControlTower {
  register(plain: Plain): void;
  notifiedFinishUsingRunway(): void;
}

export class ControlTowerImpl implements ControlTower {
  private usableRunwayCount = 2;
  private readonly plains: Plain[] = [];

  register(plain: Plain) {
    this.plains.push(plain);
  }

  private get onLandPlains() {
    return this.plains.filter((plain) => plain.onLand);
  }

  notifiedFinishUsingRunway() {
    this.usableRunwayCount += 1;
    this.tryToCommandToStartUsingRunway();
  }

  private commandToStartUsingRunway(plain: Plain) {
    this.usableRunwayCount -= 1;
    plain.startUsingRunway();
  }

  tryToCommandToStartUsingRunway() {
    while (true) {
      if (this.onLandPlains.length > 0 && this.usableRunwayCount > 0) {
        this.commandToStartUsingRunway(
          this.onLandPlains.sort((a, b) => 0.5 - Math.random())[0]
        );
      } else {
        break;
      }
    }
  }
}

// 飛行機は他の飛行機のことは知らずに済んでいる
export class Plain {
  constructor(
    private readonly number: number,
    private readonly controlTower: ControlTower
  ) {
    this.controlTower.register(this);
  }

  get onLand() {
    return this._onLand;
  }
  private _onLand = true;

  // 滑走路を使い始める
  startUsingRunway() {
    Logger.log(`plain ${this.number} start using runway`);
    this._onLand = false;

    // ランダムな時間が経過したあとに滑走路を使い終わる
    setTimeout(() => {
      this.controlTower.notifiedFinishUsingRunway();
    }, Math.random() * 100);
  }
}

export class Logger {
  static log(_message: string) {}
}
