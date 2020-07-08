const router = require("../router");
const supertest = require("supertest");

it("returns a status code of 200 on the home root", () => {
  return supertest(router)
    .get("/")
    .expect(200)
    .expect("content-type", "text/html")
    .then((response) => expect(response.status).toBe(200));
});

it("returns a status code of 302 on the create/post root", () => {
  return supertest(router)
    .get("/create/post")
    .expect(302)
    .then((response) => expect(response.status).toBe(302));
});

it("returns a status code of 200 on the /posts root", () => {
  return supertest(router)
    .get("/posts")
    .expect(200)
    .expect("content-type", "application/json")
    .then((response) => expect(response.status).toBe(200));
});

it("returns a status code of 200 when using different file types", () => {
  return (
    supertest(router)
      .get("/main.css")
      .expect(200)
      //.expect("content-type", "application/json")
      .then((response) => expect(response.status).toBe(200))
  );
});

// it("utilises the miscHandler for requests that are not otherwise handled", () => {
//   //Checks if miscHandler is called exactly once
//   //const mockCallBack = jest.fn(miscHandler);
//   // console.log(miscHandler);
//   //console.log(mockCallBack);
//   return supertest(router)
//     .get("/main.css")
//     .then((response) => expect(response.status).toBe(200));
//   //.then(expect(mockCallBack).toHaveBeenCalledTimes(1));
// });
