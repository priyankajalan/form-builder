import { useAppState } from 'components/StateProvider';

export const add = () => {
  const [ state, setState ] = useAppState();
  return async (text) => {
    const items = state.agenda.items.slice();
    items.push({ text });
    const data = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const roll = Math.random();
          if (roll < 0.5) {
            resolve({
              ...state,
              agenda: {
                items
              }
            });
          } else {
            reject(new Error("Failed to add item"));
          }
        }, 1000);
      });
      return setState(data);
    }
};

export const remove = () => {
    const [ state, setState ] = useAppState();
    return async (text) => {
        const data = await new Promise((resolve,reject) => {
            setTimeout(() => {
                const roll = Math.random();
                if(roll<0.5){
                    const items = state.agenda.items.filter(item => item != text);
                    resolve({
                        ...state,
                        agenda:{
                            items
                        }
                    })
                }else{
                    reject(new Error('Cannot delete item'))
                }
            }, 1000)
        })
        return setState(data);
    }
}

export const init = async () => {
    const data = await new Promise(resolve => {
        setTimeout(() => {
            resolve({
                agenda: {
                    items: [{ text: 'Apple' },{ text: 'Orange' }]
                }
            })
        }, 1000)
    })
    return data;
}
