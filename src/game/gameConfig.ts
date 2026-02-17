import { AUTO, Scale, Types } from 'phaser';
import { DEFAULT_VIEWPORT_HEIGHT, DEFAULT_VIEWPORT_WIDTH } from './constants';
import { FieldScene } from './scenes/FieldScene';

export const gameConfig: Types.Core.GameConfig = {
  type: AUTO,
  width: DEFAULT_VIEWPORT_WIDTH,
  height: DEFAULT_VIEWPORT_HEIGHT,
  backgroundColor: '#0f4f1c',
  scale: {
    mode: Scale.RESIZE,
    autoCenter: Scale.CENTER_BOTH,
    width: '100%',
    height: '100%'
  },
  scene: [FieldScene]
};
