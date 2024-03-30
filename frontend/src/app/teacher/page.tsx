import { prisma } from '@/lib/db';
import { getAuthSession } from '@/lib/nextauth';
import React from 'react'
import Dashboard from '../../../components/Dash';

type Props = {}

const page = async (props: Props) => {
    const session = await getAuthSession();
    if (session?.user) {
        await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                role: "teacher",
            },
        });
    }
    return (
        <div className='bg-blue-200'>
            <Dashboard/>
        </div>
    )
}

export default page