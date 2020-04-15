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
    expect(response.body.user).toMatchObject({
      name: user.name,
      avatar_url: user.avatar_url,
      email: user.email
    });
  });

  it("Should create user on database and return json with same object that was send", async () => {
    const response = await Request(App)
      .post("/users")
      .send(user);

    expect(response.body.user).toMatchObject({
      name: user.name,
      avatar_url: user.avatar_url,
      email: user.email
    });
  });

  it("Should fail to create new user with the wrong parameters and status 500", async () => {
    const response = await Request(App)
      .post("/users")
      .send();

    expect(response.status).toBe(500);
    expect(Object.keys(response.body).toString()).toContain("err");
  });

  it("Should fail to update user when not have Headers token  and status 401", async () => {
    const response = await Request(App)
      .put("/users")
      .send();

    expect(response.status).toBe(401);
    expect(Object.keys(response.body).toString()).toContain("err");
  });

  it("Should success to update user when have Headers token and return status 200", async () => {
    await Request(App)
      .post("/users")
      .send(user);

    const { body } = await Request(App)
      .post("/signin")
      .send(user);

    const response = await Request(App)
      .put("/users")
      .set("authorization", `bearer ${body.token}`)
      .send({ name: "fidel" });

    expect(response.status).toBe(200);
    expect(response.body.user.name).toBe("fidel");
  });

  it("Should fail to update user on wrong _id and return status 500", async () => {
    const wrongUserIdOnToken =
      "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNzdkZmFlODMxYzJhMjgzMDRjYTFiMCIsIm5hbWUiOiJQYXVsYSBDdW1taW5ncyIsImlhdCI6MTU4NDkxNDM1MCwiZXhwIjoxNTg1NTE5MTUwfQ.NGy18GgXm16zfeEnWrk8ZLwEuMkApYYGRhPU6eRtb5w";

    const response = await Request(App)
      .put("/users")
      .set("authorization", wrongUserIdOnToken)
      .send({ name: "fidel" });

    expect(response.status).toBe(401);
  });

  it("Should success to show user when have Headers token and return status 200", async () => {
    await Request(App)
      .post("/users")
      .send(user);

    const { body } = await Request(App)
      .post("/signin")
      .send(user);

    const response = await Request(App)
      .get("/users")
      .set("authorization", `bearer ${body.token}`);

    expect(response.status).toBe(200);
  });

  it("Should fail to show user on wrong _id and return status 500", async () => {
    const wrongUserIdOnToken =
      "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNzdkZmFlODMxYzJhMjgzMDRjYTFiMCIsIm5hbWUiOiJQYXVsYSBDdW1taW5ncyIsImlhdCI6MTU4NDkxNDM1MCwiZXhwIjoxNTg1NTE5MTUwfQ.NGy18GgXm16zfeEnWrk8ZLwEuMkApYYGRhPU6eRtb5w";

    const response = await Request(App)
      .get("/users")
      .set("authorization", wrongUserIdOnToken)
      .send({ name: "fidel" });

    expect(response.status).toBe(401);
  });

  it("Should fail to update user when not have Headers token and return status 401", async () => {
    const response = await Request(App)
      .put("/users")
      .send();

    expect(response.status).toBe(401);
    expect(Object.keys(response.body).toString()).toContain("err");
  });

  it("Should fail to get user on wrong Headers token and return status 500", async () => {
    const response = await Request(App)
      .put("/users")
      .send()
      .set("authorization", "bearer blahblahblah");

    expect(response.status).toBe(401);
    expect(Object.keys(response.body).toString()).toContain("err");
  });

  it("Should fail to destroy user with the wrong _id return status 500", async () => {
    const wrongUserIdOnToken =
      "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNzdkZmFlODMxYzJhMjgzMDRjYTFiMCIsIm5hbWUiOiJQYXVsYSBDdW1taW5ncyIsImlhdCI6MTU4NDkxNDM1MCwiZXhwIjoxNTg1NTE5MTUwfQ.NGy18GgXm16zfeEnWrk8ZLwEuMkApYYGRhPU6eRtb5w";

    const response = await Request(App)
      .post("/signin")
      .send()
      .set("authorization", wrongUserIdOnToken);

    expect(response.status).toBe(500);
    expect(Object.keys(response.body).toString()).toContain("err");
  });

  it("Should sucess to destroy user and return status 200", async () => {
    await Request(App)
      .post("/users")
      .send(user);

    const { body } = await Request(App)
      .post("/signin")
      .send(user);

    const response = await Request(App)
      .delete("/users")
      .set("authorization", `bearer ${body.token}`)
      .send();

    expect(response.status).toBe(200);
  });
});
