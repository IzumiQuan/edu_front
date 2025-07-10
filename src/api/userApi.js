import request from "@/utils/request"
let baseUrl = "http://localhost:8080/api/user"
export async function regist(data) {
    return await request.post(baseUrl + "/regist", data)
}
export async function login(data) {
    return await request.post(baseUrl + "/login", data)
}

export async function getAvatar(data) {
    return await request.post(baseUrl + "/avatar", data)
}
export async function remove(data) {
    return await request.post(baseUrl + "/remove?id=" + data)
}

export async function set(data) {
    return await request.post(baseUrl + "/set", data)
}

export async function query(data) {
    return await request.post(baseUrl + "/query", data)
}