import request from "supertest";
import { expect } from "chai";
import app from "../path/to/your/app"; // Adjust the path to your actual app

describe("Personal1 Routes", () => {
  it("should create a new personal1 entry", async () => {
    const response = await request(app)
      .post("/personal1")
      .send({ pername: "Test", quantity: 10, price: 100, dameg: 5 });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property(
      "message",
      "User created successfully",
    );
    expect(response.body.user).to.have.property("pername", "Test");
  });

  it("should get personal1 entries", async () => {
    const response = await request(app).get("/personal1");

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("data").that.is.an("array");
  });

  it("should delete a personal1 entry", async () => {
    // First, create an entry to delete
    const createResponse = await request(app)
      .post("/personal1")
      .send({ pername: "DeleteMe", quantity: 5, price: 50, dameg: 2 });

    const id = createResponse.body.user._id;

    // Then, delete the entry
    const deleteResponse = await request(app).delete(`/personal1/${id}`);

    expect(deleteResponse.status).to.equal(200);
    expect(deleteResponse.body).to.have.property(
      "message",
      "Item deleted successfully",
    );
  });

  // Add more tests for other routes as needed
});
