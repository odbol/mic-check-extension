import React, {useEffect, useState} from 'react';
// @ts-ignore
import logo from '../../assets/img/logo.svg';
import {AudioDevices} from '../Options/AudioDevices';
import {MediaDeviceId} from '../Options/FavoriteDevices';
import {checkForUnavailableDevices} from '../Options/FavoritesChecker';
import './Newtab.css';
import './Newtab.scss';

const DeviceChecker = () => {
  const [unavailbleFavs, setUnavailbleFavs] = useState<Array<MediaDeviceId>>([]);

  useEffect(() => {
    checkForUnavailableDevices()
      .then(unavailableFavs => {
        setUnavailbleFavs(unavailableFavs);
      })
  }, []);

  if (unavailbleFavs.length === 0) {
    return (
      <p>All devices acccounted for!</p>
    )
  }

  return (
    <div className="deviceChecker">
      Ooops, can't find your favorite AV device {unavailbleFavs[0]}. Is it plugged in?
    </div>
  );
};


const Newtab = () => {
  const audioDevices = new AudioDevices();
  const [devices, setDevices] = useState<Array<MediaDeviceInfo>>([]);
  const [error, setError] = useState<Error|null>(null);

  const loadDevices = () => {
    audioDevices.getDevices()
      .then(setDevices)
      .catch(setError);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/Newtab/Newtab.js</code> and save to reload.
        </p>

        <button onClick={loadDevices}>Refresh devices</button>

        <DeviceChecker />
        <h6>The color of this paragraph is defined using SASS.</h6>
      </header>
    </div>
  );
};

export default Newtab;
