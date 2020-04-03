import { useState } from 'react'

interface ThemeOptions {
    light: boolean;
    dark: boolean;
    noPref: boolean;
}

interface InitialThemePreference {
    [key: string]: MediaQueryList;
}

function getCurrentTheme(): InitialThemePreference {
    const dark = window.matchMedia("(prefers-color-scheme: dark)")
    const light = window.matchMedia("(prefers-color-scheme: light)")
    const noPref = window.matchMedia("preferd-color-scheme: no-preference")
    return { dark, light, noPref }
}

const getState = (curTheme = getCurrentTheme()): ThemeOptions => ({
    light: curTheme.light.matches,
    dark: curTheme.dark.matches,
    noPref: curTheme.noPref.matches
})

export default function useThemePreference(): ThemeOptions {
    const curTheme: InitialThemePreference = getCurrentTheme()
    // configure initial state
    const initialState: ThemeOptions = getState()

    const [theme, setTheme]: [ThemeOptions, React.Dispatch<any>] = useState(initialState);

    // add event listeners
    curTheme.light.addEventListener('change', () => setTheme(getState()))
    curTheme.dark.addEventListener('change', () => setTheme(getState()))
    curTheme.noPref.addEventListener('change', () => setTheme(getState()))

    return theme;
}