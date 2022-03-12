import request from '@/utils/request'

export function getBlog(page = 1, limit = 10) {
    return request({
        url: '/api/blog',
        method: 'get',
        params: {
            page,
            limit
        }
    })
}
//删除单页博客
export function deleteOneBlog(id) {
    return request({
        url: `/api/blog/${id}`,
        method: 'delete',
    })
}

//发布博客
export function putOneBlog(data) {
    return request({
        url: "/api/blog",
        method: "put",
        data
    })
}

//修改博客
export function editBlog(blogInfo) {
    return request({
        url: `/api/blog${blogInfo.id}`,
        method: "put",
        data: blogInfo.data
    })
}

// 根据 id 查找某一篇文章
export function findOneBlog(id) {
    return request({
        url: `/api/blog/${id}`,
        method: 'get'
    })
}