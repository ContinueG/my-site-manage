import request from "@/utils/request"
export function getMessage(page = 1, limit = 5) {
    return request({
        url: "/api/message",
        method: "get",
        query: {
            page,
            limit
        }
    })
}

export function putMessage(data) {
    return request({
        url: "/api/message",
        method: "post",
        data
    })
}

export function deleteMessage(id) {
    return request({
        url: `/api/message/${id}`,
        method: "delete",
    })
}