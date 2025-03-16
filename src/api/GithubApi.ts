import { generalConfig } from "../util/Config";

export function getReleaseApiUrl(suffix: string = ""): string {
    return generalConfig.ghReleaseApiUrl.replace("${suffix}", suffix);
}

export function getRawBaseUrl(suffix: string = ""): string {
    return generalConfig.ghRawBaseUrl.replace("${suffix}", suffix)
}
