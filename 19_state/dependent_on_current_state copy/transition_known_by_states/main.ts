export class Man {
  private state: State = new HungryState();

  greet(): string {
    return this.state.greet();
  }

  updateState(withFood: boolean): void {
    this.state = this.state.next(withFood);
  }
}

// 都度インスタンスを生成しないようにstaticメソッドを用いようとしたが型が難しかったので、インスタンスメソッドにより実装した
interface State {
  greet: () => string;
  next: (withFood: boolean) => State;
}

class HungryState implements State {
  greet(): string {
    return "Starving...";
  }

  next(withFood: boolean): State {
    return withFood ? new FullState() : new HungryState();
  }
}

class FullState implements State {
  greet(): string {
    return "Can't eat anymore";
  }

  next(_withFood: boolean): State {
    return new FullState();
  }
}
