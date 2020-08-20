import { fetchFiltersFromServer } from '../filterService'

jest.mock('../baseService.js');

import { processRequest } from '../baseService.js';

describe('Filter service', () => {
  it('should process to fetch filter list from server', async () => {
    const spy = processRequest.mockReturnValue(Promise.resolve([]));

    const response = await fetchFiltersFromServer();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('/filters', {method:'GET'});
    expect(response).toEqual([])
  })
})