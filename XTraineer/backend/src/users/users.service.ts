import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, email: "user@example.com", password: "password" },
  ];

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: number): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async create(userData: Partial<User>): Promise<User> {
    const newUser: User = {
      id: this.users.length + 1,
      email: userData.email ?? "",
      password: userData.password ?? "",
    };
    this.users.push(newUser);
    return newUser;
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, userData);
    return user;
  }

  async remove(id: number): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.users.splice(index, 1);
  }
}
