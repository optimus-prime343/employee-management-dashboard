import axios from 'axios'

import { API_ENDPOINTS } from '@/constants/api-endpoints'

export const api = axios.create({
  baseURL: API_ENDPOINTS.baseUrl,
})
