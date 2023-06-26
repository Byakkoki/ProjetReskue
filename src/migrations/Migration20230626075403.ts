import { Migration } from '@mikro-orm/migrations';

export class Migration20230626075403 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "ticket_entity" drop constraint "ticket_entity_owner_id_foreign";');

    this.addSql('alter table "ticket_entity" alter column "owner_id" type varchar(255) using ("owner_id"::varchar(255));');
    this.addSql('alter table "ticket_entity" alter column "owner_id" drop not null;');
    this.addSql('alter table "ticket_entity" add constraint "ticket_entity_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "ticket_entity" drop constraint "ticket_entity_owner_id_foreign";');

    this.addSql('alter table "ticket_entity" alter column "owner_id" type varchar using ("owner_id"::varchar);');
    this.addSql('alter table "ticket_entity" alter column "owner_id" set not null;');
    this.addSql('alter table "ticket_entity" add constraint "ticket_entity_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade on delete no action;');
  }

}
