export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest', // Use the Vue 3 transformer
    '^.+\\.(ts|tsx)$': 'ts-jest',   // Use ts-jest for TypeScript files
  },
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
 },
};
