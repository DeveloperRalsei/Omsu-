"use client";

import { GameMode } from "@/types";
import {
    Card,
    Image,
    Text,
    Stack,
    Flex,
    Box,
    Indicator,
    Group,
    Badge,
    ThemeIcon,
    Tooltip,
} from "@mantine/core";
import { IconExclamationMark, IconHeart, IconVideo } from "@tabler/icons-react";
import { Beatmapset } from "osu-api-v2-js";

const CategoryColors = {
    Loved: "pink",
    Graveyard: "gray",
    Pending: "yellow",
    Qualified: "cyan",
    Ranked: "green",
    WIP: "orange",
};

function calculateMostGameModes(
    beatmaps: Beatmapset.Extended.WithBeatmapPacktags["beatmaps"],
) {
    const modes: Record<GameMode, number> = {
        fruits: 0,
        mania: 0,
        osu: 0,
        taiko: 0,
    };

    for (const b of beatmaps) {
        modes[b.mode]++;
    }

    return Object.entries(modes).sort(
        ([, a], [, b]) => b - a,
    )[0][0] as GameMode;
}

export const BeatmapsetCard = ({
    beatmapset,
}: {
    beatmapset: Beatmapset.Extended.WithBeatmapPacktags;
}) => {
    const gameMode = calculateMostGameModes(beatmapset.beatmaps);

    return (
        <Card shadow="sm" padding="md" radius="md" withBorder pos="relative">
            <Card.Section>
                <Image
                    src={beatmapset.covers.card}
                    height={140}
                    alt={beatmapset.title_unicode ?? beatmapset.title}
                />
            </Card.Section>

            <Stack gap="xs" mt="sm">
                <Group justify="space-between">
                    <Text
                        fw={700}
                        size="lg"
                        component="a"
                        href={`https://osu.ppy.sh/beatmapsets/${beatmapset.id}`}
                        target="_blank"
                    >
                        {beatmapset.title}
                    </Text>
                    <Text fw="bold">{beatmapset.bpm} BPM</Text>
                </Group>
                <Text size="sm" c="dimmed">
                    by {beatmapset.artist}
                </Text>
                <Text size="sm">
                    Mapped by <b>{beatmapset.creator}</b>
                </Text>
            </Stack>

            <Flex gap={3} align="center" pos="absolute" bottom={10} right={10}>
                {beatmapset.favourite_count}
                <IconHeart color="var(--mantine-color-red-5)" size={16} />
            </Flex>

            <ThemeIcon
                pos="absolute"
                top={5}
                right={5}
                color="rgba(0,0,0,.3)"
                p={3}
                style={{ borderRadius: 999 }}
            >
                {getGameIcon(gameMode)}
            </ThemeIcon>

            <Stack pos="absolute" top={5} left={5} gap={3}>
                {beatmapset.nsfw && badges.nsfw}
                {beatmapset.storyboard && badges.storyboard}
            </Stack>
        </Card>
    );
};

const modeName: Record<GameMode, string> = {
    fruits: "Catch",
    osu: "Osu",
    taiko: "Taiko",
    mania: "Mania",
};
function getGameIcon(mode: GameMode) {
    return (
        <Tooltip label={modeName[mode]} withArrow>
            <Image
                src={`/img/game-mode/${mode}.png`}
                alt={"gameMode" + mode}
                w={22}
            />
        </Tooltip>
    );
}

const badges = {
    nsfw: (
        <Badge>
            <IconExclamationMark size={13} /> NSFW
        </Badge>
    ),
    storyboard: (
        <Badge>
            <IconVideo size={13} /> Storyboard / Video
        </Badge>
    ),
};
