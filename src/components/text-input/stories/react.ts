import React from 'react';
import { createComponent } from '@lit/react';
import DaikinTextInput from '../daikin-text-input';

export const ReactDaikinTextInput = createComponent({
    tagName: 'daikin-text-input',
    elementClass: DaikinTextInput,
    react: React,
    events: {
        change: 'change',
        input: 'input',
        keydown: 'keydown',
    },
});
