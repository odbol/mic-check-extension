// import { printLine } from './modules/print';

import {checkForUnavailableDevices} from '../Options/FavoritesChecker';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

// printLine("Using the 'printLine' function from the Print Module");

const SEND_NOTIFICATION = false;

checkForUnavailableDevices()
  .then((unavailableFavs) => {
    console.log('Checked devices');

    if (unavailableFavs.length > 0) {
      if (SEND_NOTIFICATION) {
        chrome.runtime.sendMessage('', {
          type: 'notification',
          options: {
            type: 'basic',
            iconUrl: 'ic_mic_off_128px.png',
            title: 'Device not plugged in?',
            message: `Can't find AV device ${unavailableFavs[0]}. Is it plugged in?`,
            buttons: [
              { title: 'Keep it Flowing.' }
            ],
            priority: 0
          }
        });
      } else {
        showInPageNotification(unavailableFavs);
      }
    }
  });

function showInPageNotification(unavailableFavs: string[]) {
  const iconUrl = chrome.runtime.getURL('/ic_mic_off_128px.png');
  const element = document.createElement('div');
  element.className = 'micCheckNotification';
  element.innerHTML = `
<h2 style='background-image: url(${iconUrl})'>Device not plugged in</h2>
<p>Can't find AV device <strong>${unavailableFavs[0]}</strong>. Is it plugged in?</p>
  `;

  element.addEventListener('click', () => {
    element.remove();
  });
  document.body.append(element);

  setTimeout(() => element.classList.add('shown'), 300);
}

