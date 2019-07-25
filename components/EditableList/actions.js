export const add = async (text, state) => {
  const items = state.agenda.items.slice();
  console.log('Add me',items);
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
  return data;
};

export const remove = async (text,state) => {
    const data = await new Promise((resolve,reject) => {
        setTimeout(() => {
            const roll = Math.random();
            if(roll<0.5){
                const items = state.agenda.items.filter(i => {
                    return i != text;
                });
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
    return data;
}
