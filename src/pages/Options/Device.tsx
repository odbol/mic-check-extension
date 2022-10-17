import * as React from 'react';
import {includes} from 'lodash';

import './Device.css';
import {favoriteDevices} from './FavoriteDevices';

export interface IDeviceProps {
  device: MediaDeviceInfo;
  onFavoriteChanged: (device: MediaDeviceInfo) => void;
}

export function Device (props: IDeviceProps) {
  const d = props.device;
  const id = favoriteDevices.getId(d);

  const favs = favoriteDevices.getFavorites();
  const isFavorite = includes(favs, id);

  const onChanged = (ev: React.ChangeEvent<HTMLInputElement>) => {
    favoriteDevices.setFavorite(d, ev.target.checked);
    // props.onFavoriteChanged(d);
  };

  const onClicked = (ev: any) => {
    favoriteDevices.setFavorite(d, !isFavorite);
    props.onFavoriteChanged(d);
  };

  return (
    <li className={'device' + (isFavorite ? ' favorite': '')} key={d.deviceId + d.groupId} onClick={onClicked}>
      <label>
        {/* <input type="checkbox" checked={isFavorite} onChange={onChanged} /> */}
        {d.label}
      </label>
      <span className='details'>
        <span>(id: {d.deviceId})</span>
        <span>(group: {d.groupId})</span>
      </span>
    </li>
  );
}
