// 既に車種という軸で継承関係を利用している
// そのため、車種とは独立しているエンジンという軸に関してはこのクラスの継承関係を利用することができない
// このbadな例では、同一のクラスの中で複数のエンジンについて都度分岐処理で処理している
// オープンクローズドの原則に反している
abstract class Vehicle {
  constructor(private readonly engine: "awesome" | "normal") {}

  get price(): number {
    const enginePrice = this.engine === "awesome" ? 100 : 50;
    return enginePrice + this.bodyPrice;
  }

  protected abstract readonly bodyPrice: number;
  protected abstract readonly bodyWeight: number;

  get acceleration(): number {
    const engineWeight = this.engine === "awesome" ? 1 : 2;
    const weight = engineWeight + this.bodyWeight;
    const force = this.engine === "awesome" ? 50 : 30;
    return Math.floor((force / weight) * 100) / 100;
  }
}

export class Car extends Vehicle {
  protected readonly bodyPrice = 200;
  protected readonly bodyWeight = 20;
}

export class Bus extends Vehicle {
  protected readonly bodyPrice = 450;
  protected readonly bodyWeight = 50;
}
