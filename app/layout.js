import '../globals.css'
export default function LayoutFull({children}){
    return(
        <html lang="pt-BR">
            <body className='flex justify-center items-center'>
                {children}
            </body>
        </html>
    )
}