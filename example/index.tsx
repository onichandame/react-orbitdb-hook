import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useCount } from '../.'

const App = () => {
  const { val } = useCount()
  return <div>{val}</div>
}

ReactDOM.render(<App />, document.getElementById('root'))
