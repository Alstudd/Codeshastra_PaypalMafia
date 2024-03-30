import { prisma } from '@/lib/db';
import { getAuthSession } from '@/lib/nextauth';
import React from 'react'

type Props = {}

const page = async (props: Props) => {
    const session = await getAuthSession();
    if (session?.user) {
        await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                role: "student",
            },
        });
    }
  return (
    <div>Student</div>
  )
}

export default page