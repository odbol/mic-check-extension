import React, {useEffect, useState} from 'react';
import DeviceChooser from './DeviceChooser';

import './Options.css';

interface Props {
  title: string;
}

const Options: React.FC<Props> = (props: Props) => {
  return <div className="">
    <h1>{props.title} Page</h1>

    <DeviceChooser />

  </div>;
};

export default Options;
