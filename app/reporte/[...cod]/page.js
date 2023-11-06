import ReportForm from "./formReport";

async function postBucarInfos(tipo, cod){
    try{
        const apiBucarInfos = await fetch(`https://hutapi.aprendacomeduke.com.br/api/reportarTarefas/pegardados-${tipo}`, {
            method: 'POST',
            body: JSON.stringify({cod}),
            headers: { 'Content-Type': 'application/json',}
        });
        return apiBucarInfos.json()
    }catch(error) {
        return error
    }
}
export default async function Reporte({params}){
    const responseEnv = await postBucarInfos(params.cod[0],params.cod[1])
    console.log(responseEnv)
    return(
        <main className=" flex flex-col justify-center items-center mt-16">
            <section>
                <h2 className='text-7xl	uppercase font-black text-center text-black/25'>{params.cod[0]}</h2>
                <h1 className='-mt-10 text-7xl font-black text-center uppercase'>{responseEnv.buscarDados[0].maquina}</h1>
            </section>
            <ReportForm dados={responseEnv.buscarDados} tipo={params.cod[0]}/>
        </main>
    )
}