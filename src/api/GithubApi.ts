import { generalConfig } from "../util/Config";

export function getReleaseApiUrl(suffix: string = ""): string {
    return generalConfig.ghReleaseApiUrl.replace("${suffix}", suffix);
}