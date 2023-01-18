import type { Options as NotificationOptions } from '@tauri-apps/api/notification';

// In case you want to add more presets:
// 1. Add a new string to the presetNames array
// 2. Add a new object to the presets array

const presetNames = [
	'work-session-started',
	'work-session-finished',
	'error:please-select-a-task'
] as const;
export type PresetName = (typeof presetNames)[number];

type NotificationPreset = NotificationOptions & {
	name: PresetName;
};

const presets: NotificationPreset[] = [
	{
		name: 'work-session-started',
		title: 'Sesión de trabajo iniciada',
		body: 'Aprovecha el momento'
	},
	{
		name: 'work-session-finished',
		title: 'Sesión de trabajo finalizada',
		body: '¡Bien hecho!'
	},
	{
		name: 'error:please-select-a-task',
		title: 'ERROR',
		body: 'Por favor selecciona una tarea para iniciar una sesión de trabajo'
	}
];

type NotificationSettings = {
	preset: PresetName;
};

export class Notification {
	// TODO: Implement Request Permission method
	// More info: https://tauri.app/v1/api/js/notification
	// static async requestPermission() {}

	static async send({ preset }: NotificationSettings) {
		const { sendNotification } = await import('@tauri-apps/api/notification');

		const { title, body } = this.findPresetByName(preset);
		sendNotification({ title, body });
	}

	static findPresetByName(presetName: PresetName) {
		const preset = presets.find((preset) => preset.name === presetName);
		if (!preset) {
			throw new Error('Preset name is required');
		}

		return preset;
	}
}
