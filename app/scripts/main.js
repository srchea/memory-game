/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  // Your custom JavaScript goes here

  /**
   * Memory game
   */
  class MemoryGame {
    constructor() {
      this.totalCards = 24;
      this.cardList = ['00a9', '00ae', '1f0cf', '1f1e6-1f1e8', '1f1e6-1f1e9', '1f1e6-1f1ea', '1f1e6-1f1eb', '1f1e6-1f1ec', '1f1e6-1f1ee', '1f1e6-1f1f1', '1f1e6-1f1f2', '1f1e6-1f1f4', '1f1e6-1f1f6', '1f1e6-1f1f7', '1f1e6-1f1f8', '1f1e6-1f1f9', '1f1e6-1f1fa', '1f1e6-1f1fc', '1f1e6-1f1fd', '1f1e6-1f1ff', '1f1e6', '1f1e7-1f1e6', '1f1e7-1f1e7', '1f1e7-1f1e9', '1f1e7-1f1ea', '1f1e7-1f1eb', '1f1e7-1f1ec', '1f1e7-1f1ed', '1f1e7-1f1ee', '1f1e7-1f1ef', '1f1e7-1f1f1', '1f1e7-1f1f2', '1f1e7-1f1f3', '1f1e7-1f1f4', '1f1e7-1f1f6', '1f1e7-1f1f7', '1f1e7-1f1f8', '1f1e7-1f1f9', '1f1e7-1f1fb', '1f1e7-1f1fc', '1f1e7-1f1fe', '1f1e7-1f1ff', '1f1e7', '1f1e8-1f1e6', '1f1e8-1f1e8', '1f1e8-1f1e9', '1f1e8-1f1eb', '1f1e8-1f1ec', '1f1e8-1f1ed', '1f1e8-1f1ee', '1f1e8-1f1f0', '1f1e8-1f1f1', '1f1e8-1f1f2', '1f1e8-1f1f3', '1f1e8-1f1f4', '1f1e8-1f1f5', '1f1e8-1f1f7', '1f1e8-1f1fa', '1f1e8-1f1fb', '1f1e8-1f1fc', '1f1e8-1f1fd', '1f1e8-1f1fe', '1f1e8-1f1ff', '1f1e8', '1f1e9-1f1ea', '1f1e9-1f1ec', '1f1e9-1f1ef', '1f1e9-1f1f0', '1f1e9-1f1f2', '1f1e9-1f1f4', '1f1e9-1f1ff', '1f1e9', '1f1ea-1f1e6', '1f1ea-1f1e8', '1f1ea-1f1ea', '1f1ea-1f1ec', '1f1ea-1f1ed', '1f1ea-1f1f7', '1f1ea-1f1f8', '1f1ea-1f1f9', '1f1ea-1f1fa', '1f1ea', '1f1eb-1f1ee', '1f1eb-1f1ef', '1f1eb-1f1f0', '1f1eb-1f1f2', '1f1eb-1f1f4', '1f1eb-1f1f7', '1f1eb', '1f1ec-1f1e6', '1f1ec-1f1e7', '1f1ec-1f1e9', '1f1ec-1f1ea', '1f1ec-1f1eb', '1f1ec-1f1ec', '1f1ec-1f1ed', '1f1ec-1f1ee', '1f1ec-1f1f1', '1f1ec-1f1f2', '1f1ec-1f1f3', '1f1ec-1f1f5', '1f1ec-1f1f6', '1f1ec-1f1f7', '1f1ec-1f1f8', '1f1ec-1f1f9', '1f1ec-1f1fa', '1f1ec-1f1fc', '1f1ec-1f1fe', '1f1ec', '1f1ed-1f1f0', '1f1ed-1f1f2', '1f1ed-1f1f3', '1f1ed-1f1f7', '1f1ed-1f1f9', '1f1ed-1f1fa', '1f1ed', '1f1ee-1f1e8', '1f1ee-1f1e9', '1f1ee-1f1ea', '1f1ee-1f1f1', '1f1ee-1f1f2', '1f1ee-1f1f3', '1f1ee-1f1f6', '1f1ee-1f1f7', '1f1ee-1f1f8', '1f1ee-1f1f9', '1f1ee', '1f1ef-1f1ea', '1f1ef-1f1f2', '1f1ef-1f1f4', '1f1ef-1f1f5', '1f1ef', '1f1f0-1f1ea', '1f1f0-1f1ec', '1f1f0-1f1ed', '1f1f0-1f1ee', '1f1f0-1f1f2', '1f1f0-1f1f3', '1f1f0-1f1f5', '1f1f0-1f1f7', '1f1f0-1f1fc', '1f1f0-1f1fe', '1f1f0-1f1ff', '1f1f0', '1f1f1-1f1e6', '1f1f1-1f1e7', '1f1f1-1f1e8', '1f1f1-1f1ee', '1f1f1-1f1f0', '1f1f1-1f1f7', '1f1f1-1f1f8', '1f1f1-1f1f9', '1f1f1-1f1fa', '1f1f1-1f1fb', '1f1f1-1f1fe', '1f1f1', '1f1f2-1f1e6', '1f1f2-1f1e8', '1f1f2-1f1e9', '1f1f2-1f1ea', '1f1f2-1f1ec', '1f1f2-1f1ed', '1f1f2-1f1f0', '1f1f2-1f1f1', '1f1f2-1f1f2', '1f1f2-1f1f3', '1f1f2-1f1f4', '1f1f2-1f1f5', '1f1f2-1f1f6', '1f1f2-1f1f7', '1f1f2-1f1f8', '1f1f2-1f1f9', '1f1f2-1f1fa', '1f1f2-1f1fb', '1f1f2-1f1fc', '1f1f2-1f1fd', '1f1f2-1f1fe', '1f1f2-1f1ff', '1f1f2', '1f1f3-1f1e6', '1f1f3-1f1e8', '1f1f3-1f1ea', '1f1f3-1f1eb', '1f1f3-1f1ec', '1f1f3-1f1ee', '1f1f3-1f1f1', '1f1f3-1f1f4', '1f1f3-1f1f5', '1f1f3-1f1f7', '1f1f3-1f1fa', '1f1f3-1f1ff', '1f1f3', '1f1f4-1f1f2', '1f1f4', '1f1f5-1f1e6', '1f1f5-1f1ea', '1f1f5-1f1eb', '1f1f5-1f1ec', '1f1f5-1f1ed', '1f1f5-1f1f0', '1f1f5-1f1f1', '1f1f5-1f1f2', '1f1f5-1f1f3', '1f1f5-1f1f7', '1f1f5-1f1f8', '1f1f5-1f1f9', '1f1f5-1f1fc', '1f1f5-1f1fe', '1f1f5', '1f1f6-1f1e6', '1f1f6', '1f1f7-1f1ea', '1f1f7-1f1f4', '1f1f7-1f1f8', '1f1f7-1f1fa', '1f1f7-1f1fc', '1f1f7', '1f1f8-1f1e6', '1f1f8-1f1e7', '1f1f8-1f1e8', '1f1f8-1f1e9', '1f1f8-1f1ea', '1f1f8-1f1ec', '1f1f8-1f1ed', '1f1f8-1f1ee', '1f1f8-1f1ef', '1f1f8-1f1f0', '1f1f8-1f1f1', '1f1f8-1f1f2', '1f1f8-1f1f3', '1f1f8-1f1f4', '1f1f8-1f1f7', '1f1f8-1f1f8', '1f1f8-1f1f9', '1f1f8-1f1fb', '1f1f8-1f1fd', '1f1f8-1f1fe', '1f1f8-1f1ff', '1f1f8', '1f1f9-1f1e6', '1f1f9-1f1e8', '1f1f9-1f1e9', '1f1f9-1f1eb', '1f1f9-1f1ec', '1f1f9-1f1ed', '1f1f9-1f1ef', '1f1f9-1f1f0', '1f1f9-1f1f1', '1f1f9-1f1f2', '1f1f9-1f1f3', '1f1f9-1f1f4', '1f1f9-1f1f7', '1f1f9-1f1f9', '1f1f9-1f1fb', '1f1f9-1f1fc', '1f1f9-1f1ff', '1f1f9', '1f1fa-1f1e6', '1f1fa-1f1ec', '1f1fa-1f1f2', '1f1fa-1f1f8', '1f1fa-1f1fe', '1f1fa-1f1ff', '1f1fa', '1f1fb-1f1e6', '1f1fb-1f1e8', '1f1fb-1f1ea', '1f1fb-1f1ec', '1f1fb-1f1ee', '1f1fb-1f1f3', '1f1fb-1f1fa', '1f1fb', '1f1fc-1f1eb', '1f1fc-1f1f8', '1f1fc', '1f1fd-1f1f0', '1f1fd', '1f1fe-1f1ea', '1f1fe-1f1f9', '1f1fe', '1f1ff-1f1e6', '1f1ff-1f1f2', '1f1ff-1f1fc', '1f1ff', '1f3a0', '1f3a1', '1f3a2', '1f3a3', '1f3a4', '1f3a5', '1f3a6', '1f3a7', '1f3a8', '1f3a9', '1f3aa', '1f3ab', '1f3ac', '1f3ad', '1f3ae', '1f3af', '1f3b0', '1f3b1', '1f3b2', '1f3b3', '1f3b4', '1f3b5', '1f3b6', '1f3b7', '1f3b8', '1f3b9', '1f3ba', '1f3bb', '1f3bc', '1f3bd', '1f3be', '1f3bf', '1f3c0', '1f3c1', '1f3c2', '1f3c3-1f3fb', '1f3c3-1f3fc', '1f3c3-1f3fd', '1f3c3-1f3fe', '1f3c3-1f3ff', '1f3c3', '1f3c4-1f3fb', '1f3c4-1f3fc', '1f3c4-1f3fd', '1f3c4-1f3fe', '1f3c4-1f3ff', '1f3c4', '1f3c5', '1f3c6', '1f3c7-1f3fb', '1f3c7-1f3fc', '1f3c7-1f3fd', '1f3c7-1f3fe', '1f3c7-1f3ff', '1f3c7', '1f3c8', '1f3c9', '1f3ca-1f3fb', '1f3ca-1f3fc', '1f3ca-1f3fd', '1f3ca-1f3fe', '1f3ca-1f3ff', '1f3ca', '1f3cb-1f3fb', '1f3cb-1f3fc', '1f3cb-1f3fd', '1f3cb-1f3fe', '1f3cb-1f3ff', '1f3cb', '1f3cc', '1f3cd', '1f3ce', '1f3cf', '1f3d0', '1f3d1', '1f3d2', '1f3d3', '1f3d4', '1f3d5', '1f3d6', '1f3d7', '1f3d8', '1f3d9', '1f3da', '1f3db', '1f3dc', '1f3dd', '1f3de', '1f3df', '1f3e0', '1f3e1', '1f3e2', '1f3e3', '1f3e4', '1f3e5', '1f3e6', '1f3e7', '1f3e8', '1f3e9', '1f3ea', '1f3eb', '1f3ec', '1f3ed', '1f3ee', '1f3ef', '1f3f0', '1f3f3-1f308', '1f3f3', '1f3f4', '1f3f5', '1f3f7', '1f3f8', '1f3f9', '1f3fa', '1f004', '1f4a0', '1f4a1', '1f4a2', '1f4a3', '1f4a4', '1f4a5', '1f4a6', '1f4a7', '1f4a8', '1f4a9', '1f4aa-1f3fb', '1f4aa-1f3fc', '1f4aa-1f3fd', '1f4aa-1f3fe', '1f4aa-1f3ff', '1f4aa', '1f4ab', '1f4ac', '1f4ad', '1f4ae', '1f4af', '1f4b0', '1f4b1', '1f4b2', '1f4b3', '1f4b4', '1f4b5', '1f4b6', '1f4b7', '1f4b8', '1f4b9', '1f4ba', '1f4bb', '1f4bc', '1f4bd', '1f4be', '1f4bf', '1f4c0', '1f4c1', '1f4c2', '1f4c3', '1f4c4', '1f4c5', '1f4c6', '1f4c7', '1f4c8', '1f4c9', '1f4ca', '1f4cb', '1f4cc', '1f4cd', '1f4ce', '1f4cf', '1f4d0', '1f4d1', '1f4d2', '1f4d3', '1f4d4', '1f4d5', '1f4d6', '1f4d7', '1f4d8', '1f4d9', '1f4da', '1f4db', '1f4dc', '1f4dd', '1f4de', '1f4df', '1f4e0', '1f4e1', '1f4e2', '1f4e3', '1f4e4', '1f4e5', '1f4e6', '1f4e7', '1f4e8', '1f4e9', '1f4ea', '1f4eb', '1f4ec', '1f4ed', '1f4ee', '1f4ef', '1f4f0', '1f4f1', '1f4f2', '1f4f3', '1f4f4', '1f4f5', '1f4f6', '1f4f7', '1f4f8', '1f4f9', '1f4fa', '1f4fb', '1f4fc', '1f4fd', '1f4ff', '1f5a4', '1f5a5', '1f5a8', '1f5b1', '1f5b2', '1f5bc', '1f5c2', '1f5c3', '1f5c4', '1f5d1', '1f5d2', '1f5d3', '1f5dc', '1f5dd', '1f5de', '1f5e1', '1f5e3', '1f5e8', '1f5ef', '1f5f3', '1f5fa', '1f5fb', '1f5fc', '1f5fd', '1f5fe', '1f5ff', '1f6a0', '1f6a1', '1f6a2', '1f6a3-1f3fb', '1f6a3-1f3fc', '1f6a3-1f3fd', '1f6a3-1f3fe', '1f6a3-1f3ff', '1f6a3', '1f6a4', '1f6a5', '1f6a6', '1f6a7', '1f6a8', '1f6a9', '1f6aa', '1f6ab', '1f6ac', '1f6ad', '1f6ae', '1f6af', '1f6b0', '1f6b1', '1f6b2', '1f6b3', '1f6b4-1f3fb', '1f6b4-1f3fc', '1f6b4-1f3fd', '1f6b4-1f3fe', '1f6b4-1f3ff', '1f6b4', '1f6b5-1f3fb', '1f6b5-1f3fc', '1f6b5-1f3fd', '1f6b5-1f3fe', '1f6b5-1f3ff', '1f6b5', '1f6b6-1f3fb', '1f6b6-1f3fc', '1f6b6-1f3fd', '1f6b6-1f3fe', '1f6b6-1f3ff', '1f6b6', '1f6b7', '1f6b8', '1f6b9', '1f6ba', '1f6bb', '1f6bc', '1f6bd', '1f6be', '1f6bf', '1f6c0-1f3fb', '1f6c0-1f3fc', '1f6c0-1f3fd', '1f6c0-1f3fe', '1f6c0-1f3ff', '1f6c0', '1f6c1', '1f6c2', '1f6c3', '1f6c4', '1f6c5', '1f6cb', '1f6cc', '1f6cd', '1f6ce', '1f6cf', '1f6d0', '1f6d1', '1f6d2', '1f6e0', '1f6e1', '1f6e2', '1f6e3', '1f6e4', '1f6e5', '1f6e9', '1f6eb', '1f6ec', '1f6f0', '1f6f3', '1f6f4', '1f6f5', '1f6f6', '1f9c0', '1f17e', '1f17f', '1f18e', '1f19a', '1f21a', '1f22f', '1f23a', '1f30a', '1f30b', '1f30c', '1f30d', '1f30e', '1f30f', '1f31a', '1f31b', '1f31c', '1f31d', '1f31e', '1f31f', '1f32a', '1f32b', '1f32c', '1f32d', '1f32e', '1f32f', '1f33a', '1f33b', '1f33c', '1f33d', '1f33e', '1f33f', '1f34a', '1f34b', '1f34c', '1f34d', '1f34e', '1f34f', '1f35a', '1f35b', '1f35c', '1f35d', '1f35e', '1f35f', '1f36a', '1f36b', '1f36c', '1f36d', '1f36e', '1f36f', '1f37a', '1f37b', '1f37c', '1f37d', '1f37e', '1f37f', '1f38a', '1f38b', '1f38c', '1f38d', '1f38e', '1f38f', '1f39a', '1f39b', '1f39e', '1f39f', '1f40a', '1f40b', '1f40c', '1f40d', '1f40e', '1f40f', '1f41a', '1f41b', '1f41c', '1f41d', '1f41e', '1f41f', '1f42a', '1f42b', '1f42c', '1f42d', '1f42e', '1f42f', '1f43a', '1f43b', '1f43c', '1f43d', '1f43e', '1f43f', '1f44a-1f3fb', '1f44a-1f3fc', '1f44a-1f3fd', '1f44a-1f3fe', '1f44a-1f3ff', '1f44a', '1f44b-1f3fb', '1f44b-1f3fc', '1f44b-1f3fd', '1f44b-1f3fe', '1f44b-1f3ff', '1f44b', '1f44c-1f3fb', '1f44c-1f3fc', '1f44c-1f3fd', '1f44c-1f3fe', '1f44c-1f3ff', '1f44c', '1f44d-1f3fb', '1f44d-1f3fc', '1f44d-1f3fd', '1f44d-1f3fe', '1f44d-1f3ff', '1f44d', '1f44e-1f3fb', '1f44e-1f3fc', '1f44e-1f3fd', '1f44e-1f3fe', '1f44e-1f3ff', '1f44e', '1f44f-1f3fb', '1f44f-1f3fc', '1f44f-1f3fd', '1f44f-1f3fe', '1f44f-1f3ff', '1f44f', '1f45a', '1f45b', '1f45c', '1f45d', '1f45e', '1f45f', '1f46a', '1f46b', '1f46c', '1f46d', '1f46e-1f3fb', '1f46e-1f3fc', '1f46e-1f3fd', '1f46e-1f3fe', '1f46e-1f3ff', '1f46e', '1f46f', '1f47a', '1f47b', '1f47c-1f3fb', '1f47c-1f3fc', '1f47c-1f3fd', '1f47c-1f3fe', '1f47c-1f3ff', '1f47c', '1f47d', '1f47e', '1f47f', '1f48a', '1f48b', '1f48c', '1f48d', '1f48e', '1f48f', '1f49a', '1f49b', '1f49c', '1f49d', '1f49e', '1f49f', '1f50a', '1f50b', '1f50c', '1f50d', '1f50e', '1f50f', '1f51a', '1f51b', '1f51c', '1f51d', '1f51e', '1f51f', '1f52a', '1f52b', '1f52c', '1f52d', '1f52e', '1f52f', '1f53a', '1f53b', '1f53c', '1f53d', '1f54a', '1f54b', '1f54c', '1f54d', '1f54e', '1f55a', '1f55b', '1f55c', '1f55d', '1f55e', '1f55f', '1f56f', '1f57a-1f3fb', '1f57a-1f3fc', '1f57a-1f3fd', '1f57a-1f3fe', '1f57a-1f3ff', '1f57a', '1f58a', '1f58b', '1f58c', '1f58d', '1f60a', '1f60b', '1f60c', '1f60d', '1f60e', '1f60f', '1f61a', '1f61b', '1f61c', '1f61d', '1f61e', '1f61f', '1f62a', '1f62b', '1f62c', '1f62d', '1f62e', '1f62f', '1f63a', '1f63b', '1f63c', '1f63d', '1f63e', '1f63f', '1f64a', '1f64b-1f3fb', '1f64b-1f3fc', '1f64b-1f3fd', '1f64b-1f3fe', '1f64b-1f3ff', '1f64b', '1f64c-1f3fb', '1f64c-1f3fc', '1f64c-1f3fd', '1f64c-1f3fe', '1f64c-1f3ff', '1f64c', '1f64d-1f3fb', '1f64d-1f3fc', '1f64d-1f3fd', '1f64d-1f3fe', '1f64d-1f3ff', '1f64d', '1f64e-1f3fb', '1f64e-1f3fc', '1f64e-1f3fd', '1f64e-1f3fe', '1f64e-1f3ff', '1f64e', '1f64f-1f3fb', '1f64f-1f3fc', '1f64f-1f3fd', '1f64f-1f3fe', '1f64f-1f3ff', '1f64f', '1f68a', '1f68b', '1f68c', '1f68d', '1f68e', '1f68f', '1f69a', '1f69b', '1f69c', '1f69d', '1f69e', '1f69f', '1f91a-1f3fb', '1f91a-1f3fc', '1f91a-1f3fd', '1f91a-1f3fe', '1f91a-1f3ff', '1f91a', '1f91b-1f3fb', '1f91b-1f3fc', '1f91b-1f3fd', '1f91b-1f3fe', '1f91b-1f3ff', '1f91b', '1f91c-1f3fb', '1f91c-1f3fc', '1f91c-1f3fd', '1f91c-1f3fe', '1f91c-1f3ff', '1f91c', '1f91d-1f3fb', '1f91d-1f3fc', '1f91d-1f3fd', '1f91d-1f3fe', '1f91d-1f3ff', '1f91d', '1f91e-1f3fb', '1f91e-1f3fc', '1f91e-1f3fd', '1f91e-1f3fe', '1f91e-1f3ff', '1f91e', '1f93a', '1f93b-1f3fb', '1f93b-1f3fc', '1f93b-1f3fd', '1f93b-1f3fe', '1f93b-1f3ff', '1f93b', '1f93c-1f3fb', '1f93c-1f3fc', '1f93c-1f3fd', '1f93c-1f3fe', '1f93c-1f3ff', '1f93c', '1f93d-1f3fb', '1f93d-1f3fc', '1f93d-1f3fd', '1f93d-1f3fe', '1f93d-1f3ff', '1f93d', '1f93e-1f3fb', '1f93e-1f3fc', '1f93e-1f3fd', '1f93e-1f3fe', '1f93e-1f3ff', '1f93e', '1f93f', '1f94a', '1f94b', '1f95a', '1f95b', '1f95c', '1f95d', '1f95e', '1f98a', '1f98b', '1f98c', '1f98d', '1f98e', '1f98f', '1f170', '1f171', '1f191', '1f192', '1f193', '1f194', '1f195', '1f196', '1f197', '1f198', '1f199', '1f201', '1f202', '1f232', '1f233', '1f234', '1f235', '1f236', '1f237', '1f238', '1f239', '1f250', '1f251', '1f300', '1f301', '1f302', '1f303', '1f304', '1f305', '1f306', '1f307', '1f308', '1f309', '1f310', '1f311', '1f312', '1f313', '1f314', '1f315', '1f316', '1f317', '1f318', '1f319', '1f320', '1f321', '1f324', '1f325', '1f326', '1f327', '1f328', '1f329', '1f330', '1f331', '1f332', '1f333', '1f334', '1f335', '1f336', '1f337', '1f338', '1f339', '1f340', '1f341', '1f342', '1f343', '1f344', '1f345', '1f346', '1f347', '1f348', '1f349', '1f350', '1f351', '1f352', '1f353', '1f354', '1f355', '1f356', '1f357', '1f358', '1f359', '1f360', '1f361', '1f362', '1f363', '1f364', '1f365', '1f366', '1f367', '1f368', '1f369', '1f370', '1f371', '1f372', '1f373', '1f374', '1f375', '1f376', '1f377', '1f378', '1f379', '1f380', '1f381', '1f382', '1f383', '1f384', '1f385-1f3fb', '1f385-1f3fc', '1f385-1f3fd', '1f385-1f3fe', '1f385-1f3ff', '1f385', '1f386', '1f387', '1f388', '1f389', '1f390', '1f391', '1f392', '1f393', '1f396', '1f397', '1f399', '1f400', '1f401', '1f402', '1f403', '1f404', '1f405', '1f406', '1f407', '1f408', '1f409', '1f410', '1f411', '1f412', '1f413', '1f414', '1f415', '1f416', '1f417', '1f418', '1f419', '1f420', '1f421', '1f422', '1f423', '1f424', '1f425', '1f426', '1f427', '1f428', '1f429', '1f430', '1f431', '1f432', '1f433', '1f434', '1f435', '1f436', '1f437', '1f438', '1f439', '1f440', '1f441-1f5e8', '1f441', '1f442-1f3fb', '1f442-1f3fc', '1f442-1f3fd', '1f442-1f3fe', '1f442-1f3ff', '1f442', '1f443-1f3fb', '1f443-1f3fc', '1f443-1f3fd', '1f443-1f3fe', '1f443-1f3ff', '1f443', '1f444', '1f445', '1f446-1f3fb', '1f446-1f3fc', '1f446-1f3fd', '1f446-1f3fe', '1f446-1f3ff', '1f446', '1f447-1f3fb', '1f447-1f3fc', '1f447-1f3fd', '1f447-1f3fe', '1f447-1f3ff', '1f447', '1f448-1f3fb', '1f448-1f3fc', '1f448-1f3fd', '1f448-1f3fe', '1f448-1f3ff', '1f448', '1f449-1f3fb', '1f449-1f3fc', '1f449-1f3fd', '1f449-1f3fe', '1f449-1f3ff', '1f449', '1f450-1f3fb', '1f450-1f3fc', '1f450-1f3fd', '1f450-1f3fe', '1f450-1f3ff', '1f450', '1f451', '1f452', '1f453', '1f454', '1f455', '1f456', '1f457', '1f458', '1f459', '1f460', '1f461', '1f462', '1f463', '1f464', '1f465', '1f466-1f3fb', '1f466-1f3fc', '1f466-1f3fd', '1f466-1f3fe', '1f466-1f3ff', '1f466', '1f467-1f3fb', '1f467-1f3fc', '1f467-1f3fd', '1f467-1f3fe', '1f467-1f3ff', '1f467', '1f468-1f3fb', '1f468-1f3fc', '1f468-1f3fd', '1f468-1f3fe', '1f468-1f3ff', '1f468-1f468-1f466-1f466', '1f468-1f468-1f466', '1f468-1f468-1f467-1f466', '1f468-1f468-1f467-1f467', '1f468-1f468-1f467', '1f468-1f469-1f466-1f466', '1f468-1f469-1f467-1f466', '1f468-1f469-1f467-1f467', '1f468-1f469-1f467', '1f468-2764-1f48b-1f468', '1f468-2764-1f468', '1f468', '1f469-1f3fb', '1f469-1f3fc', '1f469-1f3fd', '1f469-1f3fe', '1f469-1f3ff', '1f469-1f469-1f466-1f466', '1f469-1f469-1f466', '1f469-1f469-1f467-1f466', '1f469-1f469-1f467-1f467', '1f469-1f469-1f467', '1f469-2764-1f48b-1f469', '1f469-2764-1f469', '1f469', '1f470-1f3fb', '1f470-1f3fc', '1f470-1f3fd', '1f470-1f3fe', '1f470-1f3ff', '1f470', '1f471-1f3fb', '1f471-1f3fc', '1f471-1f3fd', '1f471-1f3fe', '1f471-1f3ff', '1f471', '1f472-1f3fb', '1f472-1f3fc', '1f472-1f3fd', '1f472-1f3fe', '1f472-1f3ff', '1f472', '1f473-1f3fb', '1f473-1f3fc', '1f473-1f3fd', '1f473-1f3fe', '1f473-1f3ff', '1f473', '1f474-1f3fb', '1f474-1f3fc', '1f474-1f3fd', '1f474-1f3fe', '1f474-1f3ff', '1f474', '1f475-1f3fb', '1f475-1f3fc', '1f475-1f3fd', '1f475-1f3fe', '1f475-1f3ff', '1f475', '1f476-1f3fb', '1f476-1f3fc', '1f476-1f3fd', '1f476-1f3fe', '1f476-1f3ff', '1f476', '1f477-1f3fb', '1f477-1f3fc', '1f477-1f3fd', '1f477-1f3fe', '1f477-1f3ff', '1f477', '1f478-1f3fb', '1f478-1f3fc', '1f478-1f3fd', '1f478-1f3fe', '1f478-1f3ff', '1f478', '1f479', '1f480', '1f481-1f3fb', '1f481-1f3fc', '1f481-1f3fd', '1f481-1f3fe', '1f481-1f3ff', '1f481', '1f482-1f3fb', '1f482-1f3fc', '1f482-1f3fd', '1f482-1f3fe', '1f482-1f3ff', '1f482', '1f483-1f3fb', '1f483-1f3fc', '1f483-1f3fd', '1f483-1f3fe', '1f483-1f3ff', '1f483', '1f484', '1f485-1f3fb', '1f485-1f3fc', '1f485-1f3fd', '1f485-1f3fe', '1f485-1f3ff', '1f485', '1f486-1f3fb', '1f486-1f3fc', '1f486-1f3fd', '1f486-1f3fe', '1f486-1f3ff', '1f486', '1f487-1f3fb', '1f487-1f3fc', '1f487-1f3fd', '1f487-1f3fe', '1f487-1f3ff', '1f487', '1f488', '1f489', '1f490', '1f491', '1f492', '1f493', '1f494', '1f495', '1f496', '1f497', '1f498', '1f499', '1f500', '1f501', '1f502', '1f503', '1f504', '1f505', '1f506', '1f507', '1f508', '1f509', '1f510', '1f511', '1f512', '1f513', '1f514', '1f515', '1f516', '1f517', '1f518', '1f519', '1f520', '1f521', '1f522', '1f523', '1f524', '1f525', '1f526', '1f527', '1f528', '1f529', '1f530', '1f531', '1f532', '1f533', '1f534', '1f535', '1f536', '1f537', '1f538', '1f539', '1f549', '1f550', '1f551', '1f552', '1f553', '1f554', '1f555', '1f556', '1f557', '1f558', '1f559', '1f560', '1f561', '1f562', '1f563', '1f564', '1f565', '1f566', '1f567', '1f570', '1f573', '1f574', '1f575-1f3fb', '1f575-1f3fc', '1f575-1f3fd', '1f575-1f3fe', '1f575-1f3ff', '1f575', '1f576', '1f577', '1f578', '1f579', '1f587', '1f590-1f3fb', '1f590-1f3fc', '1f590-1f3fd', '1f590-1f3fe', '1f590-1f3ff', '1f590', '1f595-1f3fb', '1f595-1f3fc', '1f595-1f3fd', '1f595-1f3fe', '1f595-1f3ff', '1f595', '1f596-1f3fb', '1f596-1f3fc', '1f596-1f3fd', '1f596-1f3fe', '1f596-1f3ff', '1f596', '1f600', '1f601', '1f602', '1f603', '1f604', '1f605', '1f606', '1f607', '1f608', '1f609', '1f610', '1f611', '1f612', '1f613', '1f614', '1f615', '1f616', '1f617', '1f618', '1f619', '1f620', '1f621', '1f622', '1f623', '1f624', '1f625', '1f626', '1f627', '1f628', '1f629', '1f630', '1f631', '1f632', '1f633', '1f634', '1f635', '1f636', '1f637', '1f638', '1f639', '1f640', '1f641', '1f642', '1f643', '1f644', '1f645-1f3fb', '1f645-1f3fc', '1f645-1f3fd', '1f645-1f3fe', '1f645-1f3ff', '1f645', '1f646-1f3fb', '1f646-1f3fc', '1f646-1f3fd', '1f646-1f3fe', '1f646-1f3ff', '1f646', '1f647-1f3fb', '1f647-1f3fc', '1f647-1f3fd', '1f647-1f3fe', '1f647-1f3ff', '1f647', '1f648', '1f649', '1f680', '1f681', '1f682', '1f683', '1f684', '1f685', '1f686', '1f687', '1f688', '1f689', '1f690', '1f691', '1f692', '1f693', '1f694', '1f695', '1f696', '1f697', '1f698', '1f699', '1f910', '1f911', '1f912', '1f913', '1f914', '1f915', '1f916', '1f917', '1f918-1f3fb', '1f918-1f3fc', '1f918-1f3fd', '1f918-1f3fe', '1f918-1f3ff', '1f918', '1f919-1f3fb', '1f919-1f3fc', '1f919-1f3fd', '1f919-1f3fe', '1f919-1f3ff', '1f919', '1f920', '1f921', '1f922', '1f923', '1f924', '1f925', '1f926-1f3fb', '1f926-1f3fc', '1f926-1f3fd', '1f926-1f3fe', '1f926-1f3ff', '1f926', '1f927', '1f930-1f3fb', '1f930-1f3fc', '1f930-1f3fd', '1f930-1f3fe', '1f930-1f3ff', '1f930', '1f933-1f3fb', '1f933-1f3fc', '1f933-1f3fd', '1f933-1f3fe', '1f933-1f3ff', '1f933', '1f934-1f3fb', '1f934-1f3fc', '1f934-1f3fd', '1f934-1f3fe', '1f934-1f3ff', '1f934', '1f935-1f3fb', '1f935-1f3fc', '1f935-1f3fd', '1f935-1f3fe', '1f935-1f3ff', '1f935', '1f936-1f3fb', '1f936-1f3fc', '1f936-1f3fd', '1f936-1f3fe', '1f936-1f3ff', '1f936', '1f937-1f3fb', '1f937-1f3fc', '1f937-1f3fd', '1f937-1f3fe', '1f937-1f3ff', '1f937', '1f938-1f3fb', '1f938-1f3fc', '1f938-1f3fd', '1f938-1f3fe', '1f938-1f3ff', '1f938', '1f939-1f3fb', '1f939-1f3fc', '1f939-1f3fd', '1f939-1f3fe', '1f939-1f3ff', '1f939', '1f940', '1f941', '1f942', '1f943', '1f944', '1f945', '1f946', '1f947', '1f948', '1f949', '1f950', '1f951', '1f952', '1f953', '1f954', '1f955', '1f956', '1f957', '1f958', '1f959', '1f960', '1f961', '1f980', '1f981', '1f982', '1f983', '1f984', '1f985', '1f986', '1f987', '1f988', '1f989', '1f990', '1f991', '002a-20e3', '002a', '2b1b', '2b1c', '2b05', '2b06', '2b07', '2b50', '2b55', '21a9', '21aa', '0023-20e3', '0023', '23cf', '23e9', '23ea', '23eb', '23ec', '23ed', '23ee', '23ef', '23f0', '23f1', '23f2', '23f3', '23f8', '23f9', '23fa', '24c2', '25aa', '25ab', '25b6', '25c0', '25fb', '25fc', '25fd', '25fe', '26a0', '26a1', '26aa', '26ab', '26b0', '26b1', '26bd', '26be', '26c4', '26c5', '26c8', '26ce', '26cf', '26d1', '26d3', '26d4', '26e9', '26ea', '26f0', '26f1', '26f2', '26f3', '26f4', '26f5', '26f7', '26f8', '26f9-1f3fb', '26f9-1f3fc', '26f9-1f3fd', '26f9-1f3fe', '26f9-1f3ff', '26f9', '26fa', '26fd', '27a1', '27b0', '27bf', '0030-20e3', '0030', '0031-20e3', '0031', '0032-20e3', '0032', '0033-20e3', '0033', '0034-20e3', '0034', '0035-20e3', '0035', '0036-20e3', '0036', '0037-20e3', '0037', '0038-20e3', '0038', '0039-20e3', '0039', '203c', '231a', '231b', '260e', '261d-1f3fb', '261d-1f3fc', '261d-1f3fd', '261d-1f3fe', '261d-1f3ff', '261d', '262a', '262e', '262f', '263a', '264a', '264b', '264c', '264d', '264e', '264f', '267b', '267f', '269b', '269c', '270a-1f3fb', '270a-1f3fc', '270a-1f3fd', '270a-1f3fe', '270a-1f3ff', '270a', '270b-1f3fb', '270b-1f3fc', '270b-1f3fd', '270b-1f3fe', '270b-1f3ff', '270b', '270c-1f3fb', '270c-1f3fc', '270c-1f3fd', '270c-1f3fe', '270c-1f3ff', '270c', '270d-1f3fb', '270d-1f3fc', '270d-1f3fd', '270d-1f3fe', '270d-1f3ff', '270d', '270f', '271d', '274c', '274e', '303d', '2049', '2122', '2139', '2194', '2195', '2196', '2197', '2198', '2199', '2328', '2600', '2601', '2602', '2603', '2604', '2611', '2614', '2615', '2618', '2620', '2622', '2623', '2626', '2638', '2639', '2648', '2649', '2650', '2651', '2652', '2653', '2660', '2663', '2665', '2666', '2668', '2692', '2693', '2694', '2696', '2697', '2699', '2702', '2705', '2708', '2709', '2712', '2714', '2716', '2721', '2728', '2733', '2734', '2744', '2747', '2753', '2754', '2755', '2757', '2763', '2764', '2795', '2796', '2797', '2934', '2935', '3030', '3297', '3299']; // eslint-disable-line max-len

      if (this.totalCards % 2 !== 0) {
        throw new Error('totalCards should be an even number');
      }

      this.currentCards = {};
      this.flippedCard = null;
      this.isChecking = false;
      this.CARD_STATE_UNKNOWN = 0;
      this.CARD_STATE_FLIPPED = 1;
      this.CARD_STATE_FOUND = 2;
      this.message = '';
      this.bubble = document.querySelector('.bubble');
      // this.host = new Host();
    }

    reset() {
      this.generateCards();
    }

    shuffleCards(cards) {
      for (let i = cards.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [cards[i - 1], cards[j]] = [cards[j], cards[i - 1]];
      }
    }

    generateCards() {
      let remainingCards = this.getTotalUniqueCards();
      let cards = [];
      let drawCard = null;

      while (remainingCards > 0) {
        let random = Math.floor(Math.random() * this.cardList.length);
        drawCard = this.cardList[random];
        if (cards.indexOf(drawCard + '--1') === -1) {
          cards.push(drawCard + '--1');
          cards.push(drawCard + '--2');
        }
        remainingCards--;
      }

      this.shuffleCards(cards);

      let cardImages = [];
      this.currentCards = {};
      for (let card of cards) {
        this.currentCards[card] = this.CARD_STATE_UNKNOWN;
        cardImages.push(card.replace('--1', '').replace('--2', ''));
      }

      let i = 0;
      let cardElements = document.querySelectorAll('.card');
      cardElements.forEach(card => {
        let back = card.querySelector('.card__flipper--back');
        if (back) {
          back.style.backgroundImage = 'url(/images/emojione/' +
            cardImages[i] +
            '.svg)';
        }

        card.setAttribute('data-image', cardImages[i]);
        card.setAttribute('data-unique', cards[i]);
        card.addEventListener('click', this.clickCardEvent.bind(this, card));

        i++;
      });
    }

    clickCardEvent(card) {
      if (!this.isChecking) {
        let unique = card.getAttribute('data-unique');

        this.setFlippedCard(unique);
        this.checkFound(unique);
      }
    }

    setFlippedCard(cardId) {
      document.querySelector('[data-unique="' + cardId + '"]')
              .classList.add('card--flipped');
    }

    checkFound(cardId) {
      if (this.flippedCard) {
        // found
        let flippedImg = this.flippedCard.replace('--1', '').replace('--2', '');
        let cardImage = cardId.replace('--1', '').replace('--2', '');

        if (this.flippedCard !== cardId && flippedImg === cardImage) {
          document.querySelector('[data-unique="' + cardId + '"]').classList
                  .add('card--found');
          document.querySelector('[data-unique="' + this.flippedCard + '"]')
                  .classList.add('card--found');
          this.setMessageBubble('Nice one!');
        } else {
          // not found
          this.isChecking = true;
          this.setMessageBubble('Not found, try again');
          ((memoryGame, card1, card2) => setTimeout(() => {
            document.querySelector('[data-unique="' + card1 + '"]').classList
              .remove('card--flipped');
            document.querySelector('[data-unique="' + card2 + '"]').classList
              .remove('card--flipped');
            memoryGame.isChecking = false;
          }, 1000))(this, this.flippedCard, cardId);
        }

        this.flippedCard = null;
      } else {
        // one card flipped
        this.flippedCard = cardId;
        this.setMessageBubble('One card flipped');
      }
    }

    getTotalUniqueCards() {
      return this.totalCards / 2;
    }

    setMessageBubble(message) {
      if (message === '') {
        this.bubble.style.display = 'none';
      }
      this.bubble.style.display = 'block';
      this.bubble.innerText = message;
    }
  }

  // class Host {
  //   constructor() {
  //     this.emotions = [
  //       'smiling-face',
  //       'smiling-eyes',
  //       'joy',
  //       'love',
  //       'wry',
  //       'kiss',
  //       'weary',
  //       'cry',
  //       'pouting'
  //     ];
  //   }
  // }

  window.memoryGame = new MemoryGame();
  window.memoryGame.reset();
})();
