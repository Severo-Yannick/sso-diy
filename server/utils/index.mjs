/**
 * Find a record by key in a database
 * @param {*} db
 * @param {*} key
 * @returns Object or false
 */
export const findByKey = (db, key) => {
  if (Object.keys(db).includes(key)) {
    return db[key]
  } else {
    return false
  }
}
