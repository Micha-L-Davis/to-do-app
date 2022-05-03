import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Main from '../index'

describe('To-Do App Tests', () => {
  render(<Main />)
  let form = screen.getByTestId('form');


  it('should render a maximum of three items', () => {
    fireEvent.submit(form, { target: { text: 'test description', assignee: 'test person', difficulty: 5 } })
    fireEvent.submit(form, { target: { text: 'test description', assignee: 'test person', difficulty: 4 } })
    fireEvent.submit(form, { target: { text: 'test description', assignee: 'test person', difficulty: 3 } })
    fireEvent.submit(form, { target: { text: 'test description', assignee: 'test person', difficulty: 2 } })

    let firstElement = screen.getByTestId('element-0');
    let lastElement = screen.getByTestId('element-2');
    let nonexistentElement = screen.getByTestId('element-3');

    expect(firstElement).toBeTruthy();
    expect(lastElement).toBeTruthy();
    expect(nonexistentElement).toBeFalsy();
  });
});

