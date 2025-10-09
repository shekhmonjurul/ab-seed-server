export const fetchData = async(url, option)=>{
    const res = await fetch(url, option)
    return res.json()
}
