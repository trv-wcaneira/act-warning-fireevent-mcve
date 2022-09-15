# act-warning-fireevent-mcve
This is _yet another_ quick MCVE (Minimal, Complete, Verifiable example) to demonstrate what I think could be a bug/unexpected behavior in either React 18 or RTL 13.4.  OTOH, it could just be that I'm doing it wrong<sup>TM</sup>. :-)

## Background

When we upgraded to React 18 and RTL 13.4, a number of existing tests started to generate `act` warnings on `fireEvent` calls; the general flow is:

1. render a view, 
1. click a button (fireEvent), 
1. assert that a fetch function is called

The `act` warning is only supressed if we wrap the `fireEvent` call with `act` and `await` it (?). 

I plan to open an issue (question) with the RTL maintainers so I understand why we see this behavior.

## How to use this repo
After `npm i`, use `npm t` to run the tests in watch mode, and see the `act` warning`.  It will look something like

```console
  console.error
    Warning: An update to App inside a test was not wrapped in act(...).
    
    When testing, code that causes React state updates should be wrapped into act(...):
    
    act(() => {
      /* fire events that update state */
    });
    /* assert on the output */
    
    This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act
        at App (/Users/WCANEIRA/code/act-warning-fireevent-mcve/src/App.js:4:39)

      14 |         if (res.status === 200) {
      15 |           const data = await res.json()
    > 16 |           setFetchState({ todo: data.title, fetching: false })
         |           ^
      17 |         }
      18 |         else {
      19 |           //console.log('bad HTTP status', res.status)
```

There are two tests you can try, one that generates the warning, and one that does NOT.  The only difference is the use of `await act` on test that has no warnings.  Feel free to isolate (`only`) the tests individually to see the warning vs NOT see the warning.

If you prefer, you can use `npm run test:nowatch`.  

Using `npm start` will open the test application in a browser to see it visually, if desired.  

## Warning
The API endpoint this uses will occasionally have CORS errors, when testing in a browser.  I wonder if the API owner is load balancing servers and one of them doesn't allow CORS.  Simply keep trying if you get such an error.