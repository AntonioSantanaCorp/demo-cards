import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { StoreService } from './services/products/store-service';
import { MemoryStoreService } from './services/products/memory-store.service';
import { ProductIDBStore } from './services/products/indexeddb-store.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: StoreService, useFactory: () => new ProductIDBStore() },
  ],
};
