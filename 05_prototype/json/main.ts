export class Man {
  constructor(public name: string, public address: Address) {}

  clone(): Man {
    return JSON.parse(JSON.stringify(this));
  }
}

type Address = {
  country: string;
  city: string;
};
