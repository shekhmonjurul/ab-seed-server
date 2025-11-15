const fetchData = async (url, option = {}) => {
    const res = await fetch(url, option)
    return await res.json()
}

export default fetchData