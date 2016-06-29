
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
        snowStorm.freezeOnBlur = false;
        snowStorm.flakesMaxActive = 96;    // show more snow on screen at once
        snowStorm.useTwinkleEffect = true;
    }

    start() {
        if (!snowStorm.active) {
            snowStorm.start();
        }
        else {
            snowStorm.show();
            snowStorm.resume();
        }
    }

    stop() {
        snowStorm.stop();
        snowStorm.freeze();
    }
}