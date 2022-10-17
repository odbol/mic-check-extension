import React, {useEffect, useState} from 'react';

import {AudioDevices} from './AudioDevices';

import {groupBy} from 'lodash';

import './DeviceChooser.css';
import {Device} from './Device';

interface Props {
}

const DeviceChooser: React.FC<Props> = (props: Props) => {
  const audioDevices = new AudioDevices();
  const [devices, setDevices] = useState<Array<MediaDeviceInfo>>([]);
  const [error, setError] = useState<Error|null>(null);
  const [useless, setUseless] = useState<number>(0);

  const loadDevices = () => {
    audioDevices.getDevices()
      .then(setDevices)
      .catch(setError);
  };

  useEffect(() => {
    audioDevices.checkPermissions()
      .then(isGranted => {
        if (isGranted) {
          return loadDevices();
        }
      })
      .catch(e => {
        setError(new Error('Permissions not granted: please click refresh and grant permissions'));
      });
  }, [props]);

  const devicesGrouped = groupBy(devices, d => d.kind);

  const onFavoriteChanged = (device: MediaDeviceInfo) => {
    setUseless(Date.now());
  }

  return <div className="">
    <h2>Available audio devices</h2>

    <p>Click on the device you would like to check is connected whenever you open a new tab</p>

    <button onClick={loadDevices}>Refresh devices</button>

    {Object.keys(devicesGrouped).map(group => {
      return (
        <div className='group' key={group}>
          <h4>{group}</h4>
          <ul>
            {devicesGrouped[group]
              .map(d => <Device
                device={d}
                onFavoriteChanged={onFavoriteChanged}
                key={d.deviceId + d.groupId} />)}
          </ul>
        </div>
      );
    })}

    {error && <p className='error'>{error.toString()}</p>}

  </div>;
};

export default DeviceChooser;
