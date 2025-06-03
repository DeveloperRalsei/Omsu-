import HomeDoc from "@/doc/index.mdx";
import { Stack, TypographyStylesProvider } from "@mantine/core";

export default function Page() {
    return (
        <Stack>
            <TypographyStylesProvider>
                <HomeDoc />
            </TypographyStylesProvider>
        </Stack>
    );
}
