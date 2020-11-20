<script>
    import { onMount } from 'svelte';
    import moment from 'moment';
    import 'moment/locale/ja';
    import PackCard from './PackCard.svelte';
    export let config;

    let packs = [];

    onMount(async () => {
        const data = await (await fetch(config.ghReleaseApiUrl)).json();

        packs = data.assets.map(asset => {
            const name = asset.name.replace(/\.[^/.]+$/, '');

            return {
                name: name,
                icon: `https://images.weserv.nl/?url=${config.ghRawBaseUrl}/${name}/pack.png&w=128&output=webp`,
                download_url: asset.browser_download_url,
                last_updated: moment(asset.updated_at).fromNow()
            };
        });

        packs = await Promise.all(packs.map(async pack => {
            const mcmeta = await (await fetch(`${config.ghRawBaseUrl}/${pack.name}/pack.mcmeta`)).json();

            return {
                ...pack,
                description: mcmeta.pack.description,
                supported: config.packVersions[mcmeta.pack.pack_format]
            };
        }));
    });
</script>

<style>
    div {
        max-width: 1000px;
        margin: 0 auto;
    }

    div > .outer {
        padding: 20px;
    }
</style>

<div>
    {#each packs as pack}
        <div class='outer'>
            <PackCard pack={pack}/>
        </div>
    {/each}
</div>
