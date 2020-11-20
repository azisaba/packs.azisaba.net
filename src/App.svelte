<script>
    import PageInfo from './PageInfo.svelte';
    import PackList from './PackList.svelte';
    export let config;
</script>

<PageInfo/>
<PackList config={config}/>
