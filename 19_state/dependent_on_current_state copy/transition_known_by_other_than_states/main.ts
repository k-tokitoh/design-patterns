// 全てのStateと、その間の遷移を集権的に把握するクラス
class StateManager {
  private readonly nextStateLoaders: {
    [key in string]: (withFood: boolean) => State;
  } = {
    HungryState: (withFood: boolean) =>
      withFood ? new FullState() : new HungryState(),
    FullState: (_withFood: boolean) => new FullState(),
  };

  get current(): State {
    return this._current;
  }
  private _current: State = new HungryState();

  next(withFood: boolean): State {
    const nextStateLoader =
      this.nextStateLoaders[this._current.constructor.name];
    return (this._current = nextStateLoader(withFood));
  }
}

// 状態遷移はstateManagerに切り出したので、個別のStateには依存していない
export class Man {
  private stateManager = new StateManager();

  get state(): State {
    return this.stateManager.current;
  }

  greet(): string {
    return this.state.greet();
  }

  updateState(withFood: boolean): void {
    this.stateManager.next(withFood);
  }
}

// 都度インスタンスを生成しないようにstaticメソッドを用いようとしたが型が難しかったので、インスタンスメソッドにより実装した
// それぞれのStateはお互いのことを知らずに済んでいる
interface State {
  greet: () => string;
}

class HungryState implements State {
  greet(): string {
    return "Starving...";
  }
}

class FullState implements State {
  greet(): string {
    return "Can't eat anymore";
  }
}
