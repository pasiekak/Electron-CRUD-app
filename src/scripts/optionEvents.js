import { showFormInsert } from "./showForm/showFormInsert.js";

async function optionEvents () {
    const selectOption = document.querySelector('#optionPick');
    selectOption.addEventListener('change', () => {
        switch (selectOption.selectedIndex) {
            case 1 : showFormInsert(); break;
            case 2 : break;
            case 3 : break;
            default : break;
        }
    })
}
export {optionEvents};