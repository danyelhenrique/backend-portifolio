import factory, { Static } from "factory-girl";
import User, { IUser } from "../../../src/api/models/User";
import faker from "faker";

class Build {
  public Factory: Static;
  public SentencesLength: number;

  constructor() {
    this.Factory = factory;
    this.SentencesLength = 40;

    this.define();
  }

  get generate(): Promise<IUser> {
    return this.Factory.create("user");
  }

  define(): void {
    factory.define("user", User, {
      name: faker.name.findName(),
      email: faker.internet.email(),
      avatar_url: faker.internet.avatar(),
      password: faker.internet.password(3)
    });
  }
}

export default Build;
