import { api } from "encore.dev/api";
import { db } from "../database/database";
import { users } from "../database/schema";
import { signups } from "./signUp";
import { eq } from "drizzle-orm";

interface User {
  name: string,
  email: string,
  id: string,
  createdAt: Date | null
}

interface Response {
  status: string;
}

//TODO:Move nodemailer from devDependencies  to dependencies


export const signUp = api(
  { method: "POST", path: "/sign-up", expose: true },
  async ({ name, email }: User): Promise<Response> => {
    await db.insert(users).values(
      {
        name: name,
        email: email
      }
    );
    await signups.publish({ name, email });
    return {
      status: "success"
    };
  }
);

//Create a users delete table
export const deleteUser = api(
  { method: "DELETE", path: "/delete-user", expose: true },
  async ({ id }: User): Promise<Response> => {
    await db.delete(users).where(eq(users.id, id));
    return {
      status: "success"
    };
  }
);

//Update Users in a table
export const updateUser = api(
  { method: "PUT", path: "/update-user", expose: true },
  async ({ id, name, email }: User): Promise<Response> => {
    await db.update(users)
      .set({ name: name, email: email })
      .where(eq(users.id, id));
    return {
      status: "success"
    };
  }
);

//Fetch user by name
export const fetchUsers = api(
  { method: "GET", path: "/fetch-user/:name", expose: true },
  async ({ name }: { name: string }): Promise<User> => {
    const user = await db.select().from(users).where(eq(users.name, name)).limit(1);
    return user[0];
  });
