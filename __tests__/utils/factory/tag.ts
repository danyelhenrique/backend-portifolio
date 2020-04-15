import factory, { Static } from "factory-girl";
import { Tag, TTag } from "../../../src/api/models/Project";
import faker from "faker";

class Build {
  public Factory: Static;
  public SentencesLength: number;

  constructor() {
    this.Factory = factory;
    this.SentencesLength = 40;

    this.define();
  }

  get generate(): Promise<TTag> {
    return this.Factory.create("tag");
  }

  define(): void {
    factory.define("tag", Tag, {
      name: faker.lorem.words(2)
    });
  }
}

export default Build;
