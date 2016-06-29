
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
        //Default behavior of snowstorm.js is to auto-start. Stop it.
        snowStorm.stop();
        snowStorm.freeze();
    }

    start() {
        //timing -- snowstorm might not have initialized. Ensure that it is.
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