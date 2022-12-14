import {favoriteDevices, getFavoriteId, MediaDeviceId} from '../Options/FavoriteDevices';
import {AudioDevices} from '../Options/AudioDevices';
import {includes} from 'lodash';

const audioDevices = new AudioDevices();

export async function checkForUnavailableDevices(): Promise<Array<MediaDeviceId>> {
  if (await audioDevices.checkPermissions()) {
    const devices = await audioDevices.getDevices();
    const favorites = await favoriteDevices.getFavorites();

    const availableIds = devices.map(d => getFavoriteId(d));

    const unavailableFavs = Object.values(favorites).filter(fav => !includes(availableIds, fav));

    if (unavailableFavs.length > 0) {
      console.log('Mic check: found favorites that are unavailable', unavailableFavs);

      return unavailableFavs;
    } else {
      console.log('Mic check: All devices accounted for', devices);
    }
  } else {
    console.log('Mic check: No permissions on this site');
  }

  return [];
}
