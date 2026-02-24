let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() { 
	const saveTasks = localStorage.getItem('tasks');
	if (saveTasks) {
		return JSON.parse(saveTasks);
	} else {
		return items;
	}
}

function createItem(item) { 
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
	const textElement = clone.querySelector(".to-do__item-text");
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;

	deleteButton.addEventListener("click", () => {
		clone.remove();
		const items = getTasksFromDOM();
		saveTasks(items);
	});

	duplicateButton.addEventListener('click', () => {
		const itemName = textElement.textContent;
		const newItem = createItem(item);
		listElement.prepend(newItem);

		const items = getTasksFromDOM();

		saveTasks(items);
	});

	return clone;
}

items = loadTasks();

items.forEach(function(item) {
	const marking = createItem(item);
	listElement.append(marking);
});

formElement.addEventListener('submit', function(evt) { 
	evt.preventDefault();
	const InputText = inputElement.value;
	const markingSubmit = createItem(InputText);
	listElement.prepend(markingSubmit);

	items = getTasksFromDOM();
	saveTasks(items);

	inputElement.value = '';
});

function getTasksFromDOM() { 
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
	const tasks = [];

	itemsNamesElements.forEach(function(element) {
		tasks.push(element.textContent);
	});
	
	return tasks;
}

function saveTasks(tasks) { 
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

