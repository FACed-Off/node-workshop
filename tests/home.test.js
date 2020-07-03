const supertest = require("supertest");
const router = require("../router");
const home = require("../src/handlers/home");

// describe("Sample Test", () => {
//   it("should test that true === true", () => {
//     expect(true).toBe(true);
//   });
// });

test("Home route returns a status code of 200", () => {
  //console.log(supertest(router).get("/"));
  return supertest(router)
    .get("/")
    .expect(200)
    .expect("content-type", "text/html")
    .end((err, res) => {
      if (err) throw err;
    });
});

// test("readFile method returns error upon failure", () => {
//   return supertest(home)
//     .get("")
//     .expect(404)
//     .expect("content-type", "text/html");
// });
