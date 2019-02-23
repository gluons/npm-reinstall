export type InstallMode = 'GLOBAL' | 'SAVE' | 'SAVE_DEV';

const MODE: Readonly<Record<string, InstallMode>> = {
	GLOBAL: 'GLOBAL',
	SAVE: 'SAVE',
	SAVE_DEV: 'SAVE_DEV'
};

Object.freeze(MODE);

export default MODE;
