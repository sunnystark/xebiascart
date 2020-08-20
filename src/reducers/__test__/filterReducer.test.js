import filterReducer from '../filterReducer';
import { FILTERS_RECEIVED, ADD_COLOR_TO_FILTER, REMOVE_COLOR_FROM_FILTER, ADD_BRAND_TO_FILTER, REMOVE_BRAND_FROM_FILTER, ADD_MIN_PRICE_TO_FILTER, REMOVE_MIN_PRICE_FROM_FILTER, ADD_MAX_PRICE_TO_FILTER, REMOVE_MAX_PRICE_FROM_FILTER } from '../../actions/filterActions';


const initialState = {
  filter_list:null,
  applied_filters:{}
}

const serverResponse = [
  {
    "type": "BRAND",
    "values": [
      {
        "title": "1 Can",
        "value": "1 can"
      }
    ]
  },
  {
    "type": "PRICE",
    "values": [
      {
        "displayValue": "Min",
        "key": "Min"
      }
    ]
  },
  {
    "type": "COLOUR",
    "values": [
      {
        "color": "#F5F5DC",
        "title": "Beige"
      }
    ]
  }
]

function addFilter(options){
  const {
    firstValue,
    secondValue,
    key,
    actionType
  } = options;
  let action = {type:actionType, payload:firstValue};
  let newState = filterReducer(initialState, action);
  //ADD VALUE
  let expectedState = {...initialState, applied_filters:{[key]:[firstValue]}};
  expect(newState).toEqual(expectedState);
  expect(newState).not.toEqual(initialState);

  //RETURN SAME SATE IF VALUE ALREADY EXISTS
  newState = filterReducer(expectedState, action);
  expect(newState).toEqual(expectedState);

  //ADD MORE VALUE
  action.payload = secondValue;
  newState = filterReducer(expectedState, action);
  expectedState = {...initialState, applied_filters:{[key]:[firstValue, secondValue]}};
  expect(newState).toEqual(expectedState);
}

function removeFilter(options){
  const {
    firstValue,
    secondValue,
    key,
    actionType
  } = options
  //RETURN SAME STATE IF NO VALUE ADDED OR EXISTS
  let action = {type:actionType, payload:firstValue};
  let newState = filterReducer(initialState, action);
  expect(newState).toEqual(initialState);

  // RETURN STATE WITHOUT VALUE KEY IN FILTERED ARRAY
  let state = {...initialState, applied_filters:{[key]:[firstValue]}};
  newState = filterReducer(state, action);
  expect(newState).toEqual(initialState);
  expect(newState).not.toEqual(state);

  // RETURN STATE WITH VALUE ARRAY REMOVED ONE ITEM
  action.payload = secondValue;
  let stateTwo = {...initialState, applied_filters:{[key]:[firstValue, secondValue]}};
  newState = filterReducer(stateTwo, action);
  expect(newState).toEqual(state);
  expect(newState).not.toEqual(stateTwo);
}

