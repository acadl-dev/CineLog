import {
    MD3DarkTheme,
    MD3LightTheme
} from 'react-native-paper';

const light = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#132862',
        secondary: '#b9bebe',
        tertiary: '#eef3f3',
    },
};

const dark = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#132862',
        secondary: '#471daa',
        tertiary: '#606064',
    },
};

export default {
    dark,
    light
}