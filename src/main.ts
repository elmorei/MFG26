import './styles/style.css';
import { Game } from 'phaser';
import { gameConfig } from './game/gameConfig';

const appRoot = document.getElementById('app');

if (!appRoot) {
  throw new Error('Root element #app is missing.');
}

const game = new Game({
  ...gameConfig,
  parent: appRoot
});

const resizeToWindow = (): void => {
  game.scale.resize(window.innerWidth, window.innerHeight);
};

resizeToWindow();
window.addEventListener('resize', resizeToWindow);
