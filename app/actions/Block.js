export const SAVE = 'SAVE';
export const REMOVE = 'REMOVE';
export const ENTER = 'ENTER';
export const BACK = 'BACK';

export function save(name, parent, type = 'file') {
  return {
    type: ADD,
  }
}

export function exportFile(id) {
  return {
    type: REMOVE,
    id: id
  }
}
