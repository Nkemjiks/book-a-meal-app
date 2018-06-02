module.exports = {
    "extends": "airbnb",
    "rules": {
        "consistent-return": 0,
        "import/no-extraneous-dependencies": 0,
        "no-restricted-syntax": 0,
        "no-underscore-dangle": 0,
        "jsx-a11y/anchor-is-valid": 0,
        "react/forbid-prop-types": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "jsx-a11y/click-events-have-key-events": 0,
    },
    "globals": {
        "describe": true,
        "it": true,
        "before": true,
        "afterEach": true,
        "window": true,
        "document": true,
        "FormData": true,
    },
    "parser": "babel-eslint",
};