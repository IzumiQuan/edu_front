import request from "@/utils/request"
let url = "http://localhost:8080/api/user"
export async function regist(data) {
    console.log(url)
    return await request.post(url + "/regist", data)
}
export async function login(data) {
    return await request.post(url + "/login", data)
}
export async function getAvatar(data) {
    return await request.post(baseUrl + "/avatar", data)
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