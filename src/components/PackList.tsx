import { useState } from "react"
import "./PackList.css"
import { PackCard } from "./PackCard"
import { PackCardProps } from "../types/PackCardProps"
import { timeAgo } from "../util/TimeUtil"
import config from "../assets/config.json"
import { Release } from "../types/github/GithubResponse"

function getReleaseApiUrl(suffix: string = ""): string {
    return config.ghReleaseApiUrl.replace("${suffix}", suffix)
}

const PackList: React.FC = () => {
    // const [isLoading, setIsLoading] = useState(true)
    // useEffect(() => {})
    // setTimeout(() => {
    //     setIsLoading(false)
    // }, 1000)

    // if(isLoading) {
    //     return <div>Now Loading....</div>
    // }

    setTimeout(async () => {
        // const data = await (await fetch(config.ghReleaseApiUrl))
        const data: Release = await (await fetch(getReleaseApiUrl())).json()
        data.assets.map(asset => {
            const name = asset.name.replace(/\.[^/.]+$/, '')
        })
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
            <PackCard props={exampleProp}/>
        </div>
    )
}

export default PackList