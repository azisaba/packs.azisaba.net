<script>
    import Icon from 'svelte-awesome';
    import { refresh, check, download } from 'svelte-awesome/icons';
    export let pack;
</script>

<style>
    span {
        margin: 3px 0;
    }

    div {
        display: flex;
    }

    .with-icon {
        margin-left: 3px;
    }

    .card {
        padding: 20px;
        min-height: 140px;
        justify-content: space-between;
        flex-wrap: wrap;
        border: solid gray;
        border-width: 0 0 2px 2px;
    }

    .pic {
        min-width: 210px;
        justify-content: center;
        align-items: center;
    }

    .title {
        flex-direction: column;
        justify-content: center;
    }

    .details {
        flex-direction: column;
        justify-content: flex-end;
        text-align: right;
    }

    .download {
        min-width: 170px;
        justify-content: center;
        align-items: center;
    }
</style>

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
