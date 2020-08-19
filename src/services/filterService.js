import { processRequest } from './baseService';

export const fetchFiltersFromServer = () => {
  const options = {
    method:"GET"
  }
  return processRequest('/filters', options);
}