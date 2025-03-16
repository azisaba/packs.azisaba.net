import { useState, useEffect } from "react"
import { PackCard } from "./PackCard"
import { PackCardProps } from '../types/PackCardProps';
import { fetchPacks } from "../util/PackUtil";
import { FadeLoader } from "react-spinners";

const PackList: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [packs, setPacks] = useState<PackCardProps[]>([]);

    useEffect(() => {
        fetchPacks().then(packs => {
            setPacks(Array.from(packs.values()))
            setIsLoading(false)
        }).catch(error => {
            console.error("Failed to fetch packs:", error);
            alert("リソースパックの情報を取得できませんでした。運営にお問い合わせください。")
        });
    }, []);

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-[400px] py-10">
            <FadeLoader speedMultiplier={2}/>
        </div>;
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
