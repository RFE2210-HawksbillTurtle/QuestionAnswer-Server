const chakram = require('chakram');
expect = chakram.expect;

describe('qa/questions', () => {

  describe('Get all questions for product_id', () => {
    it('should respond with a 200', async () => {
      let response = await chakram.get("http://localhost:3000/qa/questions/37311");
      return expect(response).to.have.status(200);
    })

    it('should have data in results array', async () => {
      let response = await chakram.get("http://localhost:3000/qa/questions/37311")
      return expect(response).to.have.json((json) => {
        expect(json.results).to.be.an('array');
        expect(json.results.length).to.be.above(0);
      })
    })

    it('should return an empty array when product doesn\'t exist', async () => {
      let response = await chakram.get("http://localhost:3000/qa/questions/9999999")
    return expect(response).to.have.json((json) => {
      expect(json.results).to.be.an('array');
      expect(json.results.length).to.eq(0);
      })
    })
  })

  describe('Get answers for Product_id', () => {
    it('should respond with a 200', async () => {
      let response = await chakram.get("http://localhost:3000/qa/questions/131232/answers")
      return expect(response).to.have.status(200);
    })

    it('should have data in results array', () => {
      let response = chakram.get("http://localhost:3000/qa/questions/131232/answers")
      return expect(response).to.have.json((json) => {
        expect(json.results).to.be.an('array');
          expect(json.results.length).to.be.above(0);
      })
    })

    it('should return an empty array when question doesn\'t exist', async () => {
      let response = await chakram.get("http://localhost:3000/qa/questions/99999999/answers")
      return expect(response).to.have.json((json) => {
        expect(json.results).to.be.an('array');
        expect(json.results.length).to.eq(0);
      })
    })
  })

  describe('Add questions to database', () => {
    it('should respond with a 201', async () => {
      let date = Date.now();
      let response = await chakram.post("http://localhost:3000/qa/questions/", {
        product_id: 37318,
        body: 'testing question',
        date_written: date,
        name: 'John Wick',
        email: 'j.wick@example.com'
      });
      return expect(response).to.have.status(201);
    })
  })

  describe('Add answers for given question_id', () => {
    it('should respond with 201 without photos', async () => {
      let response = await chakram.post("http://localhost:3000/qa/questions/3518964/answers", {
        question_id: 3518964,
        body: 'testing answer',
        name: 'John Wick',
        email: 'j.wick@example.com',
        photos: []
      })
      return expect(response).to.have.status(201);
    })

    it('should respond with 201 with photos', async () => {
      let response = await chakram.post("http://localhost:3000/qa/questions/3518964/answers", {
        question_id: 3518964,
        body: 'testing answer',
        name: 'John Wick',
        email: 'j.wick@example.com',
        photos: ["https://haieng.com/wp-content/uploads/2017/10/test-image-500x500.jpg",
        "https://haieng.com/wp-content/uploads/2017/10/test-image-500x500.jpg",
        "https://haieng.com/wp-content/uploads/2017/10/test-image-500x500.jpg"]
      })
      return expect(response).to.have.status(201);
    })
  })
})


