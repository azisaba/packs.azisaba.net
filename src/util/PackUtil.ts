import { getRawBaseUrl, getReleaseApiUrl } from "../api/GithubApi";
import { getCachedImageUrl } from "../api/WsrvnlApi";
import { Release } from "../types/github/GithubResponse";
import { PackMeta } from '../types/minecraft/PackMeta';
import { PackCardProps } from "../types/PackCardProps";
import { generalConfig } from "./Config";
import { timeAgo } from "./TimeUtil";

export async function fetchPacks(): Promise<Map<string, PackCardProps>> {
    let data: Release
    try {
        data = await (await fetch(getReleaseApiUrl())).json();
    } catch (error) {
        return Promise.reject("Failed to fetch github release api: " + error)
    }
    
    const packs: PackCardProps[] = await Promise.all(data.assets.map(async asset => {
        const name = asset.name.replace(/\.[^/.]+$/, '');
        const target_url = `${getRawBaseUrl()}/${name}`

        const data: PackCardProps = {
            name: name,
            icon: getCachedImageUrl(`${target_url}/pack.png`),
            download_url: asset.browser_download_url,
            last_updated: timeAgo(new Date(asset.updated_at))
        }

        // get additional info from pack.mcmeta
        try {
            // get mcmeta info
            const metadata: PackMeta = await (await fetch(`${target_url}/pack.mcmeta`)).json()

            // put additional info
            data.description = metadata.pack.description
            data.supported = generalConfig.packVersions[metadata.pack.pack_format]
        } catch(error) {
            console.warn("Failed to get mcmeta data", error)
        }

        return data;
    }));

    const packMap = new Map<string, PackCardProps>()

    packs.forEach(p => packMap.set(p.name,p))

    for(const i in generalConfig.additionalPacks) {
        const addonPack = generalConfig.additionalPacks[i]

        let releaseData: Release
        try {
            const releaseApiUrl = getReleaseApiUrl("-" + addonPack)
            releaseData = await (await fetch(releaseApiUrl)).json()
        } catch(error) {
            return Promise.reject(`Failed to fetch github release api for ${addonPack}: ${error}`)
        }

        const asset = releaseData.assets[0]
        const target_url = getRawBaseUrl("-" + addonPack)

        const data: PackCardProps = {
            name: addonPack,
            icon: getCachedImageUrl(`${target_url}/pack.png`),
            download_url: asset.browser_download_url,
            last_updated: timeAgo(new Date(asset.updated_at))
        }

        try {
            const metadata: PackMeta = await (await fetch(`${target_url}/pack.mcmeta`)).json()

            data.description = metadata.pack.description
            data.supported = generalConfig.packVersions[metadata.pack.pack_format]
        } catch(error) {
            console.warn("Failed to get mcmeta data", error)
        }

        packMap.set(data.name, data)
    }

    return packMap
}
