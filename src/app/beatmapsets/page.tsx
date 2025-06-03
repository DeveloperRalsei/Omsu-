import { BeatmapsetCard } from "@/components/ui/beatmap-card";
import { SearchFilter } from "@/components/ui/search-filter";
import { osu } from "@/lib";
import { Categories } from "@/types";
import { Divider, Group, Select, SimpleGrid } from "@mantine/core";
import { notFound } from "next/navigation";
import { Beatmap, Ruleset } from "osu-api-v2-js";

type searchParams = Promise<{
    q: string;
    categories: Categories | undefined;
    mode: Beatmap["mode"];
    sortBy:
        | "title"
        | "artist"
        | "difficulty"
        | "ranked"
        | "rating"
        | "plays"
        | "favourites"
        | "updated";
}>;

export default async function BeatmapSetsPage({
    searchParams,
}: {
    searchParams: searchParams;
}) {
    const { q, categories, mode, sortBy } = await searchParams;
    const { total, beatmapsets } = await osu.searchBeatmapsets({
        keywords: q,
        categories,
        mode: Ruleset[mode],
        sort: { by: sortBy, in: "desc" },
    });

    if (total === 0) return notFound();

    return (
        <>
            <SearchFilter
                initialValues={{
                    categories,
                    defaultSearchString: q,
                    gameMode: mode,
                    sortBy,
                }}
            />
            <Group w="100%">
                <Divider label="Beatmapsets" flex={1} />
                <Select data={["meow"]} />
            </Group>
            <SimpleGrid cols={{ sm: 1, md: 2, lg: 3 }}>
                {beatmapsets.map((b) => (
                    <BeatmapsetCard key={b.id} beatmapset={b} />
                ))}
            </SimpleGrid>
        </>
    );
}
