import { Action } from './types';

function getInitialState() {
  return {
    transform: {
      scaleX: 0,
      scaleY: 0,
      skewX: 0,
      skewY: 0,
      translateX: 0,
      translateY: 0
    }
  }
}

function actionName(name: string) {
  return `CANVAS_STORE_${name}`;
}

const SET_TRANSFORM = actionName('SET_TRANSFORM')

const actions = {
  SET_TRANSFORM
}

function reducer(state: Object, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case actions.SET_TRANSFORM: {
      return { ...state, transform: payload }
    }
    default:
      return
  }
}