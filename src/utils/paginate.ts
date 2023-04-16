export interface PaginateResult {
  nextPage: number | null
  prevPage: number | null
  totalPages: number
  skip: number
  take: number
}
export const paginate = (
  totalItems: number,
  currentPage: number,
  limit = 10
): PaginateResult => {
  const skip = (currentPage - 1) * limit
  const totalPages = Math.ceil(totalItems / limit)
  const nextPage = currentPage + 1 <= totalPages ? currentPage + 1 : null
  const prevPage = currentPage - 1 >= 1 ? currentPage - 1 : null
  return {
    nextPage,
    prevPage,
    totalPages,
    skip,
    take: limit,
  }
}
