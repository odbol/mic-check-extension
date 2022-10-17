
export class AudioDevices {

  async getDevices(): Promise<Array<MediaDeviceInfo>> {
    // List cameras and microphones.
    try {
      if (!await this.checkPermissions()) {
        await this.askForPermissions();
      }

      if (!navigator.mediaDevices?.enumerateDevices) throw new Error('Audio not supported');

      const devices = await navigator.mediaDevices.enumerateDevices();
      devices.forEach((device) => {
        console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
      });
      return devices;
    } catch(error) {
      const err = error as Error;
      console.error(`Error retreiving devices ${err.name}: ${err.message}`);
      throw new Error(`Error retreiving devices ${err.name}: ${err.message}`);
    }
  }

  async checkPermissions(): Promise<Boolean> {
    const permissionsRequired = [
      "microphone",
      "camera",
      // "speaker-selection"
    ];
    const statuses = await Promise.all(permissionsRequired.map(name =>
      // @ts-ignore
      navigator.permissions.query({ name })
    ));

    // @ts-ignore
    return statuses.some(status => status.status === 'granted');
  }

  async askForPermissions(): Promise<Boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      });
    } catch (e) {
      console.error('Error starting mediastream', e);
      throw new Error('Error starting video/audio: please grant permission');
    }
  }
}
