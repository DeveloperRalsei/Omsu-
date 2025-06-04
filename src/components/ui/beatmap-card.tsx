"use client";

import { GameMode } from "@/types";
import {
    Card,
    Image,
    Text,
    Stack,
    Flex,
    Group,
    Badge,
    ThemeIcon,
    Tooltip,
    Box,
    ActionIcon,
    Loader,
    useMantineTheme,
} from "@mantine/core";
import {
    IconExclamationMark,
    IconHeart,
    IconPlayerPause,
    IconPlayerPlay,
    IconVideo,
    IconX,
} from "@tabler/icons-react";
import { Beatmapset } from "osu-api-v2-js";
import { useMusic } from "../hooks/music";

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
            <Card.Section pos="relative">
                <Image
                    src={beatmapset.covers.card}
                    height={140}
                    alt={beatmapset.title_unicode || beatmapset.title}
                />
                <Group pos="absolute" bottom={0} bg="rgba(0,0,0,.5)" w="100%">
                    <PreviewPlayer preview_url={beatmapset.preview_url} />
                </Group>
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

const PreviewPlayer = ({
    preview_url,
}: {
    preview_url: Beatmapset["preview_url"];
}) => {
    const { loading, play, pause, playing, error, progress, init } = useMusic(
        preview_url,
        true,
    );
    const { primaryColor } = useMantineTheme();

    return (
        <Group gap={4} wrap="nowrap" w="100%">
            <ActionIcon
                disabled={!!error}
                variant="transparent"
                size="sm"
                onClick={() => {
                    if (!playing) init();
                    playing ? pause() : play();
                }}
            >
                {loading ? (
                    <Loader size={16} />
                ) : error ? (
                    <IconX size={16} />
                ) : playing ? (
                    <IconPlayerPause size={16} />
                ) : (
                    <IconPlayerPlay size={16} />
                )}
            </ActionIcon>

            <Box pos="relative" w="100%">
                <Box w="100%" bg="dark" h={2} pos="absolute" top={0} />
                <Box
                    w={`${progress * 100}%`}
                    bg={primaryColor}
                    h={4}
                    pos="absolute"
                    top={0}
                />
            </Box>
        </Group>
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
