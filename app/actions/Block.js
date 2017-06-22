export const SAVE = 'SAVE';

export function save(content) {
  return {
    type: SAVE,
    content
  }
}

export function exportFile(id) {
  return {
    type: REMOVE,
    id: id
  }
}
