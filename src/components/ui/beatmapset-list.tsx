import {
    Center,
    Divider,
    Group,
    SimpleGrid,
    Skeleton,
    Text,
} from "@mantine/core";
import { BeatmapsetCard } from "./beatmap-card";
import { osu } from "@/lib";

export const BeatmapSetList = async ({
    filter,
}: {
    filter: Parameters<typeof osu.searchBeatmapsets>[0];
}) => {
    const { beatmapsets, total } = await osu.searchBeatmapsets(filter);

    return (
        <>
            <Group w="100%">
                <Text span c="dimmed">
                    {total} Total
                </Text>
                <Divider label="Beatmapsets" flex={1} />
            </Group>
            <SimpleGrid cols={{ sm: 1, md: 2, lg: 3 }}>
                {beatmapsets.map((b) => (
                    <BeatmapsetCard key={b.id} beatmapset={b} />
                ))}
            </SimpleGrid>
            {beatmapsets.length === 0 && (
                <Center>
                    <Text c="dimmed">Not Found TWT</Text>
                </Center>
            )}
        </>
    );
};

export const BeatmapSetListFallback = () => (
    <SimpleGrid cols={{ sm: 1, md: 2, lg: 3 }}>
        {Array(20).map((item) => (
            <Skeleton w="100%" h={80} key={item} />
        ))}
    </SimpleGrid>
);
