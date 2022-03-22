import * as bcrypt from 'bcrypt';

export class Misc {
  private static saltRounds = 10;

  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  static async checkCredentials(
    password: string,
    hash: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
