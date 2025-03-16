import { useState } from "react"
import "./PackList.css"
import { PackCard } from "./PackCard"
import { PackCardProps } from '../types/PackCardProps';
import { timeAgo } from "../util/TimeUtil"
import config from "../assets/config.json"
import { Release } from "../types/github/GithubResponse"
import { PackMeta } from "../types/minecraft/PackMeta";
import { GeneralConfig } from '../types/config/Config';

const generalConfig: GeneralConfig = (config as GeneralConfig)

function getReleaseApiUrl(suffix: string = ""): string {
    return config.ghReleaseApiUrl.replace("${suffix}", suffix)
}

function getCachedImageUrl(image_url: string): string {
    return `https://images.weserv.nl/?url=${image_url}&w=128&output=webp`
}

const PackList: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [packs, setPacks] = useState<PackCardProps[]>([])

    if(isLoading) {
        return <div>Now Loading....</div>
    }

    setTimeout(async () => {
        // const data = await (await fetch(config.ghReleaseApiUrl))
        const data: Release = await (await fetch(getReleaseApiUrl())).json()
        const packraws: PackCardProps[] = data.assets.map(asset => {
            const name = asset.name.replace(/\.[^/.]+$/, '')
            return {
                name: name,
                icon: getCachedImageUrl(`${config.ghRawBaseUrl}/${name}/pack.png`),
                download_url: asset.browser_download_url,
                last_updated: timeAgo(new Date(asset.updated_at))
            }
        })
        setPacks(await Promise.all(
            packraws.map(async pack => {
                const mcmeta: PackMeta = await (await fetch(`${config.ghRawBaseUrl}/${pack.name}/pack.mcmeta`)).json()
                return {
                    ...pack,
                    description: mcmeta.pack.description,
                    supported: generalConfig.packVersions[mcmeta.pack.pack_format]
                }
            })
        ))
        setIsLoading(false)
    }, 100)

    const exampleProp = {
        icon: "https://github.com/azisaba/resourcepacks/blob/main/despawn/pack.png?raw=true",
        name: "conflict",
        last_updated: timeAgo(new Date("2025-03-13T15:30:17Z")),
        download_url: "https://github.com/azisaba/resourcepacks/releases/download/action-v9229/conflict.zip",
        description: "none",
        supported: "1.10.2"
      } as PackCardProps

    return (
        <div className="outer">
            {packs.map((pack, i) => {
                <PackCard key={i} props={pack}/>
            })}
            <PackCard props={exampleProp}/>
        </div>
    )
}

export default PackList