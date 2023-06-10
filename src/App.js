import './App.css';
import {useState} from "react";

function App() {

    const [inputValue, setInputValue] = useState('');
    const [todoList, setTodoList] = useState([
        {
            name: 'Тестовое задание',
            completed: false,
            id: 1
        },
        {
            name: 'Прекрасный код',
            completed: true,
            id: 2
        },
        {
            name: 'Покрытие тестами',
            completed: false,
            id: 3
        }
    ]);
    const [inputAll, setInputAll] = useState(true);
    const [inputActive, setInputActive] = useState(false);
    const [inputCompleted, setInputCompleted] = useState(false);

    const changeCheckBox = (i, value) => {
        const listMap = todoList.map((item) => {
            return item.id === i ? {...item, completed: !!value} : item
        })
        setTodoList(listMap)
    }

    const addNewTodo = (text) => {
        if (text) {
            const newTodo = {name: text, completed: false, id: todoList.length + 1};
            setTodoList([...todoList, newTodo]);
        }
    }

    const todoListMaped = todoList.map((item) => {
        return (
            <div className={'todos__content'} key={item.id}>
                <input type='checkbox' checked={!!item.completed}
                       onChange={(event) => changeCheckBox(item.id, !!event.target.checked)}
                       className={'todos__checkbox'}/>
                {item.completed === false ? (<p className='todos__subtitle'>{item.name}</p>) : (
                    <p className='todos__subtitle done'>{item.name}</p>)}
            </div>
        )
    })

    const todoListActive = todoList.filter((item) =>{
        return item.completed === false;
    })

    const todoListActiveMaped = todoListActive.map((item) =>{
        return(
            <div className={'todos__content'} key={item.id}>
                <input type='checkbox' checked={!!item.completed}
                       onChange={(event) => changeCheckBox(item.id, !!event.target.checked)}
                       className={'todos__checkbox'}/>
                {item.completed === false ? (<p className='todos__subtitle'>{item.name}</p>) : (
                    <p className='todos__subtitle done'>{item.name}</p>)}
            </div>
        )
    })

    const todoListCompleted = todoList.filter((item) =>{
        return item.completed === true;
    })

    const todoListListCompletedMaped = todoListCompleted.map((item) =>{
        return(
            <div className={'todos__content'} key={item.id}>
                <input type='checkbox' checked={!!item.completed}
                       onChange={(event) => changeCheckBox(item.id, !!event.target.checked)}
                       className={'todos__checkbox'}/>
                {item.completed === false ? (<p className='todos__subtitle'>{item.name}</p>) : (
                    <p className='todos__subtitle done'>{item.name}</p>)}
            </div>
        )
    })

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            addNewTodo(inputValue);
            setInputValue('');
        }
    }

    const chooseActiveBtn = (e) => {
        setInputActive(true)
        setInputAll(false)
        setInputCompleted(false)
    }

    const chooseAllBtn = (e) => {
        setInputAll(true)
        setInputActive(false)
        setInputCompleted(false)
    }

    const chooseCompeletedBtn = (e) => {
        setInputCompleted(true)
        setInputAll(false)
        setInputActive(false)
    }

    return (
        <div className="App">
            <p className={'todos__title'}>todos</p>
            <div className="todos__container">
                <input type={'text'} className={'todos__input'} value={inputValue}
                       onChange={(event) => setInputValue(event.target.value)} placeholder={'what needs to be done?'}
                       onKeyDown={handleKeyDown}/>
            </div>
            <div className={'todos__map'}>
                {inputAll ? todoListMaped : inputActive ? todoListActiveMaped : todoListListCompletedMaped }
            </div>
            <div className={'todos__control'}>
                <p className={'label__paragraph'}>{todoListActiveMaped.length} items left</p>
                <label className={'label__container'}>all<input type="radio" id={'todos__radio-all'} checked={inputAll} onChange={(event) => chooseAllBtn()} name={'radio'}  /></label>
                <label className={'label__container'}>active<input type="radio" id={'todos__radio-active'} checked={inputActive} onChange={event => chooseActiveBtn()} name={'radio'} /></label>
                <label className={'label__container'}>completed<input type="radio" id={'todos__radio-completed'} checked={inputCompleted} onChange={(e)=>chooseCompeletedBtn()}  name={'radio'} /></label>
            </div>
        </div>
    );
}

export default App;
