// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'

import {configure} from '@testing-library/dom'

configure({
    getElementError: (message, container) => {
      const error = new Error(message);
      error.name = 'TestingLibraryElementError';
      error.stack = null;
      return error;
    },
  });