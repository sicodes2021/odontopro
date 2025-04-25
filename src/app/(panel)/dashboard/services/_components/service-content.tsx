import { getAllServices } from "../_data-access/get-all-services";


interface ServicesContentProps{
    userId: string;
}

export async function ServicesContent({ userId }: ServicesContentProps) {

    const servicos = await getAllServices({ userId: userId })
    return(
        <div>
            Todos os meus serviços
        </div>
    )
}