'use strict';

console.log('content scripts!');




var classId = 'HTB-week-5';
var classClickRefName = 'class/' + classId + '/clickCount';

// Creates a firebase value watcher.
// The callback gets called every time the click count changes
function watchClickCount(callback) {
  var clickCountRef = firebase.database().ref(classClickRefName);
  clickCountRef.on('value', function(snapshot) {
    var value = snapshot.val();
    if (value === null) {
      value = { count: 0 };
    }
    console.log('watched value:',value);
    callback(value);
  });
}

// Set up the watcher. Give it a callback that updates the browser
// badge text whenever the count changes
watchClickCount(function(value) {
  var countString = '' + value.count;
  chrome.browserAction.setBadgeText({text: countString});
  if (value.count > 9999) {
    resetCount();
  }
});

function resetCount() {
  writeClickCount(0);
}

// Reads the click count one time.
// This is used to figure out the current count before incrementing it.
function readClickCountOnce(callback) {
  var clickCountRef = firebase.database().ref(classClickRefName);
  clickCountRef.once('value').then(function(snapshot) {
    var value = snapshot.val();
    if (value === null) {
      value = { count: 0 };
    }
    console.log('read value:',value);
    callback(value);
  });
}

function writeClickCount(int) {
  console.log('setting click count to:',int);
  var clickCountRef = firebase.database().ref(classClickRefName);
  clickCountRef.set({count: int});
}

chrome.browserAction.onClicked.addListener(function() {
  console.log('clicked');
  readClickCountOnce(function(value) {
    console.log('clicked ->',value.count);
    writeClickCount(value.count + 1);
  });
});
