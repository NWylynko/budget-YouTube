import { addTestData } from "./addTestData"
import { createTables } from "./createTables"
import { dropTables } from "./dropTables"

export const reset = async () => {
  await dropTables()
  await createTables()
  await addTestData()
}