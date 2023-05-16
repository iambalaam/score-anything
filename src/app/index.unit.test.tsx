import { render } from '@testing-library/react';
import * as React from 'react';
import { App } from './app';

test('The app runs', () => {
    const { container } = render(<App />);
    expect(container.querySelector('main')).not.toBe(null);
});