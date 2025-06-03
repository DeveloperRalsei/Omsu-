import { API } from "osu-api-v2-js";

const client_id = process.env.OSU_CLIENT_ID;
const client_secret = process.env.OSU_CLIENT_SECRET;

if (!client_id || !client_secret)
    throw new Error("OSU_CLIENT_ID or OSU_CLIENT_SECRET not defined");

export default await API.createAsync(parseInt(client_id), client_secret);
