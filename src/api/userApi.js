import request from "@/utils/request";
export async function login(data) {
    return await request.post("http://localhost:90/edu/user/login", data);
}

export async function remove(data) {
    return await request.post("http://localhost:90/edu/user/remove?id=" + data);
}

export async function set(data) {
    return await request.post("http://localhost:90/edu/user/set", data);
}

export async function query(data) {
    return await request.post("http://localhost:90/edu/user/query", data);
}