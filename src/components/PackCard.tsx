import { PackCardProps } from "../types/PackCardProps"
import CachedIcon from '@mui/icons-material/Cached'
import CheckIcon from '@mui/icons-material/Check'
import DownloadIcon from '@mui/icons-material/Download'
import "./PackCard.css"

export const PackCard: React.FC<{props: PackCardProps}> = ({props}) => {
    return (<div className='card'>
        <div>
            <div className='pic'>
                <img src={props.icon} alt={`${props.name}のアイコン`} />
            </div>
            <div className='title'>
                <span><b>{props.name}</b></span>
                <span>{props.description}</span>
            </div>
        </div>
        <div>
            <div className='details'>
                <span>
                    <CachedIcon />
                    <span className='with-icon'>{props.last_updated}</span>
                </span>
                <span>
                    <CheckIcon />
                    <span className='with-icon'>{props.supported}</span>
                </span>
            </div>
            <div className='download'>
                <span>
                    <DownloadIcon />
                    <a href={props.download_url} className='with-icon'>ダウンロード</a>
                </span>
            </div>
        </div>
    </div>)
}
