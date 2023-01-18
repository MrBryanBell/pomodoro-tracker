import { DateTime } from 'luxon';

import { isFromToday } from '$lib/utils/is-from-today';

const today = DateTime.now();

it('should return false', () => {
	const dateToCompare = DateTime.fromObject({ year: 2023, month: 1, day: 16, hour: 0 });

	expect(isFromToday({ today, dateToCompare })).toBe(false);
});

it('should return true', () => {
	const dateToCompare = DateTime.fromObject({ year: 2023, month: 1, day: 17, hour: 0 });

	expect(isFromToday({ today, dateToCompare })).toBe(true);
});
