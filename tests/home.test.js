const supertest = require("supertest");
const router = require("../router");
const mock = require("mock-fs");

const response = jest.fn();

describe("testing with no file supplied", () => {
  beforeEach(() => {
    mock();
  });
  it("returns a status code of 500 when no index file exists", () => {
    return supertest(router)
      .get("/")
      .expect(500)
      .expect("content-type", "text/html");
  });

  afterEach(() => {
    mock.restore();
  });
});

it("returns a status code of 200 on the home root", () => {
  return supertest(router)
    .get("/")
    .expect(200)
    .expect("content-type", "text/html")
    .then((response) => expect(response.status).toBe(200));
});
