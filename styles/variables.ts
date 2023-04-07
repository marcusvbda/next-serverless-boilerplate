interface IBreakpoints {
    [index: string]: number
}

export const breakpoints: IBreakpoints = {
    small: 900,
    medium: 1000,
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
        light: "rgb(232 232 232 / 80%)",
        background: "#f9f9f9",
        primary: "#3aa59b",
        primaryHover: "#4cc6bb"
    }
}