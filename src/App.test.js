import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    status: 200, 
    json: jest.fn().mockResolvedValue({title: 'testing123'})
  })
});
  
afterEach(() => {
  jest.restoreAllMocks();
});
  
test('generates an act warning when firing an event', () => {
  render(<App />);
  
  fireEvent.click(screen.getByText('Click Me'))
 
  expect(global.fetch).toHaveBeenCalled()
});

test('does NOT generate an act warning when firing an event', async () => {
  render(<App />);
  
  //awaiting and invoking act supresses the warning?!
  await act(() => fireEvent.click(screen.getByText('Click Me')))
 
  expect(global.fetch).toHaveBeenCalled()
});
