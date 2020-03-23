import factory, { Static } from "factory-girl";
import Project, { IProject } from "../../../src/api/models/Project";
import faker from "faker";

class Build {
  public Factory: Static;
  public SentencesLength: number;

  constructor() {
    this.Factory = factory;
    this.SentencesLength = 40;

    this.define();
  }

  get generate(): Promise<IProject> {
    return this.Factory.create("project");
  }

  define(): void {
    factory.define("project", Project, {
      title: faker.lorem.words(20),
      description: faker.lorem.sentences(50),
      background_url: faker.internet.url,
      deploy_url: faker.internet.url,
      github_url: faker.image.avatar,
      tag: [faker.lorem.words(10), faker.lorem.words(10)]
    });
  }
}

export default Build;
