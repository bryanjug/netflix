import {useState, useRef} from 'react'
import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'
import Counter from './Counter'

interface TextNode {
    text: string;
}

interface Props {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Nav: React.FC<Props> = ({handleChange}) => {
    // const[count, setCount] = useState<number | null>(5);
    const[count, setCount] = useState<TextNode>({text: 'hello'}); //passing in props
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <nav className={navStyles.nav}>
            <ul>
                <li>
                    <Link href='/'>Home</Link>
                </li>
                <li>
                    <Link href='/about'>About</Link>
                </li>
                <input onChange={handleChange} ref={inputRef}/>
                <Counter>
                    {({count, setCount}) => (
                        <div>
                            {count}
                            <button onClick={() => setCount(count + 1)}></button>
                        </div>
                    )}
                </Counter>
            </ul>
        </nav>
    )
}

export default Nav
