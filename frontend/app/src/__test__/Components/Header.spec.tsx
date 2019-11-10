import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import Header from '../../Components/Header';

const renderHeader = () => {
  return render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

describe('Header', () => {
  afterEach(cleanup);

  it('should render a header', () => {
    const page = renderHeader();
    expect(page).toBeTruthy();
  });
  it('should display text on configure button', () => {
    const page = renderHeader();
    const confButton = page.getByText('Configure');
    expect(confButton).toHaveTextContent('Configure');
  });
});
