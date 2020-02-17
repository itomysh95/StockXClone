const {getSneaker,
    createSneaker,
    getSneakers,
    updateSneakerInfo,
    deleteSneaker,
    getId} = require('../../tables/sneakerTable')
const {setupTestTable,dropTestTable} = require('../fixtures/testDataSetup')
const app = require('../../app/app')
const request = require('supertest')

// set up test database
beforeAll(async()=>{
    await dropTestTable()
    await setupTestTable()
})

// run setup database to create tables before each
beforeEach(async()=>{
})

// run setup database to drop tables after each
afterEach(async()=>{
})

// creating a new sneaker with a valid brand
test('should return a newly created sneaker',async()=>{
    const sneaker = {
        "sneakerName":"Green Turbo Jordan 1",
        "quantity":5,
        "amountSold":0,
        "sneakerInfo": "A green jordan 1 colorway",
        "brandName":"Jordan"
    }
    const response = await request(app)
    .post('/sneaker')
    .send(sneaker)
    .expect(201)
    expect(response).toMatchObject({
        ...sneaker
    })
})

// creating a new sneaker with a invalid brand
test('should return an error',async()=>{
    const sneaker ={
        "sneakerName":"Green Turbo Jordan 1",
        "quantity":5,
        "amountSold":0,
        "sneakerInfo": "A green jordan 1 colorway",
        "brandName":"Nike"
    }
    const response = await request(app)
    .post('/sneaker')
    .send(sneaker)
    .expect(400)
    expect(response).toMatchObject({
        "error": "Key (brandName)=(Nikeee) is not present in table \"brand\"."
    })
})

// getting a sneaker
test('should return a sneaker object', async ()=>{
    // const response = await request(app)
    // .get('/sneaker/')
    // .send()
    // .expect(201)
    // expect(response.body).toBe({

    // })
})

// getting a sneaker that doesn't exist in DB
test('Should return sneaker does not exist error message',()=>{

})

// get all sneakers of a brand
test('should return all sneakers of a brand',()=>{

})



// creating a sneaker that already exists in DB
test('should return error message, sneaker already exists',()=>{

})

// updating sneaker info 
test('should return the sneaker with the updated info',()=>{

})

// updating sneaker that does not exist info
test('should return error sneaker does not exist',()=>{

})

// deleteing a sneaker from DB
test('should return deleted sneaker',()=>{

})

// deleting a sneaker that doesn't exist in DB
test('should return error message',()=>{

})