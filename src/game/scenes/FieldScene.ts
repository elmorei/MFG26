import { Geom, Scene } from 'phaser';
import { WORLD_HEIGHT, WORLD_WIDTH } from '../constants';
import { createCameraControls } from '../input/createCameraControls';

const TENT_COUNT = 260;

export class FieldScene extends Scene {
  private cleanupControls: (() => void) | null = null;

  constructor() {
    super('field-scene');
  }

  create(): void {
    this.cameras.main.setBackgroundColor(0x2f8f3a);
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.setZoom(1);

    this.drawField();
    this.drawRandomTents(TENT_COUNT);

    this.cleanupControls = createCameraControls(this);

    this.events.once('shutdown', () => {
      this.cleanupControls?.();
      this.cleanupControls = null;
    });
  }

  private drawField(): void {
    const field = this.add.rectangle(0, 0, WORLD_WIDTH, WORLD_HEIGHT, 0x2f8f3a);
    field.setOrigin(0, 0);
    const graphics = this.add.graphics();

    graphics.fillStyle(0x2f8f3a, 1);
    graphics.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
  }

  private drawRandomTents(count: number): void {
    const safeBounds = new Geom.Rectangle(80, 80, WORLD_WIDTH - 160, WORLD_HEIGHT - 160);

    for (let i = 0; i < count; i += 1) {
      const x = safeBounds.x + Math.random() * safeBounds.width;
      const y = safeBounds.y + Math.random() * safeBounds.height;
      this.drawTent(x, y);
    }
  }

  private drawTent(x: number, y: number): void {
    const tentColor = Math.random() > 0.5 ? 0xd4ad74 : 0xbf9155;
    const tent = this.add.triangle(x, y, -15, 14, 0, -18, 15, 14, tentColor, 1);
    tent.setStrokeStyle(2, 0x5e4322, 1);
    tent.setDepth(y);
  }
}
