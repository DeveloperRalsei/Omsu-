import { IconHomeFilled } from "@tabler/icons-react";
import { Image } from "@/components/ui/image";

export type Route = {
    label: string;
    href: string;
    icon: React.ReactNode;
};

export const routes: Route[] = [
    {
        label: "Home",
        href: "/",
        icon: <IconHomeFilled color="#fff" />,
    },
    {
        label: "Beatmaps",
        href: "/beatmapsets",
        icon: (
            <Image
                src="/img/game-mode/osu.png"
                height={20}
                width={20}
                alt="Beatmaps route image"
            />
        ),
    },
];
