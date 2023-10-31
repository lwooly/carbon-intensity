module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb-typescript", // for Airbnb with React and TypeScript
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended" // recommended rules from @typescript-eslint
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "./tsconfig.json" // path to your tsconfig.json
    },
    "plugins": [
        "react",
        "@typescript-eslint" // add TypeScript ESLint plugin
    ],
    "rules": {
        // your custom rules
    }
}
