import { Migration } from '@mikro-orm/migrations';

export class Migration20230626112737 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "event_entity" alter column "start_date" type varchar(255) using ("start_date"::varchar(255));');
  }

  async down(): Promise<void> {
    this.addSql('alter table "event_entity" alter column "start_date" type timestamptz(0) using ("start_date"::timestamptz(0));');
  }

}
