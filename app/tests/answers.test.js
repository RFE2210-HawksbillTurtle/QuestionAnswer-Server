const chakram = require('chakram');
expect = chakram.expect;

let qId = 3518964
let fakeId = 9999999999999

describe('qa/answers', () => {

  describe('Marking Question As Helpful', () => {
    it('Should Mark answer as helpful', async () => {
      let response = await chakram.put(`http://localhost:3000/qa/answers/${qId}/helpful`)
      expect(response).to.have.status(204);
    })

    it('should respond with 500 when answer_id is invalid ', async () => {
      let response = await chakram.put(`http://localhost:3000/qa/answers/${fakeId}/helpful`)
      expect(response).to.have.status(500);
    })
  })

  describe('Reporting Questions', () => {
    it('should report answer', async () => {
      let response = await chakram.put(`http://localhost:3000/qa/answers/${qId}/report`)
      expect(response).to.have.status(204);
    })

    it('should respond with 500 when answer_id is invalid ', async () => {
      let response = await chakram.put(`http://localhost:3000/qa/answers/${fakeId}/report`)
      expect(response).to.have.status(500);
    })
  })
})