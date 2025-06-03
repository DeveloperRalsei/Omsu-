import type { Beatmap } from "osu-api-v2-js";
export type Categories =
    | "Any"
    | "Ranked"
    | "Qualified"
    | "Loved"
    | "Favourites"
    | "Pending"
    | "WIP"
    | "Graveyard"
    | "My Maps"
    | undefined;

export type GameMode = Beatmap["mode"];
