/*!
 * jQuery UI Touch Punch 0.2.2
 *
 * Copyright 2011, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
(function ($) {

  // Detect touch support
  $.support.touch = 'ontouchend' in document;

  // Ignore browsers without touch support
  if (!$.support.touch) {
    return;
  }

  var mouseProto = $.ui.mouse.prototype,
      _mouseInit = mouseProto._mouseInit,
      touchHandled;

  /**
   * Simulate a mouse event based on a corresponding touch event
   * @param {Object} event A touch event
   * @param {String} simulatedType The corresponding mouse event
   */
  function simulateMouseEvent (event, simulatedType) {

    // Ignore multi-touch events
    if (event.originalEvent.touches.length > 1) {
      return;
    }

    event.preventDefault();

    var touch = event.originalEvent.changedTouches[0],
        simulatedEvent = document.createEvent('MouseEvents');
    
    // Initialize the simulated mouse event using the touch event's coordinates
    simulatedEvent.initMouseEvent(
      simulatedType,    // type
      true,             // bubbles                    
      true,             // cancelable                 
      window,           // view                       
      1,                // detail                     
      touch.screenX,    // screenX                    
      touch.screenY,    // screenY                    
      touch.clientX,    // clientX                    
      touch.clientY,    // clientY                    
      false,            // ctrlKey                    
      false,            // altKey                     
      false,            // shiftKey                   
      false,            // metaKey                    
      0,                // button                     
      null              // relatedTarget              
    );

    // Dispatch the simulated event to the target element
    event.target.dispatchEvent(simulatedEvent);
  }

  /**
   * Handle the jQuery UI widget's touchstart events
   * @param {Object} event The widget element's touchstart event
   */
  mouseProto._touchStart = function (event) {

    var self = this;

    // Ignore the event if another widget is already being handled
    if (touchHandled || !self._mouseCapture(event.originalEvent.changedTouches[0])) {
      return;
    }

    // Set the flag to prevent other widgets from inheriting the touch event
    touchHandled = true;

    // Track movement to determine if interaction was a click
    self._touchMoved = false;

    // Simulate the mouseover event
    simulateMouseEvent(event, 'mouseover');

    // Simulate the mousemove event
    simulateMouseEvent(event, 'mousemove');

    // Simulate the mousedown event
    simulateMouseEvent(event, 'mousedown');
  };

  /**
   * Handle the jQuery UI widget's touchmove events
   * @param {Object} event The document's touchmove event
   */
  mouseProto._touchMove = function (event) {

    // Ignore event if not handled
    if (!touchHandled) {
      return;
    }

    // Interaction was not a click
    this._touchMoved = true;

    // Simulate the mousemove event
    simulateMouseEvent(event, 'mousemove');
  };

  /**
   * Handle the jQuery UI widget's touchend events
   * @param {Object} event The document's touchend event
   */
  mouseProto._touchEnd = function (event) {

    // Ignore event if not handled
    if (!touchHandled) {
      return;
    }

    // Simulate the mouseup event
    simulateMouseEvent(event, 'mouseup');

    // Simulate the mouseout event
    simulateMouseEvent(event, 'mouseout');

    // If the touch interaction did not move, it should trigger a click
    if (!this._touchMoved) {

      // Simulate the click event
      simulateMouseEvent(event, 'click');
    }

    // Unset the flag to allow other widgets to inherit the touch event
    touchHandled = false;
  };

  /**
   * A duck punch of the $.ui.mouse _mouseInit method to support touch events.
   * This method extends the widget with bound touch event handlers that
   * translate touch events to mouse events and pass them to the widget's
   * original mouse event handling methods.
   */
  mouseProto._mouseInit = function () {
    
    var self = this;

    // Delegate the touch handlers to the widget's element
    self.element
      .on('touchstart', $.proxy(self, '_touchStart'))
      .on('touchmove', $.proxy(self, '_touchMove'))
      .on('touchend', $.proxy(self, '_touchEnd'));

    // Call the original $.ui.mouse init method
    _mouseInit.call(self);
  };

})(jQuery);

/*! jquery.finger - v0.1.0-alpha - 2013-07-01
* https://github.com/ngryman/jquery.finger
* Copyright (c) 2013 Nicolas Gryman; Licensed MIT */

