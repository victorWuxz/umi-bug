import {useState} from 'react';


// 命名遵循自定义hooks命名规则，use开头
export default function useCounterModel() {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(() => count + 1);
    };

    const decrement = () => {
        setCount(() => count - 1);
    };

    return {
        count,
        increment,
        decrement,
    };
}
