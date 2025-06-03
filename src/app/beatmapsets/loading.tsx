"use client";
import { nprogress } from "@mantine/nprogress";
import { useEffect } from "react";

export default function Loading() {
    useEffect(() => {
        nprogress.start();
        return () => {
            nprogress.complete();
        };
    }, []);

    return null;
}
