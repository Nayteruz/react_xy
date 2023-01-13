import React, {FC, useEffect} from 'react';
import {XMarkIcon} from "@heroicons/react/20/solid";
import {HeartIcon} from "@heroicons/react/24/outline";

type ObjectInterface = {
    [key: number]: number
}
interface SquareProps {
    keyItem: number;
    valueItem: ObjectInterface;
    handleClick: (k: number) => void;
    last: number | null;
    winKeys: number[]
}

const ItemSq:FC<SquareProps> = ({keyItem, valueItem, handleClick, last,winKeys}) => {

    const kValue: number = valueItem[keyItem];

    return (
        <div
            onClick={() => handleClick(keyItem)}
            className={`flex w-[15vh] h-[15vh] bg-indigo-600 items-center justify-center text-3xl font-bold ${last === keyItem || winKeys.includes(keyItem) ? 'bg-[#5156eb]' : ''}` } >
            {kValue === 1 && <XMarkIcon className={`h-20 w-20 text-white ${winKeys.includes(keyItem) ? 'text-[#50d71e]' : ''}`}/>}
            {kValue === 2 && <HeartIcon className={`h-20 w-20 text-white ${winKeys.includes(keyItem) ? 'text-[#50d71e]' : ''}`} />}
        </div>
    );
};

export default ItemSq;