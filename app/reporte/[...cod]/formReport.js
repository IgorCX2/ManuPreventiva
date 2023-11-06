'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
async function postSalvarInfos(tipo, dados, tempo){
    try{
        const apiSalvarInfos = await fetch(`http://localhost:8080/api/reportarTarefas/reporte-${tipo}`, {
            method: 'POST',
            body: JSON.stringify({dados, tempo}),
            headers: { 'Content-Type': 'application/json',}
        });
        return apiSalvarInfos.json()
    }catch(error) {
        return error
    }
}
export default function ReportForm({ dados, tipo }) {
    const router = useRouter()
    const [reportData, setReportData] = useState(dados);
    const [dataServico, setDataServico] = useState({
        dataInicio: '',
        dataFinal: ''
    })
    const handleInputChange = (index, e) => {
        const updatedReportData = reportData.map((item, i) => {
            if (i === index) {
                return { ...item, [e.target.name]: e.target.value };
            }
            return item;
        });
        setReportData(updatedReportData);
    };
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setDataServico(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const salvarDados = async e => {
        e.preventDefault()
        const responseEnv = await postSalvarInfos(tipo,reportData,dataServico)
        return router.push('/tarefas')
    }
    return (
        <section className="mt-16 w-full flex flex-col gap-5">
            {reportData.map((dadoMaquina, index) => (
                <div key={index} className="bg-white w-full drop-shadow-2xl rounded-lg p-5">
                    <div className="flex gap-2">
                        <span>#{index + 1}</span>
                        <h1 className="font-bold text-2xl">{dadoMaquina.tarefa}</h1>
                    </div>
                    <div className="mt-10 flex flex-col gap-8 text-lg">
                        <div className='flex gap-8 w-full'>
                            <label htmlFor={`como-${index}`}>Como:</label>
                            <textarea onChange={(e) => handleInputChange(index, e)} id={`como-${index}`} name="como" className='w-full border-2 border-cyan-500 rounded-lg' value={dadoMaquina.como || ''}/>
                        </div>
                        <div className='flex gap-8 w-full'>
                            <label htmlFor={`material-${index}`}>Material:</label>
                            <input type="text" onChange={(e) => handleInputChange(index, e)} id={`material-${index}`} name="material" className='w-full border-2 border-cyan-500 rounded-lg' value={dadoMaquina.material || ''}/>
                        </div>
                    </div>
                </div>
            ))}
            <div className='flex gap-5 flex-wrap bg-white w-full drop-shadow-2xl rounded-lg p-5'>
                <div className='flex gap-5'>
                    <label htmlFor='dataInicio' className='font-medium'>Data Inicial</label>
                    <input id='dataInicio' name='dataInicio' type="datetime-local" value={dataServico.dataInicio} onChange={handleDataChange}/>
                </div>
                <div className='flex gap-5'>
                    <label htmlFor='dataFinal' className='font-medium'>Data Final</label>
                    <input id='dataFinal' name='dataFinal' type="datetime-local" value={dataServico.dataFinal} onChange={handleDataChange}/>
                </div>
            </div>
            <button className='mt-5 bg-cyan-400 py-1 px-5 rounded-lg text-white font-bold' onClick={salvarDados}>SALVAR</button>
        </section>
    )
}
