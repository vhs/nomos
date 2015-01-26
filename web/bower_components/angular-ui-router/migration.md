# Migration Notes

## Recovering from non-existent states ($stateNotFound)

Previously, intercepting a transition to a non-existent state with `$stateNotFound` meant assigning
an object with some arbitrary properties to the `retry` property of the event object (or a promise with
said properties). Also, the event hook itself had somewhere in the vicinity of a billion parameters.

These days, things are a bit simpler:

```javascript
$rootScope.$on('$stateNotFound', function(event, transition) {
  event.retry = transition.redirect("some.other.state", transition.params().to);
});
```
Or, if you prefer the promise-flavored variety:

```javascript
$rootScope.$on('$stateNotFound', function(event, transition) {
  // StateLoadingService does on-demand state loading, and returns a promise
  event.retry = StateLoadingService.load(transition).then(function() {
    // Return the same transition, since we just want to try it again
    return transition;
  });
});
```
