const db = require("../../connection");
const User = require("./userModel");
const request = require("supertest");
const server = require("../../server");

describe("auth model", () => {
  it("should set the testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  //
  describe("GET / ", () => {
    it("returns 200 ok", () => {
      return request(server).get("/").expect(200);
    });

    describe("POST /users/register", () => {
      afterEach(async () => {
        await db("users").insert();
      });
      it("should return a JSON", async () => {
        const user = { username: "paul", password: "ab" };
        const res = await request(server).post("/users/register").send(user);
        console.log(res.status);
        expect(res.type).toBe("application/json");
      });
    });
  });
  // });

  // describe("auth model", () => {
  //   beforeEach(async () => {
  //     await db("users").truncate;
  //   });
  //   describe("add function", () => {
  //     it("adds a user to the db", async () => {
  //       let userNumber;
  //       userNumber = await db("users");
  //       expect(userNumber).toHaveLength(9);
  //       await User.add({ username: "paul" });
  //       await User.add({ username: "lo" });

  //       userNumber = await db("users");
  //       expect(userNumber).toHaveLength(11);
  //     });
  //   });
});
