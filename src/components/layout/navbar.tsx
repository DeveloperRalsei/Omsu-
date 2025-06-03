import { AppShellNavbar, AppShellSection, NavLink, Stack } from "@mantine/core";
import { Route } from "@/config";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = ({ routes }: { routes: Route[] }) => {
    const pathname = usePathname();
    return (
        <AppShellNavbar>
            <AppShellSection component={Stack} flex={1} gap={0}>
                {routes.map((r) => (
                    <NavLink
                        key={r.label}
                        component={Link}
                        leftSection={r.icon}
                        active={r.href === pathname}
                        {...r}
                    />
                ))}
            </AppShellSection>
        </AppShellNavbar>
    );
};
