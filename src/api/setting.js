import request from '@/utils/request'

export function getSetting() {
    return request({
        url: '/api/setting',
        method: 'get',
    })
}

//设置首页标语
export function setSetting(data) {
    return request({
        url: '/api/setting',
        method: 'post',
        data
    })
}