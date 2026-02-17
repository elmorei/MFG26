import { AUTO, Scale, Types } from 'phaser';
import { DEFAULT_VIEWPORT_HEIGHT, DEFAULT_VIEWPORT_WIDTH } from './constants';
import { FieldScene } from './scenes/FieldScene';

export const gameConfig: Types.Core.GameConfig = {
  type: AUTO,
  width: DEFAULT_VIEWPORT_WIDTH,
  height: DEFAULT_VIEWPORT_HEIGHT,
  backgroundColor: '#2f8f3a',
  scale: {
    mode: Scale.RESIZE,
    autoCenter: Scale.CENTER_BOTH,
    width: DEFAULT_VIEWPORT_WIDTH,
    height: DEFAULT_VIEWPORT_HEIGHT
  },
  scene: [FieldScene]
};
