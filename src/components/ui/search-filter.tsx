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
import { IconSend, IconX } from "@tabler/icons-react";
import { Beatmap } from "osu-api-v2-js";

export const SearchFilter = ({
    initialValues: { defaultSearchString, gameMode, categories, sortBy },
}: {
    initialValues: {
        defaultSearchString: string;
        categories: Categories;
        gameMode: Beatmap["mode"] | undefined;
        sortBy:
            | "title"
            | "artist"
            | "difficulty"
            | "ranked"
            | "rating"
            | "plays"
            | "favourites"
            | "updated";
    };
}) => {
    return (
        <form method="GET">
            <Stack>
                <Group wrap="nowrap">
                    <TextInput
                        flex={1}
                        name="q"
                        defaultValue={defaultSearchString}
                        rightSection={
                            <ActionIcon
                                type="reset"
                                variant="subtle"
                                color="gray"
                                size="md"
                            >
                                <IconX />
                            </ActionIcon>
                        }
                        placeholder="Search Beatmapsets..."
                    />
                    <ActionIcon type="submit">
                        <IconSend />
                    </ActionIcon>
                </Group>
                <Fieldset legend="Filter">
                    <SimpleGrid cols={{ sm: 2, md: 4 }}>
                        <CategorySelect
                            defaultValue={categories || undefined}
                        />
                        <ModeSelect defaultValue={gameMode || undefined} />
                    </SimpleGrid>
                </Fieldset>
            </Stack>
        </form>
    );
};

const ModeSelect = ({ defaultValue }: { defaultValue: string | undefined }) => {
    return (
        <Select
            unselectable="on"
            clearable
            label="Game Mode"
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
            clearable
            defaultValue={defaultValue}
        />
    );
};
