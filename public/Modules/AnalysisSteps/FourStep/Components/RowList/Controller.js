import Storage from '../../../../../Factories/Storage';

let storage = new Storage();

export function setTitle(data) {
    storage.set('Title', JSON.stringify(data));
}

export function setColor(data) {
    storage.set('Color', JSON.stringify(data));
}

export function setVolume(data) {
    storage.set('Volume', JSON.stringify(data));
}

export function setGranular(data) {
    storage.set('Granular', JSON.stringify(data));
}

export function setGadget(data) {
    storage.set('Gadget', JSON.stringify(data));
}


export function getTitle(data) {
    storage.get('Title', data);
}

export function getColor(data) {
    storage.get('Color', data);
}

export function getVolume(data) {
    storage.get('Volume', data);
}

export function getGranular(data) {
    storage.get('Granular', data);
}

export function getGadget(data) {
    storage.get('Gadget', data);
}