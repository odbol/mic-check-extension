const KEY_FAVORITES = 'KEY_FAVORITES_v2';

export type MediaDeviceId = string;

export interface Favorites {
  [type: string]: MediaDeviceId
}

export function getFavoriteId(device: MediaDeviceInfo): MediaDeviceId {
  return device.label + device.kind.toString();
}

export interface FavoriteDevices {
  setFavorite(device: MediaDeviceInfo, isFavorite: boolean): Promise<void>;
  getFavorites(): Promise<Favorites>;
}

class FavoriteDevicesRemote implements FavoriteDevices {
  async setFavorite(device: MediaDeviceInfo, isFavorite: boolean) {
    const favorites = await this.getFavorites();
    const id = getFavoriteId(device);

    if (isFavorite) {
      favorites[device.kind.toString()] = id;
    } else {
      if (favorites[device.kind.toString()] === id) {
        delete favorites[device.kind.toString()];
      }
    }

    localStorage.setItem(KEY_FAVORITES, JSON.stringify(favorites));
  }

  async getFavorites(): Promise<Favorites> {
    const favoritesJson = localStorage.getItem(KEY_FAVORITES);
    let favorites = favoritesJson ? JSON.parse(favoritesJson) : {};

    return favorites;
  }
}

export const favoriteDevices = new FavoriteDevicesRemote();
