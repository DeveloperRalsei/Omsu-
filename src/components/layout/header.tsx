import { AppShellHeader, Burger, Button, Group, Title } from "@mantine/core";
import { name } from "@/../package.json";
import Link from "next/link";
import { Image } from "../ui/image";

export const Header = ({
    navbarOpened,
    navbarToggleFunc,
}: {
    navbarOpened: boolean;
    navbarToggleFunc: () => void;
}) => {
    return (
        <AppShellHeader>
            <Group
                h="100%"
                w="100%"
                align="center"
                justify="space-between"
                px="sm"
            >
                <Group>
                    <Burger
                        hiddenFrom="sm"
                        opened={navbarOpened}
                        onClick={navbarToggleFunc}
                    />
                    <Button
                        component={Link}
                        variant="subtle"
                        size="compact-xl"
                        leftSection={
                            <Image
                                alt="Omsu Logo"
                                src="/img/logo.png"
                                width={30}
                                height={30}
                            />
                        }
                        href="/"
                    >
                        <Title order={2} fw="bold">
                            {name.toUpperCase()}
                        </Title>
                    </Button>
                </Group>
            </Group>
        </AppShellHeader>
    );
};
