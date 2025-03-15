import { PackCardProps } from "../types/PackCardProps"

export const PackCard: React.FC<PackCardProps> = (props) => {
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
                    <Icon data={refresh}/>
                    <span className='with-icon'>{props.last_updated}</span>
                </span>
                <span>
                    <Icon data={check}/>
                    <span className='with-icon'>{props.supported}</span>
                </span>
            </div>
            <div className='download'>
                <span>
                    <Icon data={download}/>
                    <a href={props.download_url} className='with-icon'>ダウンロード</a>
                </span>
            </div>
        </div>
    </div>)
}
