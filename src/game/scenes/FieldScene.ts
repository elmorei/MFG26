import { Geom, Scene } from 'phaser';
import { WORLD_HEIGHT, WORLD_WIDTH } from '../constants';
import { createCameraControls } from '../input/createCameraControls';

const TENT_COUNT = 220;

export class FieldScene extends Scene {
  private cleanupControls: (() => void) | null = null;

  constructor() {
    super('field-scene');
  }

  create(): void {
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.setZoom(1);

    this.drawField();
    this.drawRandomTents(TENT_COUNT);
    this.drawHud();

    this.cleanupControls = createCameraControls(this);

    this.events.once('shutdown', () => {
      this.cleanupControls?.();
      this.cleanupControls = null;
    });
  }

  private drawField(): void {
    const graphics = this.add.graphics();

    graphics.fillStyle(0x3a8f2b, 1);
    graphics.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    graphics.lineStyle(1, 0x62b655, 0.35);

    const cellSize = 128;

    for (let x = 0; x <= WORLD_WIDTH; x += cellSize) {
      graphics.lineBetween(x, 0, x, WORLD_HEIGHT);
    }

    for (let y = 0; y <= WORLD_HEIGHT; y += cellSize) {
      graphics.lineBetween(0, y, WORLD_WIDTH, y);
    }
  }

  private drawRandomTents(count: number): void {
    const safeBounds = new Geom.Rectangle(120, 120, WORLD_WIDTH - 240, WORLD_HEIGHT - 240);

    for (let i = 0; i < count; i += 1) {
      const x = safeBounds.x + Math.random() * safeBounds.width;
      const y = safeBounds.y + Math.random() * safeBounds.height;
      this.drawTent(x, y);
    }
  }

  private drawTent(x: number, y: number): void {
    const tent = this.add.container(x, y);

    const body = this.add.triangle(0, 0, -20, 16, 0, -20, 20, 16, 0xcaa472, 1);
    body.setStrokeStyle(2, 0x684e2a, 1);

    const flap = this.add.triangle(0, 2, -8, 14, 0, -6, 8, 14, 0x936a3d, 1);

    const shadow = this.add.ellipse(0, 18, 42, 10, 0x000000, 0.15);

    tent.add([shadow, body, flap]);
    tent.setDepth(y);
  }

  private drawHud(): void {
    const label = this.add.text(16, 16, 'Drag/touch to pan • WASD move • Q/E or wheel zoom', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#ffffff',
      stroke: '#103316',
      strokeThickness: 3
    });

    label.setScrollFactor(0);
    label.setDepth(9999);

    const minimapHint = this.add.text(
      16,
      44,
      `World: ${WORLD_WIDTH} x ${WORLD_HEIGHT} (10x default viewport)`,
      {
        fontFamily: 'Arial',
        fontSize: '14px',
        color: '#dff3e0',
        stroke: '#103316',
        strokeThickness: 2
      }
    );

    minimapHint.setScrollFactor(0);
    minimapHint.setDepth(9999);
  }
}
