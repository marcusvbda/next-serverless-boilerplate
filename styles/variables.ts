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
        dark: "#555B64",
        background: "#171923",
        backgroundDarkest: "#0F1117",
        primary: "#4fd1c5",
        primaryHover: "#81E6D9",
        secondary: "#1F2733",
        overflow: "#00000078"
    }
}