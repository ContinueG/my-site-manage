import request from '@/utils/request'

export function addBlogType(data) {
    return request({
        url: '/api/blogtype',
        method: 'post',
        data
    })
}

export function getOneBlogType(id) {
    return request({
        url: `/api/blogtype/${id}`,
        method: 'get',
    })
}

export function deleteOneBlog(id) {
    return request({
        url: `/api/blogtype/${id}`,
        method: 'delete',
    })
}

export function getBlogType() {
    return request({
        url: `/api/blogtype`,
        method: 'get',
    })
}

export function changeBlogType(editInfo) {
    return request({
        url: `/api/blogtype/${editInfo.id}`,
        method: 'put',
        data: editInfo.data
    })
}



