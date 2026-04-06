import {
    MD3DarkTheme,
    MD3LightTheme
} from 'react-native-paper';

const light = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#132862',
        secondary: '#34b3ba',
        tertiary: '#eef3f3',
    },
};

const dark = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#132862',
        secondary: '#471daa',
        tertiary: '#060881',
    },
};

export default {
    dark,
    light
}