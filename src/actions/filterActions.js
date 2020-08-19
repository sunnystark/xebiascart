import { fetchFiltersFromServer } from "../services/filterService";

export const FILTERS_LOADING = 'filters_loading';
export const FILTERS_RECEIVED = 'filters_received';
export const FILTERS_FETCH_ERROR = 'filters_fetch_error'

const loadingFilters = () => ({type:FILTERS_LOADING});
const filtersReceived = (data) => ({type:FILTERS_RECEIVED, payload:data});
const filtersFetchError = (error) => ({type:FILTERS_FETCH_ERROR, payload:error})

export const loadFilters = () => {
  return async (dispatch) => {
    dispatch(loadingFilters())
    try {
      const data = await fetchFiltersFromServer();
      dispatch(filtersReceived(data));
    } catch (error) {
      dispatch(filtersFetchError(error));
    }
  }
}

export const ADD_COLOR_TO_FILTER = 'add_color_to_filter';
export const addColorToFilter = (color) => ({type:ADD_COLOR_TO_FILTER, payload:color});

export const REMOVE_COLOR_FROM_FILTER = 'remove_color_from_filter';
export const removeColorFromFilter = (color) => ({type:REMOVE_COLOR_FROM_FILTER, payload:color});

export const ADD_BRAND_TO_FILTER = 'add_brand_to_filter';
export const addBrandToFilter = (brand) => ({type:ADD_BRAND_TO_FILTER, payload:brand});

export const REMOVE_BRAND_FROM_FILTER = 'remove_brand_from_filter';
export const removeBrandFromFilter = (brand) => ({type:REMOVE_BRAND_FROM_FILTER, payload:brand});

export const ADD_MIN_PRICE_TO_FILTER = 'add_min_price_to_filter';
export const addMinPriceToFilter = (min) => ({type:ADD_MIN_PRICE_TO_FILTER, payload:min});

export const REMOVE_MIN_PRICE_FROM_FILTER = 'remove_min_price_from_filter';
export const removeMinPriceFromFilter = (min) => ({type:REMOVE_MIN_PRICE_FROM_FILTER, payload:min});

export const ADD_MAX_PRICE_TO_FILTER = 'add_max_price_to_filter';
export const addMaxPriceToFilter = (max) => ({type:ADD_MAX_PRICE_TO_FILTER, payload:max});

export const REMOVE_MAX_PRICE_FROM_FILTER = 'remove_max_price_from_filter';
export const removeMaxPriceFromFilter = (max) => ({type:REMOVE_MAX_PRICE_FROM_FILTER, payload:max});


export const RESET_APPLIED_FILTER = 'reset_applied_filter';
export const resetAppliedFilter = () => ({type:RESET_APPLIED_FILTER});
