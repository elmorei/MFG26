import { Input, Scene, Types } from 'phaser';
import { CAMERA_SPEED, MAX_ZOOM, MIN_ZOOM } from '../constants';

type CameraKeys = {
  up: Input.Keyboard.Key;
  down: Input.Keyboard.Key;
  left: Input.Keyboard.Key;
  right: Input.Keyboard.Key;
  zoomIn: Input.Keyboard.Key;
  zoomOut: Input.Keyboard.Key;
};

const clampZoom = (value: number): number => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));

export const createCameraControls = (scene: Scene): (() => void) => {
  const camera = scene.cameras.main;

  const keys = scene.input.keyboard?.addKeys({
    up: Input.Keyboard.KeyCodes.W,
    down: Input.Keyboard.KeyCodes.S,
    left: Input.Keyboard.KeyCodes.A,
    right: Input.Keyboard.KeyCodes.D,
    zoomIn: Input.Keyboard.KeyCodes.Q,
    zoomOut: Input.Keyboard.KeyCodes.E
  }) as CameraKeys | undefined;

  let isDragging = false;
  let previousWorld = { x: 0, y: 0 };

  const onPointerDown = (pointer: Types.Input.Pointer): void => {
    isDragging = pointer.primaryDown;
    previousWorld = pointer.positionToCamera(camera) as { x: number; y: number };
  };

  const onPointerMove = (pointer: Types.Input.Pointer): void => {
    if (!isDragging || !pointer.primaryDown) {
      return;
    }

    const world = pointer.positionToCamera(camera) as { x: number; y: number };
    camera.scrollX -= world.x - previousWorld.x;
    camera.scrollY -= world.y - previousWorld.y;
    previousWorld = world;
  };

  const onPointerUp = (): void => {
    isDragging = false;
  };

  const onWheel = (
    _pointer: Types.Input.Pointer,
    _currentlyOver: unknown[],
    _dx: number,
    dy: number
  ): void => {
    const zoomFactor = dy > 0 ? 0.9 : 1.1;
    camera.setZoom(clampZoom(camera.zoom * zoomFactor));
  };

  scene.input.on('pointerdown', onPointerDown);
  scene.input.on('pointermove', onPointerMove);
  scene.input.on('pointerup', onPointerUp);
  scene.input.on('pointerupoutside', onPointerUp);
  scene.input.on('wheel', onWheel);

  scene.events.on('update', (_time: number, delta: number) => {
    const seconds = delta / 1000;
    const amount = CAMERA_SPEED * seconds / camera.zoom;

    if (keys) {
      if (keys.left.isDown) camera.scrollX -= amount;
      if (keys.right.isDown) camera.scrollX += amount;
      if (keys.up.isDown) camera.scrollY -= amount;
      if (keys.down.isDown) camera.scrollY += amount;

      if (keys.zoomIn.isDown) {
        camera.setZoom(clampZoom(camera.zoom + 0.8 * seconds));
      }

      if (keys.zoomOut.isDown) {
        camera.setZoom(clampZoom(camera.zoom - 0.8 * seconds));
      }
    }
  });

  return () => {
    scene.input.off('pointerdown', onPointerDown);
    scene.input.off('pointermove', onPointerMove);
    scene.input.off('pointerup', onPointerUp);
    scene.input.off('pointerupoutside', onPointerUp);
    scene.input.off('wheel', onWheel);
  };
};
