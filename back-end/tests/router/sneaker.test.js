const {getSneaker,
    createSneaker,
    getSneakers,
    updateSneakerInfo,
    deleteSneaker,
    getId} = require('../../tables/sneaker-table')
const {setupTestTable,dropTestTable} = require('../fixtures/test-data-setup')
const app = require('../../app/app')
const request = require('supertest')

// set up test database
beforeAll(async()=>{
    // await dropTestTable()
    // await setupTestTable()
})

// run setup database to create tables before each
beforeEach(async()=>{
})

// run setup database to drop tables after each
afterEach(async()=>{
})


// creating a new sneaker
test('should create a new sneaker',async()=>{
    // const sneaker = {
    //     "sneakerName":"Green Turbo Jordan 1",
    //     "quantity":5,
    //     "amountSold":0,
    //     "sneakerInfo": "A green jordan 1 colorway",
    //     "brandName":"Jordan"
    // }
    // const response = await request(app)
    // .post('/sneaker')
    // .send(sneaker)
    // .expect(201)
    // expect(response).toMatchObject({
    //     ...sneaker
    // })
})

// invalid sneaker creation
test('should not create a new sneaker',async()=>{
    // const sneaker ={
    //     "sneakerName":"Green Turbo Jordan 1",
    //     "quantity":5,
    //     "amountSold":0,
    //     "sneakerInfo": "A green jordan 1 colorway",
    //     "brandName":"Nike"
    // }
    // const response = await request(app)
    // .post('/sneaker')
    // .send(sneaker)
    // .expect(400)
    // expect(response).toMatchObject({
    //     "error": "Key (brandName)=(Nikeee) is not present in table \"brand\"."
    // })
})

// fetch a valid sneaker info
test('should fetch a sneaker object', async ()=>{
    // const response = await request(app)
    // .get('/sneaker/')
    // .send()
    // .expect(201)
    // expect(response.body).toBe({

    // })
})

// fetch invalid sneaker info
test('Should not fetch the sneaker ',()=>{

})

// fetch all sneakers of a brand
test('should fetch all sneakers of a brand',()=>{

})


// updating sneaker info 
test('should update a sneaker info',()=>{

})

// updating invalid sneaker info
test('should fail to update sneaker info',()=>{

})

// deleteing a sneaker from DB
test('should delete the sneaker',()=>{

})

// deleting an invalid sneaker
test('should not delete the sneaker',()=>{

})