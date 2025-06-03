export const JsonRewiter = ({
    json,
    space = 2,
}: {
    json: any;
    space?: number;
}) => {
    return <pre>{JSON.stringify(json, null, space)}</pre>;
};
