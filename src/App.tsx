import {FC, useEffect, useState} from "react";
import ItemSq from './components/ItemSq';

type ObjectInterface = {
    [key: number]: number
}

const App: FC = () => {

    const winA: number[][] = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    const statuses: string[] = ['Начать игру', 'Победили крестики', 'Победили нолики', 'Ничья', 'Идет игра'];

    const [items, setItems] = useState<ObjectInterface>({});
    const [type, setType] = useState<number>(1);
    const [lastClick, setLastClick] = useState<number | null>(null);
    const [isWin, setIsWin] = useState<number[]>([]);
    const [gameStatus, setGameStatus] = useState<string>('Начать игру')

    useEffect(() => {
        checkWin();
        changeGameStatus();
    }, [items])

    useEffect(() => {
        changeGameStatus();
    }, [isWin])


    const handleClickSq = (k: number) => {
        if (items[k] || isWin.length === 3) return;
        const tp = type === 1 ? 2 : 1;
        setItems(prev => {
            return {...prev, [k]: tp}
        })
        setType(tp)
        setLastClick(k);
    }

    const checkWin = (): void => {
        for (let i: number = 0; i < 8; i++) {
            let p = winA[i];
            let pk: number[] = [];
            for (let j: number = 0; j < p.length; j++) {
                let ii: number = winA[i][j];
                if (items[ii]) {
                    pk.push(items[ii]);
                }
            }
            if (pk.length === 3 && [...new Set(pk)].length === 1) {
                setIsWin(p);
                setLastClick(null);
                break;
            }
        }
    }
    const restart = () => {
        setItems({});
        setType(1);
        setLastClick(null);
        setIsWin([]);
        setGameStatus('Начать игру');
    }

    const changeGameStatus = (): void => {
        const checked: number = Object.keys(items).length;
        const winLength: number = isWin.length;

        if (winLength === 3){
            if (type === 1){
                setGameStatus(statuses[1]);
            } else {
                setGameStatus(statuses[2]);
            }
        } else {
            if (checked === 0) {
                setGameStatus(statuses[0]);
            } else if (checked === 9) {
                setGameStatus(statuses[3]);
            } else {
                setGameStatus(statuses[4]);
            }
        }
    }

    const classes = "mb-4 text-center text-2xl";

    return (
        <div className="bg-blue-200 px-8 py-10 rounded-2xl text-slate-600">
            <h2 className={classes}>{gameStatus}</h2>
            <div className="list-items">
                {[...Array(9).keys()].map(item =>
                    <ItemSq
                        key={item}
                        keyItem={item}
                        valueItem={items}
                        handleClick={handleClickSq}
                        winKeys={isWin}
                        last={lastClick}
                    />
                )}
            </div>
            <button
                onClick={restart}
                className="mt-4 w-full py-4 bg-emerald-700 rounded-lg text-white text-lg font-bold hover:bg-emerald-600"
            >
                Начать сначала
            </button>
        </div>
    )
}

export default App;
