// 既に車種という軸で継承関係を利用している
// そのため、車種とは独立しているエンジンという軸に関してはこのクラスの継承関係を利用することができない
// このgoodな例では、engineを別のクラスとして定義している
// それにより、engineに関してはengineという軸で継承関係を利用することができる
// オープンクローズドの原則をみたす
abstract class Vehicle {
  constructor(private readonly engine: Engine) {}

  get price(): number {
    return this.engine.price + this.bodyPrice;
  }

  get acceleration(): number {
    const weight = this.engine.weight + this.bodyWeight;
    return Math.floor((this.engine.force / weight) * 100) / 100;
  }

  protected abstract readonly bodyPrice: number;
  protected abstract readonly bodyWeight: number;
}

interface Engine {
  readonly price: number;
  readonly weight: number;
  readonly force: number;
}

class AwesomeEngine implements Engine {
  readonly price = 100;
  readonly weight = 1;
  readonly force = 50;
}

class NormalEngine implements Engine {
  readonly price = 50;
  readonly weight = 2;
  readonly force = 30;
}

class Car extends Vehicle {
  protected readonly bodyPrice = 200;
  protected readonly bodyWeight = 20;
}

class Bus extends Vehicle {
  protected readonly bodyPrice = 450;
  protected readonly bodyWeight = 50;
}

// bridgeの右側と左側での組み合わせに関して、制約を表現するためにabstract factoryパターンを利用する
interface VehicleFactory {
  create(): Vehicle;
}

export class NormalCarFactory implements VehicleFactory {
  create(): Vehicle {
    return new Car(new NormalEngine());
  }
}

export class AwesomeCarEngineFactory implements VehicleFactory {
  create(): Vehicle {
    return new Car(new AwesomeEngine());
  }
}

export class BusFactory implements VehicleFactory {
  create(): Vehicle {
    return new Bus(new AwesomeEngine());
  }
}
