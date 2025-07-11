import request from "@/utils/request"
let url = "http://localhost:8080/api/activity"
export async function add(data) {
    return await request.post(url + "/add", data)
}
export async function remove(data) {
    return await request.post(url + "/remove/" + data)
}
export async function set(data) {
    return await request.post(url + "/set", data)
}
export async function query(data) {
    return await request.post(url + "/query", data)
}