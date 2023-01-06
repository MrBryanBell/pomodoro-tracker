// import { type RenderResult, render } from '@testing-library/svelte';

// import Widget from './Widget.svelte';

// let widget: RenderResult<Widget>;

// beforeEach(() => {
// 	const widgetProps = { name: 'Tiempo total' };
// 	widget = render(Widget, widgetProps);
// });

// it('should have "Tiempo total" as name', () => {
// 	const { container } = widget;
// 	const widgetName = container.querySelector('.widget-name');
// 	expect(widgetName).toHaveTextContent('Tiempo total');
// });

import { type RenderResult, render } from '@testing-library/svelte';

import Widget from './TestWidget.svelte';

let widget: RenderResult<Widget>;

beforeEach(() => {
	widget = render(Widget);
});

it('should display the widget name', () => {
	const widgetName = 'Tiempo total';

	const { getByText } = widget;
	expect(getByText(widgetName)).toBeInTheDocument();
});

it('should display the widget unit', () => {
	const unit = 'hr';
	// Remember to add the dot at the end of the unit
	const formattedUnit = `${unit}.`;

	const { getByText } = widget;
	expect(getByText(formattedUnit)).toBeInTheDocument();
});

it('should display the widget annotation', () => {
	const annotation = 'hoy';
	const formattedAnnotation = `*${annotation}`;

	const { getByText } = widget;
	expect(getByText(formattedAnnotation)).toBeInTheDocument();
});

it('should display the metric goal if it has', () => {});
