import { addTestData } from "./addTestData"
import { createTables } from "./createTables"
import { dropTables } from "./dropTables"

export const reset = async () => {
  console.log("dropping tables")
  await dropTables()
  console.log("creating tables")
  await createTables()
  console.log("adding test data")
  await addTestData()
  console.log("done")
}