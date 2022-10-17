// import { printLine } from './modules/print';

import {checkForUnavailableDevices} from '../Options/FavoritesChecker';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

// printLine("Using the 'printLine' function from the Print Module");

checkForUnavailableDevices()
  .then((unavailableFavs) => {
    console.log('Checked devices');

    if (unavailableFavs.length > 0) {
      chrome.notifications.create('reminder', {
        type: 'basic',
        iconUrl: 'icon-128.png',
        title: 'Device not plugged in?',
        message: `Can't find AV device ${unavailableFavs[0]}. Is it plugged in?`,
        buttons: [
          { title: 'Keep it Flowing.' }
        ],
        priority: 0
      });
    }
  });

