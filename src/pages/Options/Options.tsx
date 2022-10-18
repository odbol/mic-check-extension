import React, {useEffect, useState} from 'react';
import DeviceChooser from './DeviceChooser';

import './Options.css';

import '../Newtab/Newtab.css';
import '../Newtab/Newtab.scss';

interface Props {
  title: string;
}

const Options: React.FC<Props> = (props: Props) => {
  return <div className="App">

    <header className="App-header">
      <h1>Mic Check</h1>
    </header>

    <div>
      <DeviceChooser />
    </div>

  </div>;
};

export default Options;
