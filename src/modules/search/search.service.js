import { getFilterModel } from "./search.model.js"

export const getFilterService = async (filterword)=>{
    const filterorders = await getFilterModel(filterword)
    return filterorders
}