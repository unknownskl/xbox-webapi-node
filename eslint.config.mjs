export default [
    {
        rules: {
            semi: "error",
            "prefer-const": "error",
            "consistent-return": 1,
            "no-mixed-operators": 0,
            "no-useless-constructor": 0,
            "standard/computed-property-even-spacing": 0,
            "no-async-promise-executor": 0,
            "import/first": 0,
            "no-unused-vars": 0,
            "no-console": 1,
            "no-fallthrough": 0,
            "no-case-declarations": 0,

            indent: ["error", 4, {
                SwitchCase: 1,
            }],
            semi: ["error", "never"],
            "brace-style": ["error", "1tbs", {
                allowSingleLine: true,
            }],
            radix: ["off"],
        }
    }
];