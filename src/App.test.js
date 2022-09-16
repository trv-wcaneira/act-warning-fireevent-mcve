import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
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
  
test('generates an act warning when firing an event, even if we wait for the result', async () => {
  render(<App />);
  
  fireEvent.click(screen.getByText('Click Me'))
 
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled()
  })
});

test.only('does NOT generate an act warning when firing an event, if we wait for act??', async () => {
  render(<App />);
  
  //awaiting and invoking act supresses the warning??
  await act(() => fireEvent.click(screen.getByText('Click Me')))
 
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled()
  })
});
