import './styles/style.css';
import { Game } from 'phaser';
import { gameConfig } from './game/gameConfig';

const appRoot = document.getElementById('app');

if (!appRoot) {
  throw new Error('Root element #app is missing.');
}

new Game({
  ...gameConfig,
  parent: appRoot
});
