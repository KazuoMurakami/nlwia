

import Form from './components/Form';


     export default function App() {
    return (
    <>
    <div className='flex flex-col items-center box'>
        <img src="/logo.svg" alt="Logo do Short" className='w-28' />
        <h1 className='text-purple-600/95 text-4xl font-bold tracking-wider'>Short Summary</h1>
        <Form/>
    </div>
    </>
    )
    }
