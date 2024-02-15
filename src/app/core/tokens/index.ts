import { InjectionToken } from '@angular/core';
import { IDBPDatabase, openDB } from 'idb';
import { AwazonDB } from '../models';

export const INDEXED_DATABASE = new InjectionToken<
  Promise<IDBPDatabase<AwazonDB>>
>('INDEXED_DATABASE', {
  providedIn: 'root',
  factory() {
    return openDB<AwazonDB>('AwazonDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('products')) {
          //create "table"
          const objectStore = db.createObjectStore('products', {
            keyPath: 'id',
            autoIncrement: true,
          });

          //create index
          objectStore.createIndex('category', 'category', { unique: false });
          objectStore.createIndex('title', 'title', { unique: false });
        }

        if (!db.objectStoreNames.contains('cartList')) {
          //create "table"
          const objectStore = db.createObjectStore('cartList', {
            autoIncrement: true,
          });
          objectStore.createIndex('id', 'id', { unique: false });
        }
      },
    });
  },
});
