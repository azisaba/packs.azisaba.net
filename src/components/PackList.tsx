import { useState, useEffect } from "react"
import { PackCard } from "./PackCard"
import { PackCardProps } from '../types/PackCardProps';
import { timeAgo } from "../util/TimeUtil"
import { Release } from "../types/github/GithubResponse"
import { PackMeta } from "../types/minecraft/PackMeta";
import { generalConfig } from "../util/Config";
import { getReleaseApiUrl } from "../api/GithubApi";
import { getCachedImageUrl } from "../api/WsrvnlApi";

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

    return (
        <div className="outer max-w-[1000px] mx-auto p-5">
            {packs.map((pack, i) => (
                <PackCard key={i} props={pack} />
            ))}
        </div>
    );
}

export default PackList;
