const chakram = require('chakram');
expect = chakram.expect;

describe('qa/questions', () => {

  describe('/:product_id', () => {
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

  describe('/:question_id/answers', () => {
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
})


