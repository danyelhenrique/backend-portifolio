import Request from "supertest";

import Server from "./../../src/server";

const App = Server.app;

describe("@ROOT -> Should send  server is running o root router", () => {
  it("return status 200 and msg server is running", async () => {
    const response = await Request(App)
      .get("/")
      .send();

    expect(response.status).toBe(200);
    expect(response.body.msg).toEqual("Server is Running");
  });
});
