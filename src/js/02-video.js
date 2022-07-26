import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const SAVED_TIME_KEY = 'videoplayer-current-time';

playFromTheSamePlace();

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay({ seconds, percent }) {
  localStorage.setItem(SAVED_TIME_KEY, seconds);

  if (percent === 1) {
    localStorage.removeItem(SAVED_TIME_KEY);
  }
}

function playFromTheSamePlace() {
  const savedTime = localStorage.getItem(SAVED_TIME_KEY);

  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
}
