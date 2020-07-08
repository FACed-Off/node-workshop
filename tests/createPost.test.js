// const supertest = require("supertest");
// const create = require("../src/handlers/createPost");
// const mock = require("mock-fs");

// describe("testing with no file supplied", () => {
//   beforeEach(() => {
//     mock();
//   });
//   it("returns a status code of 500 when no index file exists", () => {
//     return supertest(create).get("/create/post").expect(500);
//   });

//   afterEach(() => {
//     mock.restore();
//   });
// });
