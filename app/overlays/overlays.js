

import {BugsOverlay} from './bugs/bugs-overlay';
import {SnowStormOverlay} from './snowstorm/snowstorm-overlay';
import {NoneOverlay} from './none/none-overlay';

// Add additional overlays here...
export const OVERLAYS = [
    new BugsOverlay(),
    new SnowStormOverlay(),
    new NoneOverlay()
];

// Share event name between main thread and render thread.
export const OVERLAY_CHANGED_EVENT = 'overlay-changed';
export const OVERLAY_INITIALIZE_EVENT = 'overlay-initialize';