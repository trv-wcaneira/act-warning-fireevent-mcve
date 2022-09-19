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
  
test.skip('generates an act warning when firing an event, if we dont wait for the effect to finish', async () => {
  render(<App />);
  
  fireEvent.click(screen.getByText('Click Me'))
 
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled()
  })
});

test('does NOT generate an act warning when we properly test the effect when it is FINISHED', async () => {
  render(<App />);
  
  fireEvent.click(screen.getByText('Click Me'))
 
  //if you want to assert fetch was called
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled()
  })

  //but ultimately we must wait for the effect to finish by asserting on the rendered output
  await waitFor(() => {    
    expect(screen.getByText('testing123')).toBeInTheDocument()
  })
});
