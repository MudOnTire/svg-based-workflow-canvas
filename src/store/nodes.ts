import { Action, State } from './types';
import { config } from 'src/mock';

function getInitialState() {
  return {
    ...config
  }
}

const SET_NODES = `NODES_STORE_SET_NODES`;
const UPDATE_NODE = `NODES_STORE_UPDATE_NODE`;
const ADD_NODE = `NODES_STORE_ADD_NODE`;
const DELETE_NODE = `NODES_STORE_DELETE_NODE`;
const ADD_EDGE = `NODES_STORE_ADD_EDGE`;

const actions = {
  [SET_NODES]: SET_NODES,
  [UPDATE_NODE]: UPDATE_NODE,
  [ADD_NODE]: ADD_NODE,
  [DELETE_NODE]: DELETE_NODE,
  [ADD_EDGE]: ADD_EDGE
}

function reducer(state: State, action: Action) {
  const { type, payload } = action;
  switch (type) {
    // nodes
    case SET_NODES: {
      return { ...state, nodes: payload }
    }
    case UPDATE_NODE: {
      const { id } = payload;
      let index = state.nodes.findIndex(n => n.id === id);
      if (index < 0) return state;
      let node = state.nodes[index];
      node = { ...node, ...payload };
      const updatedNodes = [...state.nodes];
      updatedNodes.splice(index, 1, node);
      return {
        ...state,
        nodes: updatedNodes
      }
    }
    case ADD_NODE: {
      const { type, x, y } = payload;
      const newNode = {
        id: `${new Date().valueOf()}`,
        x,
        y,
        type
      }
      const updatedNodes = [...state.nodes, newNode];
      return {
        ...state,
        nodes: updatedNodes
      }
    }
    case DELETE_NODE: {
      const { id } = payload;
      let index = state.nodes.findIndex(n => n.id === id);
      if (index < 0) return state;
      const updatedNodes = [...state.nodes];
      updatedNodes.splice(index, 1)
      const updatedEdges = state.edges.filter(e => e.from !== id && e.to !== id);
      return {
        ...state,
        nodes: updatedNodes,
        edges: updatedEdges
      }
    }
    // edges
    case ADD_EDGE: {
      const { from, to } = payload;
      if (!from || !to) return state;
      const existed = state.edges.find(e => e.from === from && e.to === to);
      if (existed) return state;
      const updatedEdges = [...state.edges, payload];
      return {
        ...state,
        edges: updatedEdges
      }
    }
    default:
      return;
  }
}

export { getInitialState, actions, reducer };