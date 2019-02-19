import updateNotifier from 'update-notifier';

const pkg = require('../package.json');

/**
 * Update notifier.
 *
 * @export
 */
export default function notifier(): void {
	updateNotifier({
		pkg,
		updateCheckInterval: 1000 * 60 * 60 // 1 hour
	}).notify();
}
