import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
        config: {
            ghReleaseApiUrl: 'https://api.github.com/repos/azisaba/resourcepacks/releases/latest',
            ghRawBaseUrl: 'https://raw.githubusercontent.com/azisaba/resourcepacks/main',
            packVersions: {
                '1': '1.6.1-1.8.9',
                '2': '1.9–1.10.2',
                '3': '1.11-1.12.2',
                '4': '1.13-1.14.4',
                '5': '1.15-1.16.1',
                '6': '1.16.2-1.16.4',
                '7': '1.17'
            }
        }
	}
});

export default app;