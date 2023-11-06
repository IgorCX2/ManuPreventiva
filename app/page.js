'use client'
import React, { useState } from 'react';
import QrCodeImage from '../components/blocoReporte';

async function postTarefa(maquina, tipo, tarefas){
    try{
        const apiTarefas = await fetch(`http://localhost:8080/api/abrirTarefas/${tipo}`, {
            method: 'POST',
            body: JSON.stringify({maquina, tipo, tarefas}),
            headers: { 'Content-Type': 'application/json',}
        });
        return apiTarefas.json()
    }catch(error) {
        return error
    }
}
export default function CadastrarDados(){
    const [response, setResponse] = useState('')
    const [imgFormat, setImgFormt] = useState('')
    const [tarefas, setTarefas] = useState([{ id: Date.now(), valor: '' }]);
    const adicionarTarefa = () => {
        if(tarefas[tarefas.length-1].valor != ""){
            setTarefas([...tarefas, { id: Date.now(), valor: '' }]);
            setResponse("")
        }else{
            setResponse("O utlimo registro está vazio =(")
        }
    };
    const atualizarTarefa = (id, valor) => {
        const novasTarefas = tarefas.map(tarefa => {
            if (tarefa.id === id) {
                return { ...tarefa, valor };
            }
            return tarefa;
        });
        setTarefas(novasTarefas);
    };
    const removerTarefa = (id) => {
        setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
    };
    const [formDados, setFormDados] = useState({
        tipoManu: '',
        maquina: ''
    })
    const onChangeInput = e => setFormDados({ ...formDados, [e.target.name]: e.target.value })
    const enviarDados =  async e =>{
        e.preventDefault()
        setResponse("Carregando...")
        const responseEnv = await postTarefa(formDados.maquina, formDados.tipoManu, tarefas)
        console.log(responseEnv)
        setImgFormt(responseEnv.qrCode)
    }
    return(
        <main className="w-3/4 flex flex-col justify-center items-center mt-16">
            <h1 className='text-7xl	font-black text-center'>MANUTENÇÃO PREVENTIVA</h1>
            <form className="flex flex-col gap-8 mt-28 w-3/4 text-xl" onSubmit={enviarDados}>
                <div className='flex gap-8 w-full'>
                    <label htmlFor='tipoManu' className='font-bold'>Tipo:</label>
                    <select name="tipoManu" id="tipoManu" className='w-full border-2 border-cyan-500 rounded-lg' onChange={onChangeInput}>
                        <option value=""></option>
                        <option value="hidraulico">Hidráulico</option>
                        <option value="eletrico">Elétrico</option>
                    </select>
                </div>
                <div className='flex gap-8 w-full'>
                    <label htmlFor='maquina' className='font-bold'>Máquina:</label>
                    <input type="text" id="maquina" name="maquina" className='w-full border-2 border-cyan-500 rounded-lg' onChange={onChangeInput}/>
                </div>
                <div className='flex flex-col gap-3'>
                    {tarefas.map((tarefa, index) => (
                        <div key={tarefa.id} className='flex gap-8 w-full'>
                            <label className='font-bold' htmlFor={`Tarefa-${tarefa.id}`}>Tarefa{index + 1}:</label>
                            <div className='flex w-full gap-5'>
                                <input
                                    type="text"
                                    id={`tarefa-${tarefa.id}`}
                                    value={tarefa.valor}
                                    onChange={(e) => atualizarTarefa(tarefa.id, e.target.value)}
                                    className='w-full border-2 border-cyan-500 rounded-lg'
                                />
                                <button type="button" className='bg-red-500 rounded-full px-1' onClick={() => removerTarefa(tarefa.id)}>Re</button>
                            </div>
                        </div>
                    ))}
                    <div>
                        <button type="button" className='bg-cyan-500 py-1 px-5 rounded-lg text-white font-bold mt-5' onClick={adicionarTarefa}>
                            Adicionar Tarefa
                        </button>
                    </div>
                    <button className='mt-10 bg-cyan-400 py-1 px-5 rounded-lg text-white font-bold'>SALVAR</button>
                </div>
                {response && <p className='text-red-500'>{response}</p>}
                {imgFormat && <QrCodeImage qrCodeUrl={imgFormat}/>}
            </form>
        </main>
    )
}