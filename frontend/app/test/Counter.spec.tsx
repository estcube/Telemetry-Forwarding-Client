import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Counter } from '../src/components/Counter';

describe('Counter', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(<Counter />);

    expect(baseElement).toBeTruthy();
  });

  it('should declare its nature', () => {
    const { getByText,  } = render(
      <Counter />
    );

    expect(getByText('This is the Counter component.')).toBeTruthy();
  });
});