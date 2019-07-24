import React, { useEffect } from 'react';
import { useStateValue } from 'components/StateProvider';

function Example(){

    const [state, setState] = useStateValue();

    function increment(){
        setState({
            counter: state.counter + 1
        })
    }

    useEffect(() => {
        const intervalID = window.setInterval(increment,1000);
        return(() => clearInterval(intervalID))
    })

    return(
        <div>
            <p>You clicked {state.counter}</p>
            <button onClick={increment}>Increment</button>
        </div>
    )
}

export default Example;
