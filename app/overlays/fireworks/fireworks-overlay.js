
import {BaseOverlay} from '../base-overlay';

const FIREWORKS_NAME = 'Fireworks';

export class FireworksOverlay extends BaseOverlay {
    
    get name() {
        return FIREWORKS_NAME;
    }

    constructor() {
        super();
        
        this.fireworks = null;
        this.timer = null;
    }

    init() {
        this.fireworks = new Fireworks();

        this.fireworks["fworkSpeed"] = 4;
        this.fireworks["fworkAccel"] = 15;
        this.fireworks["showShockwave"] = false;
        this.fireworks["showTarget"] = false;
        this.fireworks["partCount"] = 40;
        this.fireworks["partSpeed"] = 5;
        this.fireworks["partSpeedVariance"] = 10;
        this.fireworks["partWind"] = 50;
        this.fireworks["partFriction"] = 10;
        this.fireworks["partGravity"] = 1;
        this.fireworks["flickerDensity"] = 15;
        this.fireworks["hueMin"] = 0;
        this.fireworks["hueMax"] = 360;
        this.fireworks["hueVariance"] = 10;
        this.fireworks["lineWidth"] = 3;
        this.fireworks["clearAlpha"] = 20;
    }

    start() {
        if (this.timer) {
            return;
        }

        this.fire();
    }

    stop() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    fire() {
        this.fireworks.shoot();
        this.timer = setTimeout(this.fire.bind(this), ((Math.random() * 5) + 1) * 50);
    }
}