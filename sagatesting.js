//actions/index.js:

export const getNews = () => ({ type: 'GET_NEWS',});

//action.test.js ---------------------

import * as actions from './index'
describe('ACTIONS', () => {
   it('should create an action with correct type', () => {
      const expectedAction = {
              type: 'GET_NEWS'
             }
      expect(actions.getNews()).toEqual(expectedAction)
  })
})

---------------------------------------------------------------

//reducers/index.js

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_NEWS':
      return { ...state, loading: true };
    case 'NEWS_RECEIVED':
      return { ...state, news: action.json[0], loading: false}
    default:
      return state;
  }
};
export default reducer;

//reducer.test.js ------------------
import reducer from "./index";
describe('REDUCER', () => {
   it('should return the initial state', () =>
     expect(reducer(undefined, {})).toEqual({})
    })
   it('should handle "GET_NEWS" action', () => {
    expect(reducer({}, { type: 'GET_NEWS' })).
      toEqual({ loading: true })
   })
   it('should handle "NEWS_RECEIVED" action', () => {
      const mockData = [{
        "author": "Analysis by Stephen Collinson, CNN",
        "title": "Mueller starts tzzle in most signimove yet",
        "description": "Silent for so long"
       }];
     expect(reducer({}, { type: "NEWS_RECEIVED", json: mockData }))
       .toEqual({ news: mockData[0], loading: false })
   })
})

------------------------------------------------------------------

//sagas/index.js

import { put, takeLatest, all } from 'redux-saga/effects';
export function* fetchNews() {
  const API_URL = 'https://newsapi.org/v1/articles?source=cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc'
  try {
    const response = yield fetch(API_URL).then(response =>
             response.json());
    yield put({ type: "NEWS_RECEIVED", json: response.articles });
 } 
  catch (e) {
     console.log("ERROR", e);
  }
}
export function* actionWatcher() {
yield takeLatest('GET_NEWS', fetchNews)
}
export default function* rootSaga() { yield all([actionWatcher()]);}


//Because in SAGA I use fetch function I have to install fetch-mock function
npm install --save-dev jest-fetch-mock

// setupJest.js
global.fetch = require('jest-fetch-mock');

//Add next lines to package.json
"jest": {
  "automock": false,
  "setupFiles": ["./setupJest.js"]
  },

//sagas.test.js ------------------

import { put, takeLatest } from 'redux-saga/effects';
import { fetchNews, actionWatcher } from './index'
 describe('SAGAS', () => {
   it('should dispatch action "GET_NEWS" ', () => {
     const generator = actionWatcher();
     expect(generator.next().value)
       .toEqual(takeLatest('GET_NEWS', fetchNews));
     expect(generator.next().done).toBeTruthy();
   })
   it('should dispatch action "NEWS_RECEIVED" with result from fetch News API', () => {
      const mockResponse = { "articles": "Some content" }; 
      const generator = fetchNews();
      generator.next();
      expect(generator.next(mockResponse).value)
       .toEqual(put({type:"NEWS_RECEIVED", json:"Some content"}))
      expect(generator.next().done).toBeTruthy();
   })
})


-------------------------------------------------------------------------------
//NewsItem.js
import React from 'react';
import { connect } from 'react-redux'

let NewsItem = ({ article }) => (
  article ?
    <article style={articleStyle} >
      <div>
        <h1>{article.title}</h1>
        <img style={imgStyle} src={article.urlToImage} alt="" />
        <h2>{article.description}</h2>
        <a href={article.url} target="_blank">READ MORE</a>
      </div>
    </article> :
    null
);

const mapStateToProps = (state) => ({
  article: state.news,
})

NewsItem = connect(
  mapStateToProps,
  null
)(NewsItem)

export default NewsItem;


//NewsItem.test.js  -----------------------

import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from "redux-mock-store";
import NewsItem from "./NewsItem";
import "../../setupTests";

it('should render correctly <NewsItem>', () => {
    const mockStore = configureStore();
    const store = mockStore({
        news: {
            title: "Mock Title",
            urlToImage: "www.google.com",
            description: "Mock Description",
            url: "bbc.com"
        },
        loading: false
    });
    const wrapper = mount(<Provider store={store}><NewsItem /></Provider>);

    expect(wrapper).toMatchSnapshot();
});

----------------------------------------------------------------------------------------------------------------------------------
//Testing the Saga Generator Function  
----------------------------------------------------------------------------------------------------------------------------------

//Actions
const CHOOSE_COLOR = 'CHOOSE_COLOR';
const CHANGE_UI = 'CHANGE_UI';

const chooseColor = (color) => ({
  type: CHOOSE_COLOR,
  payload: {
    color,
  },
});

const changeUI = (color) => ({
  type: CHANGE_UI,
  payload: {
    color,
  },
});

//sagas
function* changeColorSaga() {
  const action = yield take(CHOOSE_COLOR);
  yield put(changeUI(action.payload.color));
}
---------------------------------
//test

//To get the first yielded value from a saga, call its next().value
const gen = changeColorSaga();

  assert.deepEqual(
    gen.next().value,
    take(CHOOSE_COLOR),
    'it should wait for a user to choose a color'
  );

  //A value must then be returned to assign to the action constant, which is used for the argument to the put effect:
  const color = 'red';
  assert.deepEqual(
    gen.next(chooseColor(color)).value,
    put(changeUI(color)),
    'it should dispatch an action to change the ui'
  );
//Since there are no more yields, then next time next() is called, the generator will be done:
  assert.deepEqual(
    gen.next().done,
    true,
    'it should be done'
  );


  ----------------------------------------------------------------------------------------------------------------------------------
  //Asynchronous test
  ----------------------------------------------------------------------------------------------------------------------------------
  
import delay from 'redux-saga';

  it('async test 1', done => {
    setTimeout(done, 5000);
  })

  it('async test 2', () => {
    return new Promise(
      resolve => setTimeout(resolve,1500);
    );
  });

  it('async test 3',
   async () => await delay(500) 
  );



  --------------------------------------------------------------------------------------------------------------------------------
//Snapshot testing
  --------------------------------------------------------------------------------------------------------------------------------
  
  const items = [
    'Thor',
    'Captain America',
    'Hulk'
  ];
  
  //item.js
  
  function Items(props) {
    const { items = [] } = props;
  
    if (!items.length) {
      // No Items on the list, render an empty message
      return <span>No items in list</span>;
    }
  
    if (items.length === 1) {
      // One Item in the list, render a span
      return <span>{items[0]}</span>;
    }
  
    // Multiple items on the list, render a list
    return (
      <ul>
        {items.map(item => <li key={item}>{item}</li>)}
      </ul>
    );
  }
---------------------------------------------------

  //__snapshot__/.items.test.js
import renderer from 'react-test-renderer';

import Items from './Items';

it('renders correctly when there are no items', () => {
  const tree = renderer.create(<Items />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly when there is one item', () => {
  const items = ['one'];
  const tree = renderer.create(<Items items={items} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly when there are multiple items', () => {
  const items = ['one', 'two', 'three'];
  const tree = renderer.create(<Items items={items} />).toJSON();
  expect(tree).toMatchSnapshot();
});