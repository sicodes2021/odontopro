import { getAllServices } from "../_data-access/get-all-services";
import { ServicesList } from "./services-list";


interface ServicesContentProps{
    userId: string;
}

export async function ServicesContent({ userId }: ServicesContentProps) {

    const servicos = await getAllServices({ userId: userId })
    
    return(
        <ServicesList services={servicos.data || []} />
    )
}