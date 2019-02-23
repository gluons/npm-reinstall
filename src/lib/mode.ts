export type InstallMode = 'GLOBAL' | 'SAVE' | 'SAVE_DEV';

const MODE = Object.freeze<Record<string, InstallMode>>({
	GLOBAL: 'GLOBAL',
	SAVE: 'SAVE',
	SAVE_DEV: 'SAVE_DEV'
});

export default MODE;
