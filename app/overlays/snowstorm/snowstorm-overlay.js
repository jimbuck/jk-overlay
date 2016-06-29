
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
        snowStorm.toggleSnow();
    }

    start() {
        snowStorm.toggleSnow();
    }

    stop() {
        snowStorm.toggleSnow();
    }
}