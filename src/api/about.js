import request from '@/utils/request'

export function getURL() {
    return request({
        url: '/api/about',
        method: 'get',
    })
}

//设置首页标语
export function setURL(data) {
    return request({
        url: '/api/about',
        method: 'post',
        data
    })
}