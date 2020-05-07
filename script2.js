/**
 * Segunda opção para obter as tarefas, mas dessa vez em objetos. Com ID(Date.now());
 */

const btnDarkMode = document.getElementById('btn-dark');
const btnLightMode = document.getElementById('btn-light');

btnDarkMode.addEventListener('click', function(e) {
    document.querySelector('section').classList.add('dark-mode');
});
btnLightMode.addEventListener('click', e =>{
    document.querySelector('section').classList.remove('dark-mode');
});
//-----------------------------------------------------//
let btnNewTask = document.getElementById('btn-new-task');
let inputNewTask = document.getElementById('input-new-task');
let list = document.getElementById('list-task');
let btnForm = document.getElementById('btn-form');
let btnSendMessage = document.getElementById('btn-send-message');

let data = [];

inputNewTask.addEventListener('keypress', e =>{
    if(e.key === 'Enter'){
        if(inputNewTask.value){
            btnNewTask.click();
        } else {
            alert('Type something...')
        }
        
    }
});
btnNewTask.addEventListener('click', e =>{
    let json = {
        task: inputNewTask.value,
        id:Date.now()
    };

    data.push(json);

    inputNewTask.value = '';
    
    updateTaskList();

});

function updateTaskList(){
    list.innerHTML = '';

    data.forEach(field =>{
        let div = document.createElement('div');

        div.className = 'task';

        div.innerHTML = `
            <input type="checkbox" id="task-${field.id}"><label for="task-${field.id}">${field.task}</label>
            <button id="btn-edit">Edit</button>
            <button id="btn-delete">Delete</button>
        `;

        div.querySelector('input').addEventListener('change', e =>{
            if(e.target.checked){
                div.querySelector('label').classList.add('complete');
            } else {
                div.querySelector('label').classList.remove('complete');
            }
        });

        div.querySelector('#btn-delete').addEventListener('click', e =>{
            if(confirm(`Do you really want to delete: ${field.task}?`)){
                data = data.filter(task => {return task.id !== field.id});

                updateTaskList();
            }
        });

        div.querySelector('#btn-edit').addEventListener('click', e =>{
            let newNameTask = prompt(`Edit task: ${field.task}`, field.task);

            if(newNameTask){
                field.task = newNameTask;

                updateTaskList();
            }
        });

        list.append(div);
        
    });
}
btnForm.addEventListener('click', e =>{
    document.getElementById('form').classList.toggle('open');
});

btnSendMessage.addEventListener('click', e =>{
    document.getElementById('form').classList.remove('open');
});

document.querySelector('section').addEventListener('click', e =>{
    document.getElementById('form').classList.remove('open');
});

let form = document.querySelector('form');

let json = {};

form.addEventListener('submit', e =>{

    e.preventDefault();

    [...form.elements].forEach(field =>{
        if(field.name){
            json[field.name] = field.value;
        }
    });
});

