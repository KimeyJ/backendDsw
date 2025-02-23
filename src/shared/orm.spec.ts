import { MikroORM } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import { orm, syncSchema } from './orm';

jest.mock('@mikro-orm/core');
jest.mock('@mikro-orm/mysql');

describe('suma de numeros', () => {
  let mockOrm: any;

  beforeAll(async () => {
    (MikroORM.init as jest.Mock).mockResolvedValue({
      getSchemaGenerator: jest.fn().mockReturnValue({
        dropSchema: jest.fn().mockResolvedValue(undefined),
        createSchema: jest.fn().mockResolvedValue(undefined),
        updateSchema: jest.fn().mockResolvedValue(undefined),
      }),
    }),
      (mockOrm = await orm);
  });

  afterAll(async () => {
    await mockOrm.close();
  });
  it('Debe iniciar la MikroOrm con la configuracion adecuada', async () => {
    expect(MikroORM.init).toHaveBeenCalledWith({
      entities: ['dist/**/*.entity.js'],
      entitiesTs: ['src/**/*.entity.ts'],
      dbName: 'consultorios',
      driver: MySqlDriver,
      driverOptions: {
        host: 'localhost',
        port: 3306,
        user: 'dsw',
        password: 'dsw',
        dbName: 'consultorios',
      },
      clientUrl: 'mysql://dsw:dsw@localhost:3306/consultorios',
      highlighter: expect.anything(),
      debug: true,
      schemaGenerator: {
        //never in production
        disableForeignKeys: true,
        createForeignKeyConstraints: true,
        ignoreSchema: [],
      },
    });
  });

  it('Debe sincronizar el schema correctamente', async () => {
    const generator = mockOrm.getSchemaGenerator();

    await syncSchema();

    expect(generator.dropSchema).toHaveBeenCalled();
    expect(generator.createSchema).toHaveBeenCalled();
    expect(generator.updateSchema).toHaveBeenCalled();
  });
});

function suma(a: number, b: number): number {
  return a + b;
}
