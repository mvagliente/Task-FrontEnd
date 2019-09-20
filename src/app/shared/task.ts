import { Entity } from './entity';
import { State } from './state';
import { DigitalInfo } from './digital-info';

export class Task extends Entity {
    Description: string;
    State: State;
    digitalInfo: DigitalInfo;
}
