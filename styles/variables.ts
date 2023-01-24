interface IBreakpoints {
    [index: string]: number
}

export const breakpoints: IBreakpoints = {
    small: 600,
    medium: 950,
    large: 1900,
}

interface ISize {
    [index: string]: string
}

export const size: ISize = {
    small: `only screen and (max-width: ${breakpoints.small}px)`,
    medium: `only screen and (min-width: ${breakpoints.medium}px)`,
    large: `only screen and (min-width: ${breakpoints.large}px)`,
}

interface IColor {
    [index: string]: {
        [index: string]: string
    }
}

export const color: IColor = {
    dark: {
        light: "rgb(255,255,255,.80)",
        background: "#171923",
        primary: "#81E6D9",
        secondary: "#1F2733"
    }
}