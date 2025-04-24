"use client"

import { useState } from 'react'
import { ProfileFormData, useProfileForm } from './profile-form'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

import imgTest from '../../../../../../public/foto1.png'



export function ProfileContent() {

    const [selectedHours, setSelectedHours] = useState<string[]>([]);
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const form = useProfileForm();

    function generateTimeSlots(): string[] {
        const hours: string[] = [];

        for(let i = 8; i <= 24; i++) {
            for(let j = 0; j < 2; j++) {
                const hour = i.toString().padStart(2, "0")
                const minute = (j * 30).toString().padStart(2, "0")
                hours.push(`${hour}:${minute}`)
            }
        }

        return hours;
    }

    const hours = generateTimeSlots();

    function toggleHour(hour: string) {
        setSelectedHours((prev) => prev.includes(hour) ? prev.filter(h => h !== hour) : [...prev, hour].sort())
    }

    const timeZones = Intl.supportedValuesOf("timeZone").filter((zone) => 
        zone.startsWith("America/Sao_Paulo") ||
        zone.startsWith("America/Fortaleza") ||
        zone.startsWith("America/Recife") ||
        zone.startsWith("America/Bahia") ||
        zone.startsWith("America/Belem") ||
        zone.startsWith("America/Manaus") ||
        zone.startsWith("America/Cuiaba") ||
        zone.startsWith("America/Boa_Vista")
    );

    async function onSubmit(values: ProfileFormData) {
        const profileData = {
            ...values,
            times: selectedHours
        }
    }

    return (
        <div className='mx-auto'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Meu Perfil</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-6'>
                            <div className='flex justify-center'>
                                <div className='bg-gray-200 relative h-40 w-40 rounded-full overflow-hidden'>
                                    <Image
                                        src={imgTest}
                                        alt="Foto da clinica"
                                        fill
                                        className='object-cover'
                                    />
                                </div>
                            </div>

                            <div className='space-y-4'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={ ({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>Nome completo</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    {...field}
                                                    placeholder='Digite o nome da clinica...'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={ ({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>
                                                Endereço completo
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    {...field}
                                                    placeholder='Digite o endereço da clinica...'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={ ({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>
                                                Telefone
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    {...field}
                                                    placeholder='Digite o telefone...'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={ ({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>
                                                Status da clinica
                                            </FormLabel>
                                            <FormControl>
                                                <Select 
                                                    onValueChange={field.onChange} 
                                                    defaultValue={field.value ? "active" : "inactive"}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione o status da clinica" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="active">ATIVO (clinica aberta)</SelectItem>
                                                        <SelectItem value="inactive">INATIVO (clinica fechada)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <div className='space-y-2'>
                                    <Label className='font-semibold'>
                                        Configurar horários da clinica
                                    </Label>

                                    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                                        <DialogTrigger asChild>
                                            <Button 
                                                variant="outline"
                                                className='w-full justify-between'
                                            >
                                                Clique aqui para selecionar horários
                                                <ArrowRight className='w-5 h-5' />
                                            </Button>
                                        </DialogTrigger>

                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Horários da clinica</DialogTitle>
                                                <DialogDescription>
                                                    Selecione abaixo os horários de funcionamento da clinica:
                                                </DialogDescription>
                                            </DialogHeader>

                                            <section className='py-4'>
                                                <p className='text-sm text-muted-foreground mb-2'>
                                                    Clique nos horários abaixo para marcar ou desmarcar:
                                                </p>
                                                <div className='grid grid-cols-5 gap-2'>
                                                    {hours.map((hour) => (
                                                        <Button 
                                                            key={hour}
                                                            variant="outline"
                                                            className={cn('h-10', selectedHours.includes(hour) && 'border-2 border-emerald-500 text-primary')}
                                                            onClick={ () => toggleHour(hour) }
                                                        >
                                                            {hour}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </section>

                                            <Button 
                                                className='w-full' 
                                                onClick={ () => setDialogIsOpen(false) }
                                            >
                                                Salvar horários
                                            </Button>
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="timeZone"
                                    render={ ({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-semibold'>
                                                Selecione o fuso horário
                                            </FormLabel>
                                            <FormControl>
                                                <Select 
                                                    onValueChange={field.onChange} 
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione o seu fuso horário" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {timeZones.map((zone) => (
                                                            <SelectItem 
                                                                key={zone}
                                                                value={zone}
                                                            >
                                                                {zone}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className='w-full bg-emerald-500 hover:bg-emerald-400'
                                >
                                    Salvar alterações
                                </Button>

                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    )
}