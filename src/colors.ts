import {
    colorBrandPrimary, 
    // 💣 Missing in tokens - fix later
    colorBlue40 as colorBrandSecondary,
    colorGrey70 as colorBrandMediumgrey,
    colorGrey90 as colorBrandDarkgrey,
    colorGreen60 as colorFeedbackPositive,
    colorYellow50 as colorFeedbackWarning,
    colorRed60 as colorFeedbackNegative,
    colorBlue10,
    colorBlue20,
    colorBlue30,
    colorBlue50,
    colorBlue70,
    colorBlue80,
    colorBlue90,
    colorBlue100,
    colorGrey10,
    colorGrey20,
    colorGrey30,
    colorGrey40,
    colorGrey50,
    colorGrey60,
    colorGrey80,
    colorGrey100,
    colorRed10,
    colorRed20,
    colorRed30,
    colorRed40,
    colorRed50,
    colorRed70,
    colorRed80,
    colorRed90,
    colorRed100,
    colorRed110,
    colorYellow10,
    colorYellow20,
    colorYellow30,
    colorYellow40,
    colorYellow70,
    colorYellow60,
    colorYellow80,
    colorYellow90,
    colorYellow100,
    colorYellow110,
    colorGreen10,
    colorGreen20,
    colorGreen30,
    colorGreen40,
    colorGreen50,
    colorGreen70,
    colorGreen80,
    colorGreen90,
    colorGreen100,
    colorGreen110
} from '@daikin-oss/dds-tokens/js/daikin/Light/variables.js';

const DAIKIN_PRIMARY_BLUE = colorBrandPrimary;
const DAIKIN_SECONDARY_BLUE = colorBrandSecondary;

const DAIKIN_DARK_GREY = colorBrandDarkgrey;
const DAIKIN_MEDIUM_GREY = colorBrandMediumgrey;

const DAIKIN_NEGATIVE = colorFeedbackNegative;
const DAIKIN_WARNING = colorFeedbackWarning;
const DAIKIN_POSITIVE = colorFeedbackPositive;

export const colors = {
    daikinBlue: {
        50: colorBlue10,
        100: colorBlue20,
        200: colorBlue30,
        300: DAIKIN_SECONDARY_BLUE,
        400: colorBlue50,
        500: DAIKIN_PRIMARY_BLUE,
        600: colorBlue70,
        700: colorBlue80,
        800: colorBlue90,
        900: colorBlue100,
        DEFAULT: DAIKIN_PRIMARY_BLUE
    },
    daikinNeutral: {
        50: colorGrey10,
        100: colorGrey20,
        200: colorGrey30,
        300: colorGrey40,
        400: colorGrey50,
        500: colorGrey60,
        600: DAIKIN_MEDIUM_GREY,
        700: colorGrey80,
        800: DAIKIN_DARK_GREY,
        900: colorGrey100
    },
    daikinRed: {
        50: colorRed10,
        100: colorRed20,
        200: colorRed30,
        300: colorRed40,
        400: colorRed50,
        500: DAIKIN_NEGATIVE,
        600: colorRed70,
        700: colorRed80,
        800: colorRed90,
        900: colorRed100,
        1000: colorRed110,
        DEFAULT: DAIKIN_NEGATIVE
    },
    daikinYellow: {
        50: colorYellow10,
        100: colorYellow20,
        200: colorYellow30,
        300: colorYellow40,
        400: DAIKIN_WARNING,
        500: colorYellow60,
        600: colorYellow70,
        700: colorYellow80,
        800: colorYellow90,
        900: colorYellow100,
        1000: colorYellow110,
        DEFAULT: DAIKIN_WARNING
    },
    daikinGreen: {
        50: colorGreen10,
        100: colorGreen20,
        200: colorGreen30,
        300: colorGreen40,
        400: colorGreen50,
        500: DAIKIN_POSITIVE,
        600: colorGreen70,
        700: colorGreen80,
        800: colorGreen90,
        900: colorGreen100,
        1000: colorGreen110,
        DEFAULT: DAIKIN_POSITIVE
    }
};
