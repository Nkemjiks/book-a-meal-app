module.exports = {
    "extends": "airbnb",
    "ecmaFeatures": {
      modules: true
    },
    "rules": {
        "consistent-return": 0,
        "import/no-extraneous-dependencies": 0,
        "no-restricted-syntax": 0,
        "no-underscore-dangle": 0,
        "jsx-a11y/anchor-is-valid": 0,
        "react/forbid-prop-types": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "react/jsx-filename-extension": 0,
        "import/no-named-as-default": 0,
        "no-undef" : 2
    },
    "globals": {
        "describe": true,
        "it": true,
        "before": true,
        "after": true,
        "afterEach": true,
        "beforeEach": true,
        "window": true,
        "localStorage": true,
        "document": true,
        "FormData": true,
        "expect": true,
        "jest": true,
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module"
    }
};