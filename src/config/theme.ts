"use client";

import { createTheme } from "@mantine/core";

export const theme = createTheme({
    primaryColor: "pink",
    components: {
        Button: {
            defaultProps: {
                variant: "light",
            },
        },
        ActionIcon: {
            defaultProps: {
                variant: "light",
                size: "lg",
            },
        },
        Badge: {
            defaultProps: {
                size: "xs",
            },
        },
    },
});
