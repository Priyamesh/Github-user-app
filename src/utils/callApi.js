const callApi = (url) => {
    const apidata = fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Invalid Request")
            }
            return res.json()
        })
        .then((data) => {
            return data
        });

    return apidata
}

module.exports = { callApi }