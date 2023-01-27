import { create } from 'domain';
import { useState, useEffect } from 'react';
import { ReactElement } from 'react';
import { Information } from '../Interfaces/Information';

type Node = {
    children: Node[] | number[]
}

const branchingFactor: number = 2;
const depth: number = 2;
let htmlTree: any = [];
let values: number[] = [];

const GameVisualizer = () => {
    const [gameTree, setGameTree] = useState<any>();

    const createTreeData = (d: number): Node | number => {
        let currentDepth = d;
        let nodes: Node[] = [];

        if(currentDepth != 0) {
            d--;
            let c: any = [];
            for(let i=0; i<branchingFactor; i++) {
                c.push(createTreeData(d));
            }
            let node: Node = {
                children: c
            }
            return node;
        }
    
        else {
            return Math.floor(Math.random() * (100 - 1 + 1) + 1);
        }
    }

    const createTree = (node: any, d: number) => {

        if(node.children) {
            htmlTree.push('level-' + d);
            d++;
        
            for(let i = 0; i < node.children.length; i++) {
                createTree(node.children[i], d);
            }
        }

        else {
            htmlTree.push('level-' + d);
            values.push(node)
        }
    }

    useEffect(() => {
        let tree = createTreeData(depth);
        createTree(tree, 0);
        setGameTree(<div className="game-tree">
        {htmlTree.slice(0,7).map((value: any, index: any) => (
            <div className={value} key={index}><div className='circle'></div></div>
        ))}
        </div>);
        console.log("Ende")
      }, []);

    return(
        <div className='field'>
            <div>
            <div className='header'>
                <div className='headlines'>        
                    <h1>Algorithm Visualizer</h1>
                    <h2>Games with enemy Algorithms</h2>
                </div>
                <div className='menu'>
                <button className='button-start'>Start</button>
                <button className='button-reset'>Reset</button>
                <button className='button-exit'>Terminate</button>
                </div>
            </div>
            </div>

            <div className='main-content'>

            {gameTree}
                <div className='algorithm-information'>
                <h2 className='algorithm-name'>
                </h2>
                <div className='algorithm-description'>
                </div>
                <div className='stats'>
                    <div className='row'><div className='cell description'>Worst-case runtime</div><div className='cell'></div></div>
                    <div className='row'><div className='cell description'>Worst-case space-complexety</div><div className='cell'></div></div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default GameVisualizer;
