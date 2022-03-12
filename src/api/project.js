import request from "@/utils/request"
//请求项目
export function getProject() {
    return request({
        url: "/api/project",
        method: "get"
    })
}
//修改项目
//projectInfo{id:,data }
export function editProject(projectInfo) {
    return request({
        url: `/api/project/${projectInfo.id}`,
        method: "put",
        data: projectInfo.data
    })
}
//添加项目
export function addProject(data) {
    return request({
        url: `/api/project`,
        method: "put",
        data
    })
}
//删除项目
export function deleteProject(id) {
    return request({
        url: `/api/project/${id}`,
        method: "delete"
    })
}