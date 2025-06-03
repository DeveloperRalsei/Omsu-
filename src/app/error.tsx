"use client";

import { JsonRewiter } from "@/components/ui/json-rewireter";
import { Button, Stack, Text } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";
import { ErrorComponent } from "next/dist/client/components/error-boundary";

const Error: ErrorComponent = ({ error, reset }) => {
    return (
        <Stack align="center" justify="center">
            <Text c="dimmed">Something went wrong 😿</Text>
            <JsonRewiter json={error} space={4} />
            <Button
                leftSection={<IconReload />}
                onClick={() => window.location.reload()}
            >
                Reload
            </Button>
        </Stack>
    );
};

export default Error;
