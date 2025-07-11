import request from "@/utils/request"
let prefix = "/course"
export async function add(data) {
    return await request.post(prefix + "/add", data)
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