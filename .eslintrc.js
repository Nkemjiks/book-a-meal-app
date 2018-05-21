module.exports = {
    "extends": "airbnb",
    "rules": {
        "consistent-return": 0,
        "import/no-extraneous-dependencies": 0,
        "no-restricted-syntax": 0,
        "no-underscore-dangle": 0,
    },
    "globals": {
        "describe": true,
        "it": true,
        "before": true,
        "afterEach": true,
        "window": true,
        "document": true,
    },
    "parser": "babel-eslint",
};