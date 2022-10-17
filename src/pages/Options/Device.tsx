import * as React from 'react';

import './Device.css';

export interface IDeviceProps {
  device: MediaDeviceInfo;
}

export function Device (props: IDeviceProps) {
  const d = props.device;
  return (
    <li className="device" key={d.deviceId + d.groupId}>
      <label>
        <input type="checkbox" />
        {d.label}
      </label>
      <span className='details'>
        <span>(id: {d.deviceId})</span>
        <span>(group: {d.groupId})</span>
      </span>
    </li>
  );
}
