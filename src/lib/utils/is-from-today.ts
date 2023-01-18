import type { DateTime } from 'luxon';

type isTodayProps = {
	today: DateTime;
	dateToCompare: DateTime;
};

export function isFromToday({ today, dateToCompare }: isTodayProps) {
	const { year, month, day } = dateToCompare;

	return year === today.year && month === today.month && day === today.day;
}
