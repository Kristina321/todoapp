export default {
  test: {
    environment: 'jsdom',
    //include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,tsx,mtx,ctsx}'],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    },
  },
};
