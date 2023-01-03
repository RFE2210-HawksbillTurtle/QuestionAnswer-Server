const chakram = require('chakram');
expect = chakram.expect;

describe('Questions', () => {
  it('should respond with a 200', () => {
    let response = chakram.get("http://localhost:3000/qa/questions/37311");
    return expect(response).to.have.status(200);
  })

  it('should have data in results array', async () => {
     let response = await chakram.get("http://localhost:3000/qa/questions/37311")
    return expect(response).to.have.json((json) => {
      expect(json.results).to.be.an('array');
      expect(json.results.length).to.be.above(0);
     })


  })
})
