import { confirmRemoveHandler, newTodoEventHandler, onLoadEventHandler, removeTodoEventHandler, toggleTodoEventListener } from "./event-handlers";
import '../styles/venders.scss';
import '../styles/index.css';


export function renderApp() {
    onLoadEventHandler()
}

window.addEventListener('load', onLoadEventHandler)
document.addEventListener('change', function (event) {
    if (event.target.classList.contains('new-todo')) {
        newTodoEventHandler(event)
    }
})
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete')) {
        removeTodoEventHandler(event)
    }
    if (event.target.dataset.element === 'real-checkbox') {
        toggleTodoEventListener(event)
    }
    if(event.target.id === "modal-delete-button") {
        confirmRemoveHandler(event);
    }
})