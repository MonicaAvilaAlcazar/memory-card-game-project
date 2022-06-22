import { Fragment } from 'react'
import './App.css'
import Board from './components/Board'

function App() {
    return (
        <Fragment>
            <header className='p-4'>
                <h1 className='block text-center text-5xl'>Memory Card App</h1>
            </header>
            <Board />
        </Fragment>
    )
}

export default App
