import { db } from '@/utils/db';
import { createId } from '@paralleldrive/cuid2';
import { StatusType } from '@prisma/client';


const main = async () => {
  try {
    console.log('Seeding database');

    await db.status.createMany({
        data: [
            {
                id: createId(),
                name: StatusType.New,
            },
            {
                id: createId(),
                name: StatusType.None,
            },
            {
                id: createId(),
                name: StatusType.Deprecated,
            },
        ],
    })

    console.log('Seeding finished');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to seed the database');
  }
};

main();