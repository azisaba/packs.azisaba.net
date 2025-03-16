import { useState, useEffect } from "react"
import "./PackList.css"
import { PackCard } from "./PackCard"
import { PackCardProps } from '../types/PackCardProps';
import { timeAgo } from "../util/TimeUtil"
import config from "../assets/config.json"
import { Release } from "../types/github/GithubResponse"
import { PackMeta } from "../types/minecraft/PackMeta";
import { GeneralConfig } from '../types/config/Config';

const generalConfig: GeneralConfig = config as GeneralConfig;

function getReleaseApiUrl(suffix: string = ""): string {
    return config.ghReleaseApiUrl.replace("${suffix}", suffix);
}

function getCachedImageUrl(image_url: string): string {
    return `https://images.weserv.nl/?url=${image_url}&w=128&output=webp`;
}

const PackList: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [packs, setPacks] = useState<PackCardProps[]>([]);

    useEffect(() => {
        async function fetchPacks() {
            try {
                const data: Release = await (await fetch(getReleaseApiUrl())).json();
                const packraws: PackCardProps[] = data.assets.map(asset => {
                    const name = asset.name.replace(/\.[^/.]+$/, '');
                    return {
                        name: name,
                        icon: getCachedImageUrl(`${config.ghRawBaseUrl}/${name}/pack.png`),
                        download_url: asset.browser_download_url,
                        last_updated: timeAgo(new Date(asset.updated_at))
                    };
                });

                const packsData = await Promise.all(
                    packraws.map(async pack => {
                        const mcmeta: PackMeta = await (await fetch(`${config.ghRawBaseUrl}/${pack.name}/pack.mcmeta`)).json();
                        return {
                            ...pack,
                            description: mcmeta.pack.description,
                            supported: generalConfig.packVersions[mcmeta.pack.pack_format]
                        };
                    })
                );

                setPacks(packsData);
            } catch (error) {
                console.error("Failed to fetch packs:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPacks();
    }, []);

    if (isLoading) {
        return <div>Now Loading....</div>;
    }

    const exampleProp: PackCardProps = {
        icon: "https://github.com/azisaba/resourcepacks/blob/main/despawn/pack.png?raw=true",
        name: "conflict",
        last_updated: timeAgo(new Date("2025-03-13T15:30:17Z")),
        download_url: "https://github.com/azisaba/resourcepacks/releases/download/action-v9229/conflict.zip",
        description: "none",
        supported: "1.10.2"
    };

    return (
        <div className="outer">
            {packs.map((pack, i) => (
                <PackCard key={i} props={pack} />
            ))}
            <PackCard props={exampleProp} />
        </div>
    );
}

export default PackList;
