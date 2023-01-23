import styles from '../styles/notification.module.css';
//#region for jss
        //// import jss from 'jss';
        //// import preset from 'jss-preset-default';
        //// jss.setup(preset());
        //// const jssStyles = {
        ////     realCheckbox: {
        ////         width: "30px",
        ////         height: "30px",
        ////         cursor: "pointer",
        ////         opacity: 0,
        ////         position: "absolute",
        ////         top: "-3px",
        ////         left: "-5px"
        ////     }
        //// };
        //// const { classes } = jss.createStyleSheet(jssStyles).attach();


        // use this line below in renderTodos
        // <input class="${classes.realCheckbox}" data-element="real-checkbox" type="checkbox" ${completionClass} />
//#endregion

import { css } from '@emotion/css';

const realCheckboxClass = css`
    width: 30px;
    height: 30px;
    cursor: pointer;
    opacity: 0;
    position: absolute;
    top: -3px;
    left: -5px;
`


export function renderTodos(todos) {
    const renderedItemArray = todos.map(function (todo) {
        const className = todo.completed ? 'completed' : ''
        const completionClass = todo.completed ? 'checked' : ''
        return `
            <li data-id="${todo.id}" class="${className}">
                <span class="custom-checkbox">
                    <img class="check" src="./images/checkmark.svg" width="22" height="22"></img> 
                    <input class="${realCheckboxClass}" data-element="real-checkbox" type="checkbox" ${completionClass} />
                </span>
                <label>${todo.text}</label>
                <span class="delete"></span>
            </li>
        `
    })
    document.querySelector('.todo-list').innerHTML = renderedItemArray.join('')
}

export function clearNewTodoInput() {
    document.querySelector('.new-todo').value = ''
    showNotification()
}

export function getTodoId(element) {
    return parseInt(
        element.dataset.id
        || element.parentNode.dataset.id
        || element.parentNode.parentNode.dataset.id
        , 10)
}

const showNotification = () => {
    const notify = document.createElement('div');
    notify.classList.add('alert', 'alert-success', styles.notification)
    notify.setAttribute('role', 'alert');
    notify.innerHTML = 'Todo item added';
    document.body.appendChild(notify);
    setTimeout(() => {
        const notEle = document.querySelector(`.${styles.notification}`);
        notEle.parentNode.removeChild(notEle);
    }, 1000);
}