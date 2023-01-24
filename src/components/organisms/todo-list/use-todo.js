/*
 * Item: { task: string, completed: boolean, id: string }
 * Data: Item[] 
 */

const uuid = () => crypto.randomUUID();

export const useTodo = () => {
    const addItem = (data, value) => {
        const item = {
            task: value,
            completed: false,
            id: uuid(),
        };

        return [item, ...data];
    };

    const updateItem = (data, item) => {
        return data.map(current => current.id === item.id ? item : current);
    };

    const deleteItem = (data, id) => {
        return data.filter(
            current => current.id !== id
        );
    };

    return {
        addItem,
        updateItem,
        deleteItem,
    }
}