import { ReactElement } from "react";
import { ToDo, UserToDo } from "@/models/ToDo";
import { TrashIcon } from "../shared/icons";

interface NotesDisplayProps {
  ToDos: UserToDo;
  ToggleCheckToDo: (todo: ToDo) => void;
  DeleteToDo: (todo: ToDo) => void;
}

export default function TodosDisplay({ ToDos, ToggleCheckToDo, DeleteToDo }: NotesDisplayProps): ReactElement {
  return (
    <div className="mt-12 w-[50rem] max-sm:mt-4 max-sm:mb-1 max-sm:w-auto max-sm:px-8 font-sans">
      <div className="mt-5 mb-3 max-sm:mt-4 max-sm:mb-2 flex flex-col justify-center items-center">
        {ToDos.total === 0 ? (
          <div className="mb-4 h-[15.25rem] max-sm:h-[12.75rem] flex flex-col justify-center items-center">
            <p className="text-4xl max-sm:text-3xl font-sans italic">{"You have nothing to do as of now."}</p>
          </div>
        ) : (
          <ul className="list-none">
            {ToDos.todos.map((todo: ToDo, index: number) => (
              <li key={index}>
                <div className="flex flex-row items-center text-left gap-x-3 max-sm:gap-x-2 my-3 max-sm:my-1">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => ToggleCheckToDo(todo)}
                    className="h-5 w-5 min-w-5 max-sm:h-[1.1rem] max-sm:w-[1.1rem] max-sm:min-w-[1.1rem] cursor-pointer"
                  />
                  <p
                    className={`text-2xl max-sm:text-[1.2rem] leading-[1.75rem] cursor-pointer select-none ${
                      todo.completed && "line-through"
                    }`}
                    onClick={() => ToggleCheckToDo(todo)}
                  >
                    {todo.todo}
                  </p>
                  <div
                    className="cursor-pointer hover:text-[#26272A] dark:hover:text-white"
                    title="Delete ToDo"
                    onClick={() => DeleteToDo(todo)}
                  >
                    <TrashIcon />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
