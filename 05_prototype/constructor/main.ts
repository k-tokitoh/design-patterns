export class Man {
  constructor(public name: string, public address: Address) {}

  clone(): Man {
    return new Man(this.name, { ...this.address });
  }
}

type Address = {
  country: string;
  city: string;
};
