
import {NoneOverlay} from './none/none-overlay';
import {BugsOverlay} from './bugs/bugs-overlay';
import {SnowStormOverlay} from './snowstorm/snowstorm-overlay';
import {FireworksOverlay} from './fireworks/fireworks-overlay';

// Add additional overlays here...
export const OVERLAYS = [
    new NoneOverlay(), // Always keep 'None' at the top.
    new BugsOverlay(),
    new SnowStormOverlay(),
    new FireworksOverlay()
];

// Share event name between main thread and render thread.
export const OVERLAY_CHANGED_EVENT = 'overlay-changed';
export const OVERLAY_INITIALIZE_EVENT = 'overlay-initialize';