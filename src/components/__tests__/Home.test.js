import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../Home'

// configure ESLINT globals to include jest
test('ensure that the correct welcome text is present', () => {
  render(<Home />)

  expect(screen.getByText('Welcome to')).toBeInTheDocument()
})
