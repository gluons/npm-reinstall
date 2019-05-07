type PackageInfo = {
	name: string;
	version: string;
};

/**
 * Extract package info (name & version) from `packageWithVersion`.
 *
 * @export
 * @param {string} packageWithVersion Package name with version
 * @returns {PackageInfo}
 */
export default function extractPackageInfo(
	packageWithVersion: string
): PackageInfo {
	const lastAtIndex = packageWithVersion.lastIndexOf('@');

	/*
	 * Skip when no package version or it's scoped package without version
	 */
	if (lastAtIndex === 0 || lastAtIndex === -1) {
		return {
			name: packageWithVersion,
			version: null
		};
	}

	const packageName = packageWithVersion.substring(0, lastAtIndex);
	const packageVersion = packageWithVersion.substring(lastAtIndex + 1);

	return {
		name: packageName,
		version: packageVersion
	};
}
