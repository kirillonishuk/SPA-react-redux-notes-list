module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "env": {
        "browser": true,
        "node": true
    },
    "rules": {
        "linebreak-style": [
            2,
            "windows"
        ],
        "indent": [2, 4],
        "react/jsx-indent": [
            2,
            4
        ],
        "react/jsx-indent-props": [
            2,
            4
        ],
        "jsx-quotes": [
            2,
            "prefer-single"
        ],
        "no-tabs": 0,
        "import/extensions": 0,
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/destructuring-assignment": [2, "never"],
        "no-console": [2, { "allow": ["log", "error"] }],
        "no-underscore-dangle": [2, { "allow": ["_id"] }],
        "max-len": [2, { "code": 200 }],
        "jsx-a11y/label-has-for": [ 2, {
            "components": [ "Label" ],
            "required": {
                "some": [ "nesting", "id" ]
            },
            "allowChildren": false
        }]
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ]
};