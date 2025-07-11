import request from "@/utils/request"
let baseUrl = "http://localhost:8080/api/activity"
export async function add(data) {
    return await request.post(baseUrl + "/add", data)
}

export async function remove(data) {
    return await request.post(baseUrl + "/remove/" + data)
}

export async function set(data) {
    return await request.post(baseUrl + "/set", data)
}

export async function query(data) {
    return await request.post(baseUrl + "/query", data)
}