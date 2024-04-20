"use server";

import { delay } from "@/lib/utils";
import { EmptyUserToDo, ToDo, UserToDo } from "@/models/ToDo";

export type ToDosRequestResult = "NOT_MADE" | "GET_SUCCESS" | "GET_FAIL" | "POST_FAIL" | "POST_SUCCESS";

export async function getToDos(userId: number): Promise<[UserToDo, ToDosRequestResult]> {
  await delay(500);
  try {
    const res = await fetch(`https://dummyjson.com/todos/user/${userId}`, { cache: "no-store" });
    if (res.ok) {
      const data: UserToDo = await res.json();
      return [data, "GET_SUCCESS"];
    } else {
      throw new Error();
    }
  } catch {
    return [EmptyUserToDo, "GET_FAIL"];
  }
}

export async function syncToDos(todos: ToDo[]): Promise<ToDosRequestResult> {
  await delay(500);
  const updatingToDo: ToDo =
    todos.length !== 0
      ? { ...todos[0] }
      : {
          todo: "",
          completed: false,
          userId: 1
        };
  try {
    const res = await fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatingToDo)
    });
    if (res.ok) {
      return "POST_SUCCESS";
    } else {
      throw new Error();
    }
  } catch {
    return "POST_FAIL";
  }
}
