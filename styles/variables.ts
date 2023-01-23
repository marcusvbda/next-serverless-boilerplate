interface objectOfNumbers {
    [index: string]: number
}

interface objectOfStrings {
    [index: string]: string
}

export const breakpoints: objectOfNumbers = {
    small: 600,
    medium: 950,
    large: 1900,
}

export const size: objectOfStrings = {
    small: `only screen and (max-width: ${breakpoints.small}px)`,
    medium: `only screen and (min-width: ${breakpoints.medium}px)`,
    large: `only screen and (min-width: ${breakpoints.large}px)`,
}

export const color: objectOfStrings = {
    light: "rgb(255,255,255,80)",
    background: "#171923",
    primary: "#81E6D9",
    secondary: "#1F2733"
}