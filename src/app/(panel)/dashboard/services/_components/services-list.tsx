"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Card,  CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Pencil, Plus, X } from "lucide-react"
import { DialogServices } from './dialog-services'
import { Service } from "../../../../../../generated/prisma"
import { formatCurrency } from '@/utils/formatCurrency'


interface ServicesListProps {
    services: Service[]
}

export function ServicesList({ services }: ServicesListProps) {

    const [isDialogOpen, setIsDialogOpen] = useState(false);


    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <section className='mx-auto'>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-xl md:text-2xl font-bold'>Serviços</CardTitle>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className='w-4 h-4'/>
                            </Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogServices 
                                closeModal={() => {
                                    setIsDialogOpen(false);
                                }}
                            />
                        </DialogContent>
                    </CardHeader>

                    <CardContent>
                        <section className="space-y-4 mt-5">
                            {services.map( service => (
                                <article 
                                    key={service.id}
                                    className='flex items-center justify-between'
                                >
                                    <div className='flex items-center space-x-2'>
                                        <span className='font-medium'>{service.name}</span>
                                        <span className='text-gray-500'>-</span>
                                        <span className='text-gray-500'>
                                            {formatCurrency((service.price / 100))}
                                        </span>
                                    </div>

                                    <div>
                                        <Button 
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {}}
                                        >
                                            <Pencil className='w-4 h-4' />
                                        </Button>

                                        <Button 
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {}}
                                        >
                                            <X className='w-4 h-4' />
                                        </Button>
                                    </div>
                                </article>
                            ))}
                        </section>
                    </CardContent>
                </Card>
            </section>
        </Dialog>
    )
}