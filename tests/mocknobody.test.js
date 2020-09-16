const supertest = require('supertest')
const mocknobody = require('../src/mocknobody');

describe('Test endpoints', () => {

  it('GET /ping', async () => {
    const res = await supertest(mocknobody).get('/ping')
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual("pong")
  })

  it('POST /test-object', async () => {
    const res = await supertest(mocknobody).post('/test-object')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({ "key": "value" })
  })

  it('PUT /test-object-with-headers', async () => {
    const res = await supertest(mocknobody).put('/test-object-with-headers')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({ "key": "value" })
  })

  it('PATCH /test-patch', async () => {
    const res = await supertest(mocknobody).patch('/test-patch')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({ "key": "value" })
  })

  it('DELETE /test-delete', async () => {
    const res = await supertest(mocknobody).delete('/test-delete')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({ "key": "value" })
  })

  it('not_found route', async () => {
    const res = await supertest(mocknobody).get('/invalid_route')
    expect(res.statusCode).toEqual(404)
  })
})

afterAll(() => {
  console.log('Closing test...');
  mocknobody.close();
});
