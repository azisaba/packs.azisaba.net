import { getReleaseApiUrl } from "../api/GithubApi";
import { getCachedImageUrl } from "../api/WsrvnlApi";
import { Release } from "../types/github/GithubResponse";
import { PackMeta } from "../types/minecraft/PackMeta";
import { PackCardProps } from "../types/PackCardProps";
import { generalConfig } from "./Config";
import { timeAgo } from "./TimeUtil";

export async function fetchPacks(): Promise<PackCardProps[]>  {
    try {
        const data: Release = await (await fetch(getReleaseApiUrl())).json();
        const packraws: PackCardProps[] = data.assets.map(asset => {
            const name = asset.name.replace(/\.[^/.]+$/, '');
            return {
                name: name,
                icon: getCachedImageUrl(`${generalConfig.ghRawBaseUrl}/${name}/pack.png`),
                download_url: asset.browser_download_url,
                last_updated: timeAgo(new Date(asset.updated_at))
            };
        });

        const packsData = await Promise.all(
            packraws.map(async pack => {
                const mcmeta: PackMeta = await (await fetch(`${generalConfig.ghRawBaseUrl}/${pack.name}/pack.mcmeta`)).json();
                return {
                    ...pack,
                    description: mcmeta.pack.description,
                    supported: generalConfig.packVersions[mcmeta.pack.pack_format]
                };
            })
        );

        return packsData;
    } catch (error) {
        return Promise.reject(error);
    }
}