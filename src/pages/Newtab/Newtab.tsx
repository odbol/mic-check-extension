import React, {useEffect, useState} from 'react';
// @ts-ignore
import ic_mic from '../../assets/img/ic_mic.svg';
// @ts-ignore
import ic_mic_off from '../../assets/img/ic_mic_off.svg';

import {AudioDevices} from '../Options/AudioDevices';
import {MediaDeviceId} from '../Options/FavoriteDevices';
import {checkForUnavailableDevices} from '../Options/FavoritesChecker';
import './Newtab.css';
import './Newtab.scss';

interface IDeviceCheckerProps {
  onAvailablility: (isAvaialable: boolean) => void;
}

const DeviceChecker = (props: IDeviceCheckerProps) => {
  const [unavailbleFavs, setUnavailbleFavs] = useState<Array<MediaDeviceId>>([]);

  useEffect(() => {
    checkForUnavailableDevices()
      .then(unavailableFavs => {
        setUnavailbleFavs(unavailableFavs);

        props.onAvailablility(unavailableFavs.length === 0);
      })
  }, []);

  return (
    <p className="deviceChecker">
      {unavailbleFavs.length > 0 ?
        <span>Ooops, can't find your favorite AV device <span className='deviceName'>{unavailbleFavs[0]}.</span> Is it plugged in?</span>
        :
        <span>All AV devices acccounted for!</span>
      }
    </p>
  );
};


const Newtab = () => {
  const audioDevices = new AudioDevices();
  const [devices, setDevices] = useState<Array<MediaDeviceInfo>>([]);
  const [error, setError] = useState<Error|null>(null);
  const [isAvailable, setIsAvailable] = useState(true);

  const loadDevices = () => {
    audioDevices.getDevices()
      .then(setDevices)
      .catch(setError);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={isAvailable ? ic_mic : ic_mic_off} className="App-logo" alt="logo" />

        <DeviceChecker
          onAvailablility={setIsAvailable} />
      </header>
      <div>
        <button onClick={loadDevices}>Choose favorite devices</button>

        <button onClick={loadDevices}>Refresh devices</button>
        <p>
          Mic check: checks that your favorite microphone or camera is plugged in and detected.
        </p>
      </div>
    </div>
  );
};

export default Newtab;
