import request from '@/utils/request'

export function getAdmin() {
    return request({
        url: '/api/admin/whoami',
        method: 'get',
    })
}


export function setAdmin(data) {
    return request({
        url: '/api/admin',
        method: 'post',
        data
    })
}