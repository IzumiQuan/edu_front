import request from "@/utils/request"
let url = "http://localhost:8080/api/course"
export async function query(data) {
    return await request.post(url + "/query", data)
}