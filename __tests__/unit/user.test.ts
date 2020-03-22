import mongoose from "mongoose";

import Request from "supertest";
import Server from "./../../src/server";

import jestMongo from "../../src/config/jestMongo";
import User, { IUser } from "../../src/api/models/User";
import UserFactory from "../utils/factory/user";

const App = Server.app;
const userFactory: UserFactory = new UserFactory();

let user: IUser;

describe("@USER-> Should create read update and delete user", () => {
  beforeAll(async () => {
    try {
      console.log("intialization connection");
      const url = await jestMongo();
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      });
      user = await userFactory.generate;
    } catch (error) {
      console.log("Fail to intit mongoJest");
    }
  });

  afterAll(async () => {
    try {
      console.log("close connection");
      await User.deleteMany({});
      await mongoose.connection.close();
    } catch (error) {
      console.log("Fail to close mongoJest");
    }
  });

  beforeEach(async () => {
    console.log("delete Db");
    await User.deleteMany({});
  });

  it("Should create new user with the right parameters and status 200", async () => {
    const response = await Request(App)
      .post("/users")
      .send(user);

    expect(response.status).toBe(200);
    expect(response.body.user.name).toBe(user.name);
    expect(response.body.user.avatar_url).toBe(user.avatar_url);
    expect(response.body.user.email).toBe(user.email);
  });

  it("Should create user on database and return json with same object that was send", async () => {
    const response = await Request(App)
      .post("/users")
      .send(user);

    expect(response.body.user.name).toBe(user.name);
    expect(response.body.user.avatar_url).toBe(user.avatar_url);
    expect(response.body.user.email).toBe(user.email);
  });

  it("Should fail to create new user with the wrong parameters and status 500", async () => {
    const response = await Request(App)
      .post("/users")
      .send();

    expect(response.status).toBe(500);
    expect(Object.keys(response.body).toString()).toContain("err");
  });

  it("Should fail to update user when not have Headers token  and status 500", async () => {
    const response = await Request(App)
      .put("/users")
      .send();

    expect(response.status).toBe(401);
    expect(Object.keys(response.body).toString()).toContain("err");
  });

  it("Should fail to get user when not have Headers token  and status 500", async () => {
    const response = await Request(App)
      .put("/users")
      .send();

    expect(response.status).toBe(401);
    expect(Object.keys(response.body).toString()).toContain("err");
  });

  it("Should fail to get user on wrong Headers token  and status 500", async () => {
    const response = await Request(App)
      .put("/users")
      .send()
      .set("authorization", "bearer blahblahblah");

    expect(response.status).toBe(401);
    expect(Object.keys(response.body).toString()).toContain("err");
  });
});
