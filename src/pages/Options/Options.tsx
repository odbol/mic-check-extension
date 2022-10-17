import React, {useEffect, useState} from 'react';
import {AudioDevices} from './AudioDevices';

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

  return <div className="">
    <h1>{props.title} Page</h1>

    Available audio devices:

    <button onClick={loadDevices}>Refresh devices</button>

    <ul>
    {devices.map(d => {
      return (
        <li className="device" key={d.deviceId + d.groupId}>
          {d.label}
          <span>(id: {d.deviceId})</span>
          <span>(group: {d.groupId})</span>
        </li>
      );
    })}
    </ul>

    {error && <p className='error'>{error.toString()}</p>}

  </div>;
};

export default Options;
