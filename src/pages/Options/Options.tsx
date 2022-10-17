import React, {useEffect, useState} from 'react';
import {AudioDevices} from './AudioDevices';

import {groupBy} from 'lodash';

import './Options.css';

interface Props {
  title: string;
}

const Options: React.FC<Props> = (props: Props) => {
  const audioDevices = new AudioDevices();
  const [devices, setDevices] = useState<Array<MediaDeviceInfo>>([]);
  const [error, setError] = useState<Error|null>(null);

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

  const renderDevice = (d: MediaDeviceInfo) => {
    return (
      <li className="device" key={d.deviceId + d.groupId}>
        {d.label}
        <span>(id: {d.deviceId})</span>
        <span>(group: {d.groupId})</span>
      </li>
    );
  }

  const devicesGrouped = groupBy(devices, d => d.kind);

  return <div className="">
    <h1>{props.title} Page</h1>

    <h2>Available audio devices</h2>

    <button onClick={loadDevices}>Refresh devices</button>

    {Object.keys(devicesGrouped).map(group => {
      return (
        <div className='group' key={group}>
          {group}
          <ul>
            {devicesGrouped[group]
              .map(renderDevice)}
          </ul>
        </div>
      );
    })}

    {error && <p className='error'>{error.toString()}</p>}

  </div>;
};

export default Options;
