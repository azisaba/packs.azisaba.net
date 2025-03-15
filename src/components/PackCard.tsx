import { PackCardProps } from "../types/PackCardProps"
import CachedIcon from '@mui/icons-material/Cached'
import CheckIcon from '@mui/icons-material/Check'
import DownloadIcon from '@mui/icons-material/Download'
import "./PackCard.css"

export const PackCard: React.FC<{ props: PackCardProps }> = ({ props }) => {
    // return (<div className='card flex'>
    //     <div>
    //         <div className='pic flex'>
    //             <img src={props.icon} alt={`${props.name}のアイコン`} />
    //         </div>
    //         <div className='title flex'>
    //             <span><b>{props.name}</b></span>
    //             <span>{props.description}</span>
    //         </div>
    //     </div>
    //     <div>
    //         <div className='details flex'>
    //             <span>
    //                 <CachedIcon />
    //                 <span className='with-icon flex'>{props.last_updated}</span>
    //             </span>
    //             <span>
    //                 <CheckIcon />
    //                 <span className='with-icon flex'>{props.supported}</span>
    //             </span>
    //         </div>
    //         <div className='download flex'>
    //             <span>
    //                 <DownloadIcon />
    //                 <a href={props.download_url} className='with-icon flex'>ダウンロード</a>
    //             </span>
    //         </div>
    //     </div>
    // </div>)
    return (
        <div className="flex border-l-2 border-b-2 pb-5 pl-5">
            <div className="head flex">
                <img className="min-h-32" src="https://github.com/azisaba/resourcepacks/blob/main/despawn/pack.png?raw=true" />
                <div className="content-center pl-5 min-w-auto">
                    <div className="font-bold">Conflict</div>
                    <div>Azisaba Network: Conflict 1.01</div>
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
