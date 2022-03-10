import { render, screen } from '@testing-library/react'
import { Spinner } from './Spinner'

describe('<Spinner /> component', () => {
  describe('when rendered', () => {
    it('should not crash when rendering', () => {
      expect(() => render(<Spinner />)).not.toThrow()
      const linkElement = screen.getByTestId('spinner')
      expect(linkElement).toBeInTheDocument()
    })
  })
})
