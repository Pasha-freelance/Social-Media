export const changeObjectInArray = (items, objIdKeyName,objValueForIdKey, newObjProps) => {
    return items.map(item => {
        if (item[objIdKeyName] === objValueForIdKey) return {...item, ...newObjProps}
        else return item
    })
}