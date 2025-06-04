import { BeatmapsetCard } from "@/components/ui/beatmap-card";
import {
    BeatmapSetList,
    BeatmapSetListFallback,
} from "@/components/ui/beatmapset-list";
import { Filter, Search } from "@/components/ui/search-filter";
import { osu } from "@/lib";
import { Categories } from "@/types";
import {
    Center,
    Divider,
    Group,
    Select,
    SimpleGrid,
    Text,
} from "@mantine/core";
import { Beatmap, Ruleset } from "osu-api-v2-js";
import { Suspense } from "react";

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

export default async function BeatmapSetsPage(props: {
    searchParams: searchParams;
}) {
    const searchParams = await props.searchParams;

    const q = searchParams?.q || "";
    const categories = searchParams.categories;
    const mode = searchParams.mode;
    const sortBy = searchParams.sortBy;

    return (
        <>
            <Search />
            <Filter
                initialValues={{
                    categories,
                    defaultSearchString: q,
                    gameMode: mode,
                }}
            />
            <Suspense key={q + sortBy} fallback={<BeatmapSetListFallback />}>
                <BeatmapSetList
                    filter={{
                        keywords: q,
                        categories,
                        mode: Ruleset[mode],
                        sort: { by: sortBy, in: "desc" },
                    }}
                />
            </Suspense>
        </>
    );
}
