import { Stack } from "@mantine/core";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    return <Stack p="md">{children}</Stack>;
}
