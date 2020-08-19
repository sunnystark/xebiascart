
const serviceURL = process.env.REACT_APP_API;

export const processRequest = async (endPoint, options) => {
  try {
    let response = await fetch(
      `${serviceURL}${endPoint}`,
      options
    )

    if(response.ok){
      response =  await response.json();
      return Promise.resolve(response);
    }
    let status = parseInt(response.status) 
    if(status === 401 || status === 403){
      return Promise.reject({errorMessage:'You are not authorized'})
    }

    response = await response.json();
    return Promise.reject({errorMessage:response.error})

  } catch (error) {
    return Promise.reject({errorMessage:error.message})
  }
}