import { render } from '@testing-library/react';
import * as React from 'react';
import { App } from './index';

test('The app runs', () => {
    const { container } = render(<App />);
    expect(container.querySelector('h1')?.textContent).toBe('Score Anything');
});