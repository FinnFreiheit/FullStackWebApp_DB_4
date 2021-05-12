const express = require("express"); // import express
const serverRoutes = require("./db.js"); //import file we are testing
var supertest = require('supertest'); // supertest is a framework that allows to easily test web apis
const request = supertest('http://localhost:3000')
const app = express(); //an instance of an express app, a 'fake' express app


// Creat TestData
it("POST /singers ", async () => {
  testData = await request.post('/singers').send({
    "LastName": "Test1",
    "FirstName": "Test2",
    "BirthYear": 1997
  });
  expect(testData.status).toEqual(200);
});

it("GET by ID /singers", async () => {
  getByID = await request.get(`/singers/${testData.body.id}`); 
  expect(getByID.status).toEqual(200); 
  expect(getByID.body.LastName).toBe("Test1");
});

it("DELETE by ID /singers", async ()=>{
  // Delete TestData 
  const removedStudent = await request.delete(
    `/singers/${testData.body.id}`
  );
  expect(removedStudent.status).toEqual(200);
});

// Show all Data in Database
it("GET /singers", async () => {
  const res = await request.get('/singers');
  expect(res.status).toEqual(200);
});



