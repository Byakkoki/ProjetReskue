import { Migration } from '@mikro-orm/migrations';

export class Migration20230622201430 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "password" varchar(255) not null, add column "roles" text[] not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "password";');
    this.addSql('alter table "user" drop column "roles";');
  }

}
