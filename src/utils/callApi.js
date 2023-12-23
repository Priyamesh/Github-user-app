const callApi = (url) => {
    const apidata = fetch(url)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log("datatyaaaaa", data);
            return data
            // setRepos(data)
            // console.log("set item", { data });
            // localStorage.setItem(user_id, JSON.stringify(data))
        });

    return apidata
}

module.exports = { callApi }