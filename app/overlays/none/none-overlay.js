
import {BaseOverlay} from '../base-overlay';

const NONE_NAME = 'None';

export class NoneOverlay extends BaseOverlay
{
  constructor() {
    super();
  }

  get name() {
    return NONE_NAME;
  }

  start() {
    
  }

  stop() {
    
  }
}