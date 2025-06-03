"use client";

import { createContext, PropsWithChildren, useContext } from "react";
import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
import { Header } from "./header";
import { Navbar } from "./navbar";
import { Route } from "@/config";

export type LayoutsContextType = {};

export const LayoutsContext = createContext<LayoutsContextType | null>(null);

export const LayoutProvider = ({
    children,
    routes,
}: PropsWithChildren<{ routes: Route[] }>) => {
    const [opened, { toggle }] = useDisclosure();
    return (
        <LayoutsContext value={{}}>
            <AppShell
                header={{
                    height: 70,
                }}
                navbar={{
                    breakpoint: "sm",
                    width: 300,
                    collapsed: { desktop: false, mobile: !opened },
                }}
            >
                <Header navbarOpened={opened} navbarToggleFunc={toggle} />
                <Navbar routes={routes} />
                <AppShell.Main>{children}</AppShell.Main>
            </AppShell>
        </LayoutsContext>
    );
};

export const useLayout = () => {
    const ctx = useContext(LayoutsContext);
    if (!ctx) throw new Error('Use "LayoutsProvider"');
    return ctx;
};
