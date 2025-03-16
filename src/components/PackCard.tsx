import { PackCardProps } from "../types/PackCardProps"
import CachedIcon from '@mui/icons-material/Cached'
import CheckIcon from '@mui/icons-material/Check'
import DownloadIcon from '@mui/icons-material/Download'

export const PackCard: React.FC<{ props: PackCardProps }> = ({ props }) => {
    return (
        <div className="flex border-l-2 border-b-2 p-5 my-4 justify-between">
            <div className="head flex">
                <img className="min-h-32" src={props.icon} />
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
                    <a href={props.download_url}>ダウンロード</a>
                </div>
            </div>
        </div>
    )
}
