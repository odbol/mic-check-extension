import {favoriteDevices, MediaDeviceId} from '../Options/FavoriteDevices';
import {AudioDevices} from '../Options/AudioDevices';
import {includes} from 'lodash';

const audioDevices = new AudioDevices();

export async function checkForUnavailableDevices(): Promise<Array<MediaDeviceId>> {
  if (await audioDevices.checkPermissions()) {
    const devices = await audioDevices.getDevices();
    const favorites = favoriteDevices.getFavorites();

    const availableIds = devices.map(d => favoriteDevices.getId(d));

    const unavailableFavs = Object.values(favorites).filter(fav => !includes(availableIds, fav));

    if (unavailableFavs.length > 0) {
      console.log('found favorites that are unavailable', unavailableFavs);

      return unavailableFavs;
    } else {
      console.log('All devices accounted for', devices);
    }
  } else {
    console.error('No permissions');
  }

  return [];
}
