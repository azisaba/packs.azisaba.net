<script>
    import Icon from 'svelte-awesome';
    import { refresh, check, download } from 'svelte-awesome/icons';
    export let pack;
</script>

<div class='card'>
    <div>
        <div class='pic'>
            <img src={pack.icon} alt='{pack.name} のアイコン'>
        </div>
        <div class='title'>
            <span><b>{pack.name}</b></span>
            <span>{pack.description}</span>
        </div>
    </div>
    <div>
        <div class='details'>
            <span>
                <Icon data={refresh}/>
                <span class='with-icon'>{pack.last_updated}</span>
            </span>
            <span>
                <Icon data={check}/>
                <span class='with-icon'>{pack.supported}</span>
            </span>
        </div>
        <div class='download'>
            <span>
                <Icon data={download}/>
                <a href={pack.download_url} class='with-icon'>ダウンロード</a>
            </span>
        </div>
    </div>
</div>
