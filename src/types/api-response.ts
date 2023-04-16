export interface ApiResponseSuccess<T> {
  data: T
}
export interface ApiResponseError {
  error: string
}

export interface PaginatedResponse<T> extends ApiResponseSuccess<T> {
  totalPages: number
  nextPage: number | null
  prevPage: number | null
}
