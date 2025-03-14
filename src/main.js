import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		config: {
			ghReleaseApiUrl: 'https://api.github.com/repos/azisaba/resourcepacks/releases/latest',
			ghRawBaseUrl: 'https://raw.githubusercontent.com/azisaba/resourcepacks/main',
			packVersions: {
				'1': '1.6.1-1.8.9',
				'2': '1.9-1.10.2',
				'3': '1.11-1.12.2',
				'4': '1.13-1.14.4',
				'5': '1.15-1.16.1',
				'6': '1.16.2-1.16.4',
				'7': '1.17-.1.17.1',
				'8': '1.18-1.18.2',
				'9': '1.19-1.19.2',
				'12': '1.19.3',
				'13': '1.19.4',
				'15': '1.20-1.20.1',
				'18': '1.20.2',
				'22': '1.20.3-1.20.4',
				'32': '1.20.5-1.20.6',
				'34': '1.21-1.21.1',
				'42': '1.21.2-1.21.3',
				'46': '1.21.4'
			}
		}
	}
});

export default app;