describe('Filter Reducer', () => {
  it('should return default state if action type does not match', () => {
    const newState = filterReducer(initialState, {type:'unknown'});
    expect(newState).toEqual(initialState);
  });

  it('should store filters list in state', () => {
    const action = {type:FILTERS_RECEIVED, payload:[...serverResponse]};
    const newState = filterReducer(initialState, action);

    const expectedState = {...initialState, filter_list:[...serverResponse]};
    expect(newState).toEqual(expectedState);
    expect(newState).not.toEqual(initialState);
  });

  it('should return updated state filter on color add', () => {
    addFilter({
      firstValue: '#ffffff',
      secondValue: '#000000',
      actionType: ADD_COLOR_TO_FILTER,
      key:'color'
    });
  });

  it('should return updated state filter on color remove', () => {
    removeFilter({
      firstValue: '#ffffff',
      secondValue: '#000000',
      actionType: REMOVE_COLOR_FROM_FILTER,
      key:'color'
    });
  });

  it('should return updated state filter on brand add', () => {
    addFilter({
      firstValue: 'raymond',
      secondValue: 'peter england',
      actionType: ADD_BRAND_TO_FILTER,
      key:'brand'
    });
  });
  
  it('should return updated state filter on brand remove', () => {
    removeFilter({
      firstValue: 'raymond',
      secondValue: 'peter england',
      actionType: REMOVE_BRAND_FROM_FILTER,
      key:'brand'
    });
  });

  it('should return updated state filter on minimum price added', () => {
    const key = 'price'
    const min = 1000;
    const newMin = 2000;
    const action = {type:ADD_MIN_PRICE_TO_FILTER, payload:min};

    let newState = filterReducer(initialState, action);
    let expectedState = {...initialState, applied_filters:{[key]:[min]}}
    expect(newState).toEqual(expectedState);
    expect(newState).not.toEqual(initialState)

    newState = filterReducer(expectedState, action);
    expect(newState).toEqual(expectedState);

    action.payload = newMin;
    newState = filterReducer(expectedState, action);
    let expectSecondState = {...initialState, applied_filters:{[key]:[newMin]}}
    expect(newState).toEqual(expectSecondState);
    expect(newState).not.toEqual(expectedState);
  });

  it('should return updated state filter on minimum price remove', () => {
    const key = 'price';
    const min = 1000;
    const action = {type:REMOVE_MIN_PRICE_FROM_FILTER};

    let newState = filterReducer(initialState, action);
    expect(newState).toEqual(initialState);

    let state = {...initialState, applied_filters:{[key]:[min], color:['#eeeee']}};
    let expectedState =  {...initialState, applied_filters:{color:['#eeeee']}};
    newState = filterReducer(state, action);
    expect(newState).toEqual(expectedState);
    expect(newState).not.toEqual(state);

    state = {...initialState, applied_filters:{[key]:[min, 10], color:['#eeeee']}};
    expectedState =  {...initialState, applied_filters:{[key]:[-1, 10],color:['#eeeee']}};
    newState = filterReducer(state, action);
    expect(newState).toEqual(expectedState);
    expect(newState).not.toEqual(state);
  });

  it('should return updated state filter on maximum price added', () => {
    const key = 'price';
    const maxFirst = 4000;
    const maxSecond = 3000;
    const action = {type:ADD_MAX_PRICE_TO_FILTER, payload:maxFirst};

    let stateBefore = {...initialState};
    let state = filterReducer(stateBefore, action);
    let expectedState = {...initialState, applied_filters:{[key]:[undefined,maxFirst]}};
    expect(state).toEqual(expectedState);
    expect(state).not.toEqual(stateBefore);

    state = filterReducer(expectedState, action);
    expect(state).toEqual(expectedState);

    action.payload = maxSecond
    stateBefore = {...initialState, applied_filters:{[key]:[undefined,maxFirst]}};
    state = filterReducer(stateBefore, action);
    expectedState = {...initialState, applied_filters:{[key]:[undefined,maxSecond]}};
    expect(state).toEqual(expectedState);
    expect(state).not.toEqual(stateBefore);
  });

  it('should return updated state filter on minimum price remove', () => {
    const key = 'price';
    const max = 4000;
    const action = {type:REMOVE_MAX_PRICE_FROM_FILTER};

    let stateBefore = {...initialState, applied_filters:{[key]:[undefined,max]}};
    let state = filterReducer(stateBefore, action);
    let expectedState = {...initialState};
    expect(state).toEqual(expectedState);

    stateBefore = {...initialState, applied_filters:{color:'#ffffff'}};
    state = filterReducer(stateBefore, action);
    expect(state).toBe(stateBefore);

    stateBefore = {...initialState, applied_filters:{[key]:[-1,max]}};
    state = filterReducer(stateBefore, action);
    expect(state).toEqual(expectedState);

    stateBefore = {...initialState, applied_filters:{[key]:[10,max]}};
    expectedState = {...initialState, applied_filters:{[key]:[10,-1]}};
    state = filterReducer(stateBefore, action);
    expect(state).toEqual(expectedState);

  });

});