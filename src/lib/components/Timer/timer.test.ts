import { type RenderResult, render } from '@testing-library/svelte';

// import Button from './Button.svelte';
import Timer from './Timer.svelte';

describe('Timer', () => {
	let timer: RenderResult<Timer>;

	beforeEach(() => {
		timer = render(Timer);
	});

	it('should display text "iniciar"', () => {
		const text = 'iniciar';
		const { getByText } = timer;
		expect(getByText(text)).toBeInTheDocument();

		const nodeName = getByText(text).nodeName;
		expect(nodeName).toBe('BUTTON');
	});

	/* 
		List if possible tests:
		- should display text "pausar"
		- should display text "reiniciar"
		- should display text "24:00" after 1 minute of starting
		- should display text "00:00" when timer ends
		- should display text "25:00" when timer is reset
		- should display the predicted end-time (now + timeLeft)
	*/

	// component should be playing in order to display "pausar" text
	// it('should display text "pausar"', () => {
	// 	const text = 'pausar';
	// 	const { getByText, container } = timer;
	// 	container.innerHTML//?
	// 	expect(getByText(text)).toBeInTheDocument();

	// 	const nodeName = getByText(text).nodeName;
	// 	expect(nodeName).toBe('BUTTON');
	// });
});
