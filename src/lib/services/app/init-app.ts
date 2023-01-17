import { categoriesStore } from '$store/categories';
import { tasksStore } from '$store/tasks';
import { workSessionsStore } from '$store/work-sessions';

export async function initApp() {
	const promises = [tasksStore.init(), categoriesStore.init(), workSessionsStore.init()];
	await Promise.all(promises);
}
