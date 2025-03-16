import { PackCardProps } from "../types/PackCardProps"
import CachedIcon from '@mui/icons-material/Cached'
import CheckIcon from '@mui/icons-material/Check'
import DownloadIcon from '@mui/icons-material/Download'

export const PackCard: React.FC<{ props: PackCardProps }> = ({ props }) => {
    return (
        <div className="flex border-l-2 border-b-2 p-5 my-4 justify-between">
            <div className="head flex min-h-32 items-center">
                <img src={props.icon} alt={`${props.name}のアイコン`}/>
                <div className="content-center pl-5 min-w-auto">
                    <div className="font-bold">{props.name}</div>
                    <div>{props.description}</div>
                </div>
            </div>
            <div className="tail flex">
                <div className="detail content-end text-right">
                    <div>
                        <CachedIcon />
                        <span className="px-0.5">{props.last_updated}</span>
                    </div>
                    <div>
                        <CheckIcon />
                        <span className="px-0.5">{props.supported}</span>
                    </div>
                </div>
                <div className="download pl-5 content-center">
                    <DownloadIcon />
                    <a href={props.download_url} className="text-blue-500 hover:underline underline-offset-4 visited:text-blue-800">ダウンロード</a>
                </div>
            </div>
        </div>
    )
}
