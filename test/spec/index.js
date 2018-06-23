import { equal } from 'zoroaster/assert'
import Context from '../context'
import aqt from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof aqt, 'function')
  },
  async 'calls package without error'() {
    await aqt()
  },
  async 'calls test context method'({ example }) {
    await example()
  },
}

export default T
