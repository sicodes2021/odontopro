import { redirect } from 'next/navigation'
import { getInfoSchedule } from './_data-access/get-info-schedule'


export default async function SchedulePage({
    params,
} : {
    params: Promise<{ id: string }>
}) {

    const userId = (await params).id
    const user = await getInfoSchedule({ userId: userId })

    if(!user) {
        redirect("/")
    }

    return (
        <h1>Teste: {userId}</h1>
    )
}