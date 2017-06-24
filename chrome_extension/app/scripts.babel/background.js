'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('extension ready');
  console.log('previousVersion', details.previousVersion);
});

chrome.runtime.connect();

chrome.tabs.onUpdated.addListener(tabId => {
  chrome.pageAction.show(tabId);
});

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.type == 'jobchange'){
    chrome.notifications.create({
      'type': 'basic',
      'iconUrl': '../images/icon-128.png',
      'title': 'Hi There!',
      'message': 'It seems you just updated your job profile. Are you working at Google now? We have other 12 Per Schola alumnis working there. Contact them here!'
    });
  }
});
