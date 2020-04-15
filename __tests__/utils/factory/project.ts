import factory, { Static } from "factory-girl";
import Project, { TTag, TProject } from "../../../src/api/models/Project";
import faker from "faker";

export type TProjectWithTag = TTag | TProject | TTag[];

class Build {
  public Factory: Static;
  public SentencesLength: number;

  constructor() {
    this.Factory = factory;
    this.SentencesLength = 40;

    this.define();
  }

  get generate(): Promise<TProject> {
    return this.Factory.create("project");
  }

  define(): void {
    factory.define("project", Project, {
      title: faker.lorem.words(2),
      description: faker.lorem.sentences(50),
      background_url: faker.internet.url,
      deploy_url: faker.internet.url,
      github_url: faker.image.avatar
    });
  }
}

export default Build;
