// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // 'CRLF'(windows) or 'LF'(unix)   ["error", "windows"]
    'linebreak-style': 'off',
    // can you use console
    'no-console': 'off',
    // can you use alert
    'no-alert': 'off',
    // can you use bitwise
    'no-bitwise': 'off',
    /*
    * allows (but does not require) trailing commas when the last element or property is in a different line than the closing ] or } and disallows trailing commas when the last element or property is on the same line as the closing ] or }
    * Trailing commas in function declarations and function calls are valid syntax since ECMAScript 2017; however, the string option does not check these situations for backwards compatibility.
    * But array is "never"
    */
    'comma-dangle': ["error", 'only-multiline', {
      "arrays": "never"
    }],
    /*
    * Because the unary ++ and -- operators are subject to automatic semicolon insertion, differences in whitespace can change semantics of source code.
    * but in here allows unary operators ++ and -- in the afterthought (final expression) of a for loop.
    */
    'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }],
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
