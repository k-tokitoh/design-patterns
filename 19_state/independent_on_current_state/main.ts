export class Man {
  private state: typeof State = MorningState;

  greet(): string {
    return this.state.greet();
  }

  updateState(hour: number): void {
    if (hour < 12) {
      this.state = MorningState;
    } else if (hour < 18) {
      this.state = AfternoonState;
    } else {
      this.state = NightState;
    }
  }

  dose(): void {
    this.state = TrippingState;
  }
}

abstract class State {
  static greet: () => string;
}

class MorningState implements State {
  static greet(): string {
    return "Good Morning";
  }
}

class AfternoonState implements State {
  static greet(): string {
    return "Good Afternoon";
  }
}

class NightState implements State {
  static greet(): string {
    return "Good Night";
  }
}

class TrippingState implements State {
  static greet(): string {
    return "AAAAAAAHHHHHH!!!!";
  }
}
