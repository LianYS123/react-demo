const request = (url) => {
    return fetch(url).then(res => res.json());
}

export default request;