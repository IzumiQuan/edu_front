import request from "@/utils/request"
let baseUrl = "http://localhost:8080/api/class"
export async function query(data) {
    return await request.post(baseUrl + "/query", data)
}