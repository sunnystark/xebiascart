import {processRequest} from '../baseService'

const serviceURL = process.env.REACT_APP_API;

describe('Base service', () => {
  let holdFetch;
  let global = window || global;
  beforeEach(() => {
    holdFetch = global.fetch;
    global.fetch = jest.fn();
    global.fetch.mockClear();
  })
  afterEach(() => {
    global.fetch = holdFetch;
  })

  it('should return resolved promise on successful server response', async () => {
    const endPoint = '/product';
    const response = {success:{}};
    global.fetch.mockReturnValue(Promise.resolve({ok:true, json:() => Promise.resolve(response)}));

    const data = await processRequest(endPoint,{method:'GET'});
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(`${serviceURL}${endPoint}`, {"method": "GET"});
    expect(data).toEqual(response);
  });

  it('should return rejected promise on 401 status code from server response', async () => {
    const endPoint = '/product';
    const response = {errorMessage:'You are not authorized'};
    global.fetch.mockReturnValue(Promise.resolve({status:401}));
    try{
      await processRequest(endPoint,{method:'GET'});
    } catch(error){
      expect(error).toEqual(response);
    }
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(`${serviceURL}${endPoint}`, {"method": "GET"});
  });

  it('should return rejected promise on 403 status code from server response', async () => {
    const endPoint = '/product';
    const response = {errorMessage:'You are not authorized'};
    global.fetch.mockReturnValue(Promise.resolve({status:403}));
    try{
      await processRequest(endPoint,{method:'GET'});
    } catch(error){
      expect(error).toEqual(response);
    }
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(`${serviceURL}${endPoint}`, {"method": "GET"});
  });

  it('should return rejected promise if status is not OK (200) from server response', async () => {
    const endPoint = '/product';
    const response = {error:'bad request'};
    global.fetch.mockReturnValue(Promise.resolve({status:400, json:() => Promise.resolve(response)}));
    try{
      await processRequest(endPoint,{method:'GET'});
    } catch(error){
      expect(error).toEqual({errorMessage: response.error });
    }
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(`${serviceURL}${endPoint}`, {"method": "GET"});
  });

  it('should return rejected promise if there is fetch error', async () => {
    const endPoint = '/product';
    const response = {message:'Internal server error'};
    global.fetch.mockReturnValue(Promise.reject({status:500, ...response}));
    try{
      await processRequest(endPoint,{method:'GET'});
    } catch(error){
      expect(error).toEqual({errorMessage: response.message });
    }
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(`${serviceURL}${endPoint}`, {"method": "GET"});
  });
})