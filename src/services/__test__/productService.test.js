import { fetchProductListFromServer } from '../productService'

jest.mock('../baseService.js');

import { processRequest } from '../baseService.js';

describe('Product service', () => {
  it('should process to fetch product list', async () => {
    const spy = processRequest.mockReturnValue(Promise.resolve([]));

    const response = await fetchProductListFromServer();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('/products', {method:'GET'});
    expect(response).toEqual([])
  })
})