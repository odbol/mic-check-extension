const KEY_FAVORITES = 'KEY_FAVORITES_v2';

export type MediaDeviceId = string;

export interface Favorites {
  [type: string]: MediaDeviceId
}

class FavoriteDevices {
  setFavorite(device: MediaDeviceInfo, isFavorite: boolean) {
    const favorites = this.getFavorites();
    const id = this.getId(device);

    if (isFavorite) {
      favorites[device.kind.toString()] = id;
    } else {
      if (favorites[device.kind.toString()] === id) {
        delete favorites[device.kind.toString()];
      }
    }

    localStorage.setItem(KEY_FAVORITES, JSON.stringify(favorites));
  }

  getFavorites(): Favorites {
    const favoritesJson = localStorage.getItem(KEY_FAVORITES);
    let favorites = favoritesJson ? JSON.parse(favoritesJson) : {};

    return favorites;
  }

  getId(device: MediaDeviceInfo): MediaDeviceId {
    return device.label + device.kind.toString();
  }
}

export const favoriteDevices = new FavoriteDevices();
