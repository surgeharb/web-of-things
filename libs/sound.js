const { exec } = require('child_process');
const CONF = require('../config/config');

/**
 * Pauses the current playing stream on the device
 */
module.exports.pause = () => {
  exec(`killall omxplayer.bin`, (error, stdout, stderr) => {
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  });
};

/**
 * Plays the desires song path on the device
 * 
 * @param {String} path Path of the song
 */
module.exports.play = (path, noPause) => {
  if (!noPause) {
    module.exports.pause();
  }

  exec(`omxplayer '${path}'`, (error, stdout, stderr) => {
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  });
}

/**
 * Triggers the alarm
 */
module.exports.alarm = () => {
  // CONF.ledController.blink();
  module.exports.play(CONF.sound.alarmUrl);
  // setTimeout(() => {
  //   CONF.ledController.off();
  // }, 1000);
};

/**
 * Rings the bell
 */
module.exports.ring = () => {
  module.exports.play(CONF.sound.ringUrl, true);
};