"use client";

import { Categories } from "@/types";
import {
    ActionIcon,
    Fieldset,
    Group,
    Select,
    SimpleGrid,
    Stack,
    TextInput,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSend, IconX } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Beatmap } from "osu-api-v2-js";
import { useEffect, useState } from "react";

type FilterType = {
    defaultSearchString: string;
    categories: Categories;
    gameMode: Beatmap["mode"] | undefined;
};

export const Filter = ({
    initialValues: { gameMode, categories },
}: {
    initialValues: FilterType;
}) => {
    const [filters, setFilters] = useState<FilterType>();

    return (
        <Stack>
            <Fieldset legend="Filter">
                <SimpleGrid cols={{ sm: 2, md: 4 }}>
                    <CategorySelect defaultValue={categories || undefined} />
                    <ModeSelect defaultValue={gameMode || undefined} />
                </SimpleGrid>
            </Fieldset>
        </Stack>
    );
};

export const Search = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace, refresh } = useRouter();

    const [input, setInput] = useState(searchParams.get("q") || "");
    const [debounced] = useDebouncedValue(input, 500); // 500ms gecikmeli versiyon

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (debounced) params.set("q", debounced);
        else params.delete("q");

        replace(`${pathname}?${params.toString()}`);
        refresh();
    }, [debounced]);

    return (
        <Group wrap="nowrap">
            <TextInput
                flex={1}
                name="q"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rightSection={
                    <ActionIcon
                        type="reset"
                        variant="subtle"
                        color="gray"
                        size="md"
                        onClick={() => setInput("")}
                    >
                        <IconX />
                    </ActionIcon>
                }
                placeholder="Search Beatmapsets..."
            />
            <ActionIcon>
                <IconSend />
            </ActionIcon>
        </Group>
    );
};

const ModeSelect = ({ defaultValue }: { defaultValue: string | undefined }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
        <Select
            unselectable="on"
            clearable
            label="Game Mode"
            onChange={(e) => {
                const params = new URLSearchParams(searchParams);
                if (e) params.set("mode", e);
                else params.delete("mode");
                router.replace(`${pathname}?${params.toString()}`);
                router.refresh();
            }}
            defaultValue={defaultValue}
            data={[
                {
                    value: "osu",
                    label: "Standart",
                },
                {
                    value: "taiko",
                    label: "Taiko",
                },
                {
                    value: "fruits",
                    label: "Catch",
                },
                {
                    value: "mania",
                    label: "Mania",
                },
            ]}
            name="mode"
        />
    );
};

const CategorySelect = ({
    defaultValue,
}: {
    defaultValue: string | undefined;
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const data = [
        "Any",
        "Ranked",
        "Qualified",
        "Loved",
        "Favourites",
        "Pending",
        "WIP",
        "Graveyard",
    ];
    return (
        <Select
            data={data}
            label="Categories"
            name="categories"
            onChange={(e) => {
                const params = new URLSearchParams(searchParams);
                if (e) params.set("mode", e);
                else params.delete("mode");
                router.replace(`${pathname}?${params.toString()}`);
                router.refresh();
            }}
            clearable
            defaultValue={defaultValue}
        />
    );
};
