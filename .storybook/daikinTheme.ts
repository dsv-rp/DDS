import { create } from '@storybook/theming';

export default create({
    base: 'light',

    colorPrimary: 'hsla(200, 100%, 44%, 1)',
    colorSecondary: '#54C3F1',

    // UI
    appBg: 'hsla(0, 0%, 97%, 1)',
    appContentBg: 'hsla(0, 0%, 97%, 1)',
    appBorderColor: 'hsla(0, 0%, 30%, 1)',
    appBorderRadius: 4,

    // Typography
    fontBase: '"Roboto", sans-serif',
    fontCode: 'monospace',

    // Text colors
    textColor: 'hsla(0, 0%, 13%, 1)',
    textInverseColor: 'rgba(255,255,255,0.9)',

    // Toolbar default and active colors
    barTextColor: 'hsla(194, 90%, 96%, 1)',
    barSelectedColor: 'hsla(210, 52%, 25%, 1)',
    barBg: 'hsla(200, 100%, 44%, 1)',

    // Form colors
    inputBg: 'white',
    inputBorder: 'hsla(0, 0%, 13%, 1)',
    inputTextColor: 'hsla(0, 0%, 13%, 1)',
    inputBorderRadius: 4,

    brandTitle: 'Dango UI'
    //brandUrl: 'https://example.com',
    //brandImage: '../src/assets/logo.png'
});
