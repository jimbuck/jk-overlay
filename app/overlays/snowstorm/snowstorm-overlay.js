
import {BaseOverlay} from '../base-overlay';

const SNOWSTORM_NAME = 'Snowstorm';

export class SnowStormOverlay extends BaseOverlay {
    get name() {
        return SNOWSTORM_NAME;
    }

    constructor() {
        super();
    }

    init() {
        //Initialize snowstorm so that it doesn't auto-start.
        snowStorm.autoStart = false;
        snowStorm.stop();
        snowStorm.freeze();
    }

    start() {
        snowStorm.show();
        snowStorm.resume();
    }

    stop() {
        snowStorm.stop();
        snowStorm.freeze();
    }
}