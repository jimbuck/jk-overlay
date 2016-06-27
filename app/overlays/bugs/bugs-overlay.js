
import {BaseOverlay} from '../base-overlay';

const BUGS_NAME = 'Bugs';

export class BugsOverlay extends BaseOverlay
{
    get name() {
        return BUGS_NAME;
    }

    constructor() {
        super();
    }

    start() {
        this.bugCtrl = new BugController({'minBugs':6, 'maxBugs':30, imageSprite: './overlays/bugs/fly-sprite.png'});
        this.spiderCtrl = new SpiderController({ 'minBugs': 2, 'maxBugs': 8, imageSprite: './overlays/bugs/spider-sprite.png' });
    }

    stop() {
        this.bugCtrl.end();
        delete this.bugCtrl;

        this.spiderCtrl.end();
        delete this.spiderCtrl;
    }
}