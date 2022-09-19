# act-warning-fireevent-mcve
This was originally a repro/MCVE for what I thought was a React/RTL issue with unnecessary/unexplained `act` warnings.  It turned out that I was doing it wrong<sup>TM</sup> (and learned/was reminded of something in the process).

## Background

When we upgraded to React 18 and RTL 13.4, a number of existing tests started to generate `act` warnings on `fireEvent` calls; the general flow is:

1. render a view, 
1. click a button (fireEvent), 
1. assert that a fetch function is called

The issue is that asserting the fetch is not enough, one [must wait for the effect to finish and assert on THAT](https://github.com/testing-library/react-testing-library/issues/1126#issuecomment-1250015575).

## How to use this repo
After `npm i`, use `npm t` to run the tests in watch mode.

There are two tests you can try, one that generates the warning, and one that does NOT.  

```console
  console.error
    Warning: An update to App inside a test was not wrapped in act(...).
    
    When testing, code that causes React state updates should be wrapped into act(...):
    
    act(() => {
      /* fire events that update state */
    });
    /* assert on the output */
```

You can see that in the proper test, the effect is allowed to finish completely, and there is no warning.

If you prefer, you can use `npm run test:nowatch`.  

Using `npm start` will open the test application in a browser to see it visually, if desired.  

## Warning
The API endpoint this uses will occasionally have CORS errors, when testing in a browser.  I wonder if the API owner is load balancing servers and one of them doesn't allow CORS.  Simply keep trying if you get such an error.