(function($) {

	var hasTouch = 'ontouchstart' in window,
		startEvent = hasTouch ? 'touchstart' : 'mousedown',
		stopEvent = hasTouch ? 'touchend touchcancel' : 'mouseup mouseleave',
		moveEvent = hasTouch ? 'touchmove' : 'mousemove',

		namespace = 'finger',
		safeguard,

		Finger = $.Finger = {
			pressDuration: 300,
			doubleTapInterval: 300,
			flickDuration: 150,
			motionThreshold: 5
		};

	function page(coord, e) {
		return (hasTouch ? e.originalEvent.touches[0] : e)['page' + coord.toUpperCase()];
	}

	function startHandler(event) {
		var data = {},
			timeStamp = event.timeStamp || +new Date(),
			f = $.data(this, namespace);

		if (safeguard == timeStamp) return;
		safeguard = timeStamp;

		data.move = { x: page('x', event), y: page('y', event) };
		data.start = $.extend({ time: timeStamp, target: event.target }, data.move);
		data.timeout = setTimeout($.proxy(function() {
			$.event.trigger($.Event('press', data.move), null, event.target);

			$.event.remove(this, moveEvent + '.' + namespace, moveHandler);
			$.event.remove(this, stopEvent + '.' + namespace, stopHandler);
		}, this), $.Finger.pressDuration);

		$.event.add(this, moveEvent + '.' + namespace, moveHandler, data);
		$.event.add(this, stopEvent + '.' + namespace, stopHandler, data);

		if (Finger.preventDefault || f.options.preventDefault) event.preventDefault();
	}

	function moveHandler(event) {
		var data = event.data,
			start = data.start,
			move = data.move;

		// motion data
		move.x = page('x', event);
		move.y = page('y', event);
		move.dx = move.x - start.x;
		move.dy = move.y - start.y;
		move.adx = Math.abs(move.dx);
		move.ady = Math.abs(move.dy);

		// security
		data.motion = move.adx > Finger.motionThreshold || move.ady > Finger.motionThreshold;
		if (!data.motion) return;

		// moves cancel press events
		clearTimeout(data.timeout);

		// orientation
		if (!move.orientation) {
			if (move.adx > data.move.ady) {
				move.orientation = 'horizontal';
				move.direction = move.dx > 0 ? +1 : -1;
			}
			else {
				move.orientation = 'vertical';
				move.direction = move.dy > 0 ? +1 : -1;
			}
		}

		// for delegated events, the target may change over time
		// this ensures we notify the right target and simulates the mouseleave behavior
		if (event.target !== start.target) {
			event.target = start.target;
			stopHandler.call(this, $.Event(stopEvent + '.' + namespace, event));
			return;
		}

		// fire drag event
		$.event.trigger($.Event('drag', move), null, event.target);
	}

	function stopHandler(event) {
		var data = event.data,
			timeStamp = event.timeStamp || +new Date(),
			f = $.data(this, namespace),
			dt = timeStamp - data.start.time,
			evtName;

		// always clears press timeout
		clearTimeout(data.timeout);

		// ensures start target and end target are the same
		if (event.target !== data.start.target) return;

		// tap-like events
		if (!data.motion) {
			evtName = dt < Finger.pressDuration &&
				!f.prev || f.prev && timeStamp - f.prev > Finger.doubleTapInterval ? 'tap' : 'doubletap';
			f.prev = timeStamp;
		}
		// motion events
		else {
			evtName = dt < Finger.flickDuration ? 'flick' : 'drag';
			data.move.end = true;
		}

		$.event.trigger($.Event(evtName, data.move), null, event.target);

		$.event.remove(this, moveEvent + '.' + namespace, moveHandler);
		$.event.remove(this, stopEvent + '.' + namespace, stopHandler);
	}

	var fingerCustom = {
		add: function(handleObj) {
			if (!$.data(this, namespace)) {
				$.event.add(this, startEvent + '.' + namespace, startHandler);
				$.data(this, namespace, { options: handleObj.data || {} });
			}
		},

		teardown: function() {
			if ($.data(this, namespace)) {
				$.event.remove(this, startEvent + '.' + namespace, startHandler);
				$.data(this, namespace, null);
			}
		}
	};

	// registers custom events
	$.event.special.tap = fingerCustom;
	$.event.special.press = fingerCustom;
	$.event.special.doubletap = fingerCustom;
	$.event.special.drag = fingerCustom;
	$.event.special.flick = fingerCustom;

})(jQuery);
