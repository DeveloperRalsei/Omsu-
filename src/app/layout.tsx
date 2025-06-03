import {
    ColorSchemeScript,
    mantineHtmlProps,
    MantineProvider,
} from "@mantine/core";
import { theme, routes } from "@/config";
import { LayoutProvider } from "@/components/layout";
import { NavigationProgress } from "@mantine/nprogress";

import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";
import "@/styles/global.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript forceColorScheme="dark" />
            </head>
            <body cz-shortcut-listen="true">
                <MantineProvider forceColorScheme="dark" theme={theme}>
                    <LayoutProvider routes={routes}>
                        <NavigationProgress />
                        {children}
                    </LayoutProvider>
                </MantineProvider>
            </body>
        </html>
    );
}
