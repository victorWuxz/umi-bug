module.exports = {
    extends: ['plugin:mew/react-typescript'],
    globals: {
        page: true,
        REACT_APP_ENV: true,
        APP_TYPE: true,
        CASTOKEN: true,
        NODE_ENV: true,
    },
    rules: {
    // 不允许使用undefined
        'no-undefined': 1,
        'react/jsx-no-bind': 0,
        'react/prop-types': 1,
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'import/no-extraneous-dependencies': 1,
        'max-lines-per-function': 0,
        'linebreak-style': 0
    },
    settings: {
        react: {
            version: '17.0.1'
        }
    },
};
