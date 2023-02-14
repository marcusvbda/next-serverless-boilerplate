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
        dark: "#555B64",
        background: "#171923",
        backgroundDarkest: "#0F1117",
        primary: "#3aa59b",
        primaryHover: "#4cc6bb",
        secondary: "#1F2733",
        overflow: "#0000009c",
        borderColor: "rgba(255,255,255,0.1)",
        hoverBorderColor: "rgba(255,255,255,0.3)",
        done: "#3aa59b",
        waiting: "#a9a92a",
        inProgress: "#934ba1",
        error: "#a5315b"
    }
}