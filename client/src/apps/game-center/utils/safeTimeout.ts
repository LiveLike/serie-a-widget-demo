const MAX_SET_TIMEOUT_DELAY = 2147483647;
// setTimeout stores the delay as 32-bit signed integer. So, when interactive_until is set
// for more than 24.8 days later, the code executes immediately disabling the widget.
// The below if condition is added to handle the same.
// If timeout is greater than MAX_SET_TIMEOUT_DELAY, a setTimeout with MAX_SET_TIMEOUT_DELAY
// as the delay will run which will recursively call startInteractiveUntilTimer again and
// again until the timeout is less than MAX_SET_TIMEOUT_DELAY and eventually sets this.disabled as true
export function safeTimeout(fn: Function, timeout: number) {
  let _timeoutNum = 0;
  let normalisedTimeout = timeout;

  function timeoutFn() {
    if (normalisedTimeout > MAX_SET_TIMEOUT_DELAY) {
      _timeoutNum = window.setTimeout(() => {
        normalisedTimeout = normalisedTimeout - MAX_SET_TIMEOUT_DELAY;
        timeoutFn();
      }, MAX_SET_TIMEOUT_DELAY);
    } else {
      _timeoutNum = window.setTimeout(fn, normalisedTimeout);
    }
  }
  timeoutFn();
  return _timeoutNum;
}
