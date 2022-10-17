// import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

// printLine("Using the 'printLine' function from the Print Module");

import {favoriteDevices} from '../Options/FavoriteDevices';
import {AudioDevices} from '../Options/AudioDevices';
import {includes} from 'lodash';

// import Icon from '../../assets/img/icon-128.png';

const audioDevices = new AudioDevices();

async function checkDevices() {
  if (await audioDevices.checkPermissions()) {
    const devices = await audioDevices.getDevices();
    const favorites = favoriteDevices.getFavorites();

    const availableIds = devices.map(d => favoriteDevices.getId(d));

    const unavailableFavs = Object.values(favorites).filter(fav => !includes(availableIds, fav));

    if (unavailableFavs.length > 0) {
      console.log('found favorites that are unavailable', unavailableFavs);

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
    } else {
      console.log('All devices accounted for', devices);
    }
  } else {
    console.error('No permissions');
  }
}

checkDevices()
  .then(() => {
    console.log('Checked devices');
    setTimeout(checkDevices, 3000);
  })

