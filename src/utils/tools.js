export function formatDate(date) {
    const data = new Date(date);
    const month = (data.getMonth() + 1).toString().padStart(2, "0");
    const day = data.getDate().toString().padStart(2, "0");
    const year = data.getFullYear()
    const week = ["周一", "周二", "周三", "周四", "周五", "周六", "周天"]
    const wekday = week[(data.getDay() + 1)]
    const hours = data.getHours()
    const minitues = data.getMinutes()
    const seconds = data.getSeconds()
    return year + "-" + month + "-" + day + wekday + "   " + hours + ":" + minitues + ":" + seconds
}