import request from "@/utils/request"
let prefix = "/comment"
export async function add(data) {
    return await request.post(prefix + "/add", data)
}
export async function remove(data) {
    return await request.post(prefix + "/remove/" + data)
}
export async function reset(data) {
    return await request.post(prefix + "/reset", data)
}
export async function query(data) {
    return await request.post(prefix + "/query", data)
}