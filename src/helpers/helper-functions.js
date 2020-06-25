export const defaultPageSize = 3;

export const paginate = (size = defaultPageSize, page = 0, elements = []) => {

    // size: total elements on a page
    // page: current active page

    const startIndex = page * size;
    const finalIndex = startIndex + size;

    return elements.slice(startIndex, finalIndex)
}