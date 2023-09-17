import { Search } from 'lucide-react';
import { useRef } from 'react'; // Importe o useRef do React
import axiosInstances from "./server.jsx"


export default function Form() {
    const formRef = useRef(null); // Crie uma referência para o formulário
    const InputRef = useRef(null);
    const content = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evite que o formulário seja enviado
        content.current.classList.add("placeholder")
        const videoURL = InputRef.current.value // current é usado para pegar o valor do input invés de somente value
        if(!videoURL.includes("shorts")) {
          return  content.current.textContent = "Esse video não parece ser um Shorts, selecione outro video"
        }

        const [_,params] =videoURL.split("/shorts/")
        const [videoID] = params.split("?si=") // separando informações que são passadas de outras maneiras
        console.log(videoID) // retorna somente o indice 0 por causa dos []

        content.current.textContent = "Obtendo texto do audio..."
        const transcription = await axiosInstances.get("/summary/" + videoID) // envia a informação passada pelo input para o localhost que está hospedado o backend 
        content.current.textContent = "realizando o resumo."
        const summary = await axiosInstances.post("/summary",{
            text: transcription.data.result
        })

        content.current.textContent = transcription.data.result
        content.current.classList.remove("placeholder")
    };
    return (
        <>
        <form onSubmit={handleSubmit} id='form' ref={formRef} className='gap-3 mt-16 flex w-full'>
            <input type="url" placeholder='URL do Video' ref={InputRef} className='max-h-full w-full border-none bg-zinc-800/90 text-white p-2 rounded'/>
            <button className='w-14 bg-purple-600 rounded flex justify-center items-center hover:bg-purple-600/70 duration-300'><Search size={20} className='hover:animate-pulse h-full w-full p-4'/></button>
        </form>

        <h2 className='self-start mt-12 text-3xl font-semibold'>Resumo</h2>
        <p className='self-start placeholder  mt-4' id='content' ref={content}>escolha um short para resumir...</p>
        </>
    );
}
