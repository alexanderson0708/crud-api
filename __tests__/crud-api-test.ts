import {describe} from "node:test";
import {server} from "../src";
import request from "supertest";
import {HttpCode, UserDto} from "../src/api/interfaces";
import {randomUUID} from "node:crypto";

const testDataPost:UserDto = {
    username:"Valera",
    age:23,
    hobbies:["music"]
}
const testDataUpdate:UserDto = {
    username:"Vyacheslave",
    age:25,
    hobbies:["Angular"]
}

describe('CRUD-API-TEST', ()=>{
    afterAll((done)=>{
        server.close()
        done()
    })

    describe("SCENARIO #1 - check correct data in crud operation", () => {
        it("return empty array with status code 200", async ()=>{
            await request(server).get('/api/users').expect(HttpCode.OK, [])
        })
        it("create and delete user", async ()=>{
            const postUser = await request(server).post('/api/users').send(testDataPost)
            expect(postUser.statusCode).toBe(HttpCode.CREATED)
            expect(postUser.body).toEqual({
                ...testDataPost,
                id: postUser.body.id
            })
            await request(server).get('/api/users').expect(HttpCode.OK, [postUser.body])
            const deleteUser = await request(server).delete(`/api/users/${postUser.body.id}`)
            expect(deleteUser.statusCode).toBe(HttpCode.DELETED)
            await request(server).get('/api/users').expect(HttpCode.OK, [])
        })
        it("update user", async ()=>{
            const postUser = await request(server).post('/api/users').send(testDataPost)
            expect(postUser.body).toEqual({
                ...testDataPost,
                id: postUser.body.id
            })
            expect(postUser.statusCode).toBe(HttpCode.CREATED)
            const putUser = await request(server).put(`/api/users/${postUser.body.id}`).send(testDataUpdate)
            expect(putUser.statusCode).toBe(HttpCode.OK)
            expect(putUser.body).toEqual({
                ...testDataUpdate,
                id:postUser.body.id
            })
        })
    })
    describe("SCENARIO #2 - check error #400,401,404", () => {
        it("check invalid id (error #400)", async ()=>{
            const getUser = await request(server).get('/api/users/user-id')
            expect(getUser.statusCode).toBe(HttpCode.BAD_REQUEST)
            const postUser = await request(server).post('/api/users/user-id').send(testDataPost)
            expect(postUser.statusCode).toBe(HttpCode.BAD_REQUEST)
            const putUser = await request(server).put('/api/users/user-id').send(testDataUpdate)
            expect(putUser.statusCode).toBe(HttpCode.BAD_REQUEST)
            const deleteUser = await request(server).delete('/api/users/user-id')
            expect(deleteUser.statusCode).toBe(HttpCode.BAD_REQUEST)
        })
        it("check user is exist (error #404)", async ()=>{
            const postUser = await request(server).post('/api/users').send(testDataPost)
            expect(postUser.body).toEqual({
                ...testDataPost,
                id: postUser.body.id
            })
            const randomID = randomUUID()
            const getUser = await request(server).get(`/api/users/${randomID}`)
            expect(getUser.statusCode).toBe(HttpCode.NOT_FOUND)
            const putUser = await request(server).put(`/api/users/${randomID}`).send(testDataUpdate)
            expect(putUser.statusCode).toBe(HttpCode.NOT_FOUND)
            const deleteUser = await request(server).delete(`/api/users/${randomID}`)
            expect(deleteUser.statusCode).toBe(HttpCode.NOT_FOUND)
        })
    })
    describe("SCENARIO #3 - check body", () => {
        it("check required fields in body (error #400)", async ()=>{
            const postUserInvalidName = await request(server).post('/api/users').send(
                {
                    username:5555,
                    age:25,
                    hobbies:["Angular"]
                }
            )
            expect(postUserInvalidName.statusCode).toBe(HttpCode.BAD_REQUEST)
            const postUserInvalidAge = await request(server).post('/api/users').send(
                {
                    username:"Vyacheslave",
                    age:"asdasdasd",
                    hobbies:["Angular"]
                }
            )
            expect(postUserInvalidAge.statusCode).toBe(HttpCode.BAD_REQUEST)
            const postUserInvalidHobbies = await request(server).post('/api/users').send(
                {
                    username:"Vyacheslave",
                    age:25,
                }
            )
            expect(postUserInvalidAge.statusCode).toBe(HttpCode.BAD_REQUEST)
        })
    })
})

