const supertest = require("supertest");
const misc = require("../src/handlers/misc");
const mock = require("mock-fs");

describe("testing with no file supplied", () => {
  //   beforeEach(() => {
  //     mock();
  //   });
  //   it("returns a status code of 500 when no index file exists", () => {
  //     return supertest(misc).get("/").expect(500);
  //   });
  it("returns h1 server error", () => {
    return supertest(misc)
      .get("/main.js")
      .then((response) => expect(response.text).toBe("<h1>Server Error</h1>"));
  });

  //   afterEach(() => {
  //     mock.restore();
  //   });
});
describe("testing with valid assets", () => {
  it("returns a status code of 200", () => {
    return supertest(misc)
      .get("/main.css")
      .expect(200)
      .then((response) => expect(response.status).toBe(200));
  });
});
