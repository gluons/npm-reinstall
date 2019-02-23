import updateNotifier from 'update-notifier';

const pkg = require('../../package.json');

const notificationInterval = 1000 * 60 * 60; // 1 hour

/**
 * Update notifier.
 *
 * @export
 */
export default function notifier(): void {
	updateNotifier({
		pkg,
		updateCheckInterval: notificationInterval
	}).notify();
}
