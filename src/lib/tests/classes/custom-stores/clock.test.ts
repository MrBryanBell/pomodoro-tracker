import { Clock } from '$classes/custom-stores/clock-store';

describe('Clock', () => {
	let clock: Clock;

	beforeEach(() => {
		clock = new Clock();
	});

	it('should be an instance of clock', () => {
		expect(clock).toBeInstanceOf(Clock);
	});
});
