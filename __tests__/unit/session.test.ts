import mongoose from "mongoose";

import Request from "supertest";
import Server from "./../../src/server";

import jestMongo from "../../src/config/jestMongo";
import User, { IUser } from "../../src/api/models/User";
import UserFactory from "../utils/factory/user";

const App = Server.app;
const userFactory: UserFactory = new UserFactory();

let user: IUser;
describe("@SESSION -> Should create token on user sigin", () => {
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

  it("Should create token with the right parameters to sigin and return status 200", async () => {
    await Request(App)
      .post("/users")
      .send(user);

    const response = await Request(App)
      .post("/signin")
      .send(user);

    expect(Object.keys(response.body).toString()).toContain("token");
  });

  it("Should fail to create token with the wrong parameters return status 500 and failt  to sigin", async () => {
    await Request(App)
      .post("/users")
      .send(user);

    const response = await Request(App)
      .post("/signin")
      .send();

    expect(response.status).toBe(500);
    expect(Object.keys(response.body).toString()).not.toContain("token");
  });

  it("Should fail to create token with no password and return  status 500 and failt  to sigin", async () => {
    await Request(App)
      .post("/users")
      .send(user);

    const response = await Request(App)
      .post("/signin")
      .send({ email: user.email });

    expect(response.status).toBe(500);
    expect(Object.keys(response.body).toString()).not.toContain("token");
  });
});
