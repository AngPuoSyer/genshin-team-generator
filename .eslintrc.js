module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/vue3-recommended',
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  extends: ['plugin:vue/essential', '@vue/prettier', 'prettier'],

  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        trailingComma: 'all',
        useTabs: false,
        tabWidth: 2,
        arrowParens: 'avoid',
        endOfLine: 'lf',
        printWidth: 80,
      },
    ],
  },
};
