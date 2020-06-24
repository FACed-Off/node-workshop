const handlers = require("./handlers");
const supertest = require("supertest");

  
  it("should check status code is 200", () => {
    return supertest(handlers)
      .get("/")
      .expect(200)
      .expect("Content-Type", "text/html")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });


  it("should check status code is 200 with await",   async () => {
    const response = await supertest(handlers).get("/");
    console.log(response.text)
    console.log(response.statusCode)
    console.log(response.header)

    expect(response.statusCode).toBe(200);
  });


