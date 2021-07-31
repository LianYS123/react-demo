// 延迟函数
export const delay = (t = 500) => new Promise(resolve => setTimeout(resolve, t));
export const getFakeData = (data, t) => delay(t).then(() => data);