import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
	return new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });
};

declare const globalThis: {
	prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

/*
I am trying to create a row in the database through prism and I get the error:

The "payload" argument must be of type object. Received null

In the payload or the data I am sending an object with the corresponding fields, which are mandatory for the model in the required data type.

Part of my action:

try {
    const user = await prisma.user.create({
      data: {
        name: capitalizeWord(name),
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return {
      ok: true,
      message: 'Usuario creado exitosamente',
      user: user,
    };
  }

Note: It has already been validated that capitalizeWord returns a string.
*/
