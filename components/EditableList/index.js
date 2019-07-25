import { useState, useEffect } from 'react';
import { useAppState } from 'components/StateProvider';
import { init, add, remove } from './actions';

export default function EditableList(){

    const [ appState, setAppState ] = useAppState();
    const [ inputState, setInputState ] = useState("");
    const [ errorState, setErrorState ] = useState(null);
    
    const addItem = add();
    const removeItem = remove();

    useEffect(() => {
        init().then(setAppState)
    },[])

    const onAdd = async (e) => {
        e.preventDefault();
        try{
            await addItem(inputState);
            setInputState("");
            setErrorState(null);
        }catch(e){
            setErrorState(e.message);
        }
    }

    const onRemove = (item) => {
        return async() => {
            try{
                await removeItem(item)
                setInputState("");
                setErrorState(null);
            }catch(e){
                setErrorState(e.message);
            }
        }
    }

    const onChange = (e) => {
        setInputState(e.target.value);
    }

    return(
        <div>
             <form onSubmit={onAdd}>
                <textarea value={inputState} onChange={onChange} />
                <button type='submit'>Submit</button>
            </form>
            <ul>
            {appState.agenda.items.map((item,i) => {
                    return(
                        <div key={i}>
                            <li>{item.text}</li>
                            <button onClick={onRemove(item)}>Delete</button>
                        </div>
                    );
                }
            )}
            </ul>
        </div>
    )
}