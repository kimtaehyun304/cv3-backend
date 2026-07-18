import { Broadcast } from './types/productType';

let labangCache: Broadcast[] = [];
let homeShoppingCache: Broadcast[] = [];

export function getLabangCache() {
  return labangCache;
}

export function getHomeShoppingCache() {
  return homeShoppingCache;
}

export function setLabangCache(labangData: Broadcast[]) {
  labangCache = labangData;
}

export function setHomeShoppingCache(homeShoppingData: Broadcast[]) {
  homeShoppingCache = homeShoppingData;
}