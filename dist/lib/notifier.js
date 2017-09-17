"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_notifier_1 = require("update-notifier");
const pkg = require('../package.json');
/**
 * Update notifier.
 *
 * @export
 */
function notifier() {
    update_notifier_1.default({
        pkg,
        updateCheckInterval: 1000 * 60 * 60 // 1 hour
    });
}
exports.default = notifier;
