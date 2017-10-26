import { Viewport } from '../src';

const viewport = Viewport.listen();

viewport.on('resize', () => console.log('Yo!'));
