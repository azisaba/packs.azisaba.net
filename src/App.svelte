<script>
  import { onMount } from 'svelte'

  export let ghReleaseApiUrl, ghRawBaseUrl, packVersions

  let packs = []

  onMount(async () => {
    const data = await (await fetch(ghReleaseApiUrl)).json()

    packs = await Promise.all(data.assets.map(async a => {
      const packName = a.name.split('.').slice(0, -1).join('.')

      const mcmeta = await (await fetch(ghRawBaseUrl + '/' + packName + '/pack.mcmeta')).json()
      const packDescription = mcmeta.pack.description
      const packSupported = packVersions[mcmeta.pack.pack_format]

      const pack = {
        'name': packName,
        'icon': 'https://images.weserv.nl/?url=' + ghRawBaseUrl + '/' + packName + '/pack.png' + '&w=64&output=webp&we',
        'description': packDescription,
        'supported': packSupported,
        'download': a.browser_download_url,
        'updated': a.updated_at
      }

      return pack
    }))

    console.log(packs)
  })
</script>

<style>
  .pack-card {
    display: flex;
    justify-content: center;
  }

  .pack {
    min-height: 10vh;
    min-width: 50%;
    margin: 8px 0;
    padding: 10px;
    display: flex;
    border: solid gray;
    border-width: 0 0 2px 2px;
  }

  .pack-icon {
    min-width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pack-info {
    padding: 4px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .pack-info > span {
    margin: 5px 0;
  }
  .pack-details {
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  .pack-details > span {
    margin: 0 10px;
  }
</style>

<h1>アジ鯖リソースパック</h1>

<p>リソースパック(テクスチャ)を今すぐダウンロードできます。</p>
<p>ダウンロードしたいリソースパックを選択してください。</p>

{#each packs as pack}
  <div class='pack-card'>
    <div class='pack'>
      <div class='pack-icon'>
        <img alt='{pack.name} のアイコン' src={pack.icon}>
      </div>

      <div class='pack-info'>
        <span class='pack-title'>{pack.name}</span>
        <span>{pack.description}</span>
      </div>

      <div class='pack-details'>
        <span>{pack.updated}</span>
        <span>{pack.supported}</span>
        <span><a href={pack.download}>ダウンロード</a></span>
      </div>
    </div>
  </div>
{/each}
