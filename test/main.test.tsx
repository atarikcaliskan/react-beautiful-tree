import * as ReactDOM from 'react-dom'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Header } from '../src'

describe('Thing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Header />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
