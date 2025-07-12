import request from "@/utils/request"
let prefix = "/user"
export async function regist(data) {
    return await request.post(prefix + "/regist", data)
}
export async function login(data) {
    return await request.post(prefix + "/login", data)
}
export async function getAvatar(data) {
    return await request.post(prefix + "/avatar", data)
}
export async function remove(data) {
    return await request.post(prefix + "/remove/" + data)
}
export async function set(data) {
    return await request.post(prefix + "/set", data)
}
export async function query(data) {
    return await request.post(prefix + "/query", data)
}