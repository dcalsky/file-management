export const ADD = 'ADD';
export const REMOVE = 'REMOVE';
export const ENTER = 'ENTER';
export const BACK = 'BACK';

export function add(name, parent, type = 'file') {
  return {
    type: ADD,
    name: name,
    FCBType: type,
    parentId: parent
  }
}

export function remove(id) {
    return {
      type: REMOVE,
      id: id
    }
}

export function enter(id) {
  return {
    type: ENTER,
    id: id
  }
}

export function back() {
  return {
    type: BACK
  }
}

// export function incrementIfOdd() {
//   return (dispatch: (action: actionType) => void, getState: () => counterStateType) => {
//     const { counter } = getState();
//
//     if (counter % 2 === 0) {
//       return;
//     }
//
//     dispatch(increment());
//   };
// }

