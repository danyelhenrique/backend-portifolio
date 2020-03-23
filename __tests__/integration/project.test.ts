import mongoose from "mongoose";

import Request from "supertest";
import Server from "./../../src/server";

import jestMongo from "../../src/config/jestMongo";
import Project, { IProject } from "../../src/api/models/Project";
import ProjectFactory from "../utils/factory/project";
import User, { IUser } from "../../src/api/models/User";
import UserFactory from "../utils/factory/user";

const App = Server.app;
const projectFactory: ProjectFactory = new ProjectFactory();
const userFactory: UserFactory = new UserFactory();

let user: IUser;
let project: IProject;
describe("@PROJECT -> Should create read update and delete project", () => {
  beforeAll(async () => {
    try {
      console.log("intialization connection");
      const url = await jestMongo();
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      });
      project = await projectFactory.generate;
      user = await userFactory.generate;
    } catch (error) {
      console.log("Fail to intit mongoJest");
    }
  });

  afterAll(async () => {
    try {
      console.log("close connection");
      await Project.deleteMany({});
      await User.deleteMany({});
      await mongoose.connection.close();
    } catch (error) {
      console.log("Fail to close mongoJest");
    }
  });

  beforeEach(async () => {
    console.log("delete Db");
    await Project.deleteMany({});
    await User.deleteMany({});
  });

  it("Should create project with the right parameters and return status 200", async () => {
    await Request(App)
      .post("/users")
      .send(user);

    const { body } = await Request(App)
      .post("/signin")
      .send(user);

    const response = await Request(App)
      .post("/users/projects")
      .set("authorization", `bearer ${body.token}`)
      .send(project);

    expect(response.status).toBe(200);
    expect(response.body.project).toMatchObject({
      title: project.title,
      description: project.description,
      background_url: project.background_url,
      deploy_url: project.deploy_url,
      github_url: project.github_url,
      tag: [project.tag[0], project.tag[1]]
    });
  });

  it("Should update project with the right parameters and return status 200", async () => {
    await Request(App)
      .post("/users")
      .send(user);

    const { body } = await Request(App)
      .post("/signin")
      .send(user);

    const post = await Request(App)
      .post("/users/projects")
      .set("authorization", `bearer ${body.token}`)
      .send(project);

    const postId = post.body.project._id;

    const UPDATEPROJECT = { title: "new title", deploy_url: "htpp://newURL" };

    const response = await Request(App)
      .put(`/users/projects/${postId}`)
      .set("authorization", `bearer ${body.token}`)
      .send(UPDATEPROJECT);

    expect(response.status).toBe(200);

    expect(response.body.project).toMatchObject({
      title: UPDATEPROJECT.title,
      description: project.description,
      background_url: project.background_url,
      deploy_url: UPDATEPROJECT.deploy_url,
      github_url: project.github_url,
      tag: [project.tag[0], project.tag[1]]
    });
  });

  it("Should show project with the right parameters and return status 200", async () => {
    await Request(App)
      .post("/users")
      .send(user);

    const { body } = await Request(App)
      .post("/signin")
      .send(user);

    const post = await Request(App)
      .post("/users/projects")
      .set("authorization", `bearer ${body.token}`)
      .send(project);

    const postId = post.body.project._id;

    const response = await Request(App)
      .get(`/users/projects/${postId}`)
      .set("authorization", `bearer ${body.token}`)
      .send();

    expect(response.status).toBe(200);

    expect(response.body.project).toMatchObject({
      title: project.title,
      description: project.description,
      background_url: project.background_url,
      deploy_url: project.deploy_url,
      github_url: project.github_url,
      tag: [project.tag[0], project.tag[1]]
    });

    expect(response.body.project).toEqual(post.body.project);
  });

  it("Should index project with the right parameters and return status 200", async () => {
    await Request(App)
      .post("/users")
      .send(user);

    const { body } = await Request(App)
      .post("/signin")
      .send(user);

    const firstProject = {
      title: "first project",
      description: "first project description",
      background_url: "http://background_url",
      deploy_url: "http://deploy_url",
      github_url: "http://github_url",
      tag: ["tag1", "ta2"]
    };

    const secondProject = {
      title: "second project",
      description: "second project description",
      background_url: "http://background_url/second",
      deploy_url: "http://deploy_url/second",
      github_url: "http://github_url/second",
      tag: ["tag1/second", "ta2/second"]
    };

    const secondThree = {
      title: "three project",
      description: "three project description",
      background_url: "http://background_url/three",
      deploy_url: "http://deploy_url/three",
      github_url: "http://github_url/three",
      tag: ["tag1/three", "ta2/three"]
    };

    /*
     * NOT Able to use prommise.all on first sencod and three request
     * why Supertest lib bug
     */

    const first = await Request(App)
      .post("/users/projects")
      .set("authorization", `bearer ${body.token}`)
      .send(firstProject);

    const second = await Request(App)
      .post("/users/projects")
      .set("authorization", `bearer ${body.token}`)
      .send(secondProject);

    const three = await Request(App)
      .post("/users/projects")
      .set("authorization", `bearer ${body.token}`)
      .send(secondThree);

    const response = await Request(App)
      .get(`/users/projects`)
      .set("authorization", `bearer ${body.token}`)
      .send();

    expect(response.status).toBe(200);

    expect(response.body.project).toEqual([
      { ...first.body.project },
      { ...second.body.project },
      { ...three.body.project }
    ]);
  });

  it("Should destoy project with the right parameters and return status 200", async () => {
    await Request(App)
      .post("/users")
      .send(user);

    const { body } = await Request(App)
      .post("/signin")
      .send(user);

    const firstProject = {
      title: "first project",
      description: "first project description",
      background_url: "http://background_url",
      deploy_url: "http://deploy_url",
      github_url: "http://github_url",
      tag: ["tag1", "ta2"]
    };

    const secondProject = {
      title: "second project",
      description: "second project description",
      background_url: "http://background_url/second",
      deploy_url: "http://deploy_url/second",
      github_url: "http://github_url/second",
      tag: ["tag1/second", "ta2/second"]
    };

    const secondThree = {
      title: "three project",
      description: "three project description",
      background_url: "http://background_url/three",
      deploy_url: "http://deploy_url/three",
      github_url: "http://github_url/three",
      tag: ["tag1/three", "ta2/three"]
    };

    /*
     * NOT Able to use prommise.all on first sencod and three request
     * why Supertest lib bug
     */

    const first = await Request(App)
      .post("/users/projects")
      .set("authorization", `bearer ${body.token}`)
      .send(firstProject);

    const second = await Request(App)
      .post("/users/projects")
      .set("authorization", `bearer ${body.token}`)
      .send(secondProject);

    const three = await Request(App)
      .post("/users/projects")
      .set("authorization", `bearer ${body.token}`)
      .send(secondThree);

    const threeId = three.body.project._id;

    const response = await Request(App)
      .del(`/users/projects/${threeId}`)
      .set("authorization", `bearer ${body.token}`)
      .send();

    expect(response.status).toBe(200);
  });
});
