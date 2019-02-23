export type InstallMode = 'GLOBAL' | 'SAVE' | 'SAVE_DEV';

type Mode = {
	GLOBAL: InstallMode;
	SAVE: InstallMode;
	SAVE_DEV: InstallMode;
};

const MODE = Object.freeze<Mode>({
	GLOBAL: 'GLOBAL',
	SAVE: 'SAVE',
	SAVE_DEV: 'SAVE_DEV'
});

export default MODE;
