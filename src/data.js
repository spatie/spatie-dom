import { attribute } from './attribute';

export function data(name, element, fallback = '') {
    return attribute(`data-${name}`, element, fallback);
}