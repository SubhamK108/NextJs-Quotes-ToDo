"use client";

import ErrorPage from "@/components/shared/error-page";
import Header from "@/components/shared/header";
import { CheckIcon, PlusCircleIcon, XMarkIcon } from "@/components/shared/icons";
import { CircularSpinnerSmall } from "@/components/shared/spinners";
import { ToDosRequestResult, getToDos, syncToDos } from "@/components/todos/todos-api";
import TodosDisplay from "@/components/todos/todos-display";
import ToDosLoadingState from "@/components/todos/todos-loading-state";
import { delay, getRandomNumber } from "@/lib/utils";
import { EmptyUserToDo, ToDo, UserToDo } from "@/models/ToDo";
import Link from "next/link";
import { ReactElement, useCallback, useEffect, useRef, useState } from "react";

export default function ToDos(): ReactElement {
  const ranUseEffect = useRef<boolean>(false);
  const [userToDo, setUserToDo] = useState<UserToDo>(EmptyUserToDo);
  const [userId, setUserId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [newToDoText, setNewToDoText] = useState<string>("");
  const [startedSync, setStartedSync] = useState<boolean>(false);
  const [syncInfo, setSyncInfo] = useState<ToDosRequestResult>("NOT_MADE");
  const [syncInfoShown, setSyncInfoShown] = useState<boolean>(false);

  async function getAllToDos(): Promise<void> {
    if (localStorage.getItem("userId") !== null && localStorage.getItem("userToDo") !== null) {
      await delay(500);
      setUserToDo(JSON.parse(localStorage.getItem("userToDo")!));
      setUserId(parseInt(localStorage.getItem("userId")!));
      setLoading(false);
      return;
    }

    let currentUserId: number = 0;
    if (localStorage.getItem("userId") !== null) {
      currentUserId = parseInt(localStorage.getItem("userId")!);
    } else {
      currentUserId = getRandomNumber(1, 50);
    }
    const data: [UserToDo, ToDosRequestResult] = await getToDos(currentUserId);
    if (data[1] === "GET_SUCCESS") {
      setUserToDo(data[0]);
      localStorage.setItem("userId", `${currentUserId}`);
      localStorage.setItem("userToDo", JSON.stringify(data[0]));
    } else {
      setIsError(true);
    }
    setLoading(false);
  }

  const getAllToDosCached = useCallback(getAllToDos, []);

  useEffect(() => {
    if (ranUseEffect.current || process.env.NODE_ENV !== "development") {
      getAllToDosCached();
    }
    ranUseEffect.current = true;
  }, [getAllToDosCached]);

  function toggleCheckToDo(todo: ToDo): void {
    const updatedToDos: ToDo[] = userToDo.todos.map((currToDo: ToDo) => {
      if (currToDo === todo) {
        return { ...currToDo, completed: !currToDo.completed };
      } else {
        return currToDo;
      }
    });
    const updatedUserToDo: UserToDo = {
      ...userToDo,
      todos: updatedToDos
    };
    setUserToDo(updatedUserToDo);
  }

  function deleteToDo(todo: ToDo): void {
    const updatedUserToDo: UserToDo = {
      ...userToDo,
      todos: userToDo.todos.filter((currToDo: ToDo) => currToDo !== todo),
      total: userToDo.total - 1
    };
    setUserToDo(updatedUserToDo);
  }

  function addNewToDo(): void {
    const newToDo: ToDo = {
      todo: newToDoText,
      completed: false,
      userId: userId
    };
    const updatedUserToDo: UserToDo = {
      ...userToDo,
      todos: userToDo.todos.concat(newToDo),
      total: userToDo.total + 1
    };
    setUserToDo(updatedUserToDo);
    setNewToDoText("");
  }

  async function syncAllToDos(): Promise<void> {
    setStartedSync(true);
    const response: ToDosRequestResult = await syncToDos(userToDo.todos);
    if (response === "POST_SUCCESS") {
      localStorage.setItem("userToDo", JSON.stringify(userToDo));
    } else {
    }
    setSyncInfo(response);
    setSyncInfoShown(true);
    setStartedSync(false);
    setTimeout(() => setSyncInfoShown(false), 3000);
  }

  if (!loading && isError) {
    return (
      <div className="h-screen flex flex-col justify-center items-center text-center">
        <ErrorPage />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col justify-center items-center text-center">
      <Header Heading="Your Tasks" />
      {loading ? (
        <ToDosLoadingState />
      ) : (
        <TodosDisplay ToDos={userToDo} ToggleCheckToDo={toggleCheckToDo} DeleteToDo={deleteToDo} />
      )}
      <div className="mt-7 max-sm:mt-[0.9rem] flex flex-col justify-center items-center">
        <div className="flex flex-row justify-center items-center">
          <input
            className="text-3xl max-sm:text-[1.2rem] border border-[#AEAEAE] rounded-lg font-sans h-11 max-sm:h-8 w-[38.5rem] max-sm:w-[18.5rem] mx-3 max-sm:mx-2 text-center"
            type="text"
            value={newToDoText}
            onInput={(e) => setNewToDoText(e.currentTarget.value)}
            placeholder="Add a new task..."
            disabled={loading}
          />
          <div className="cursor-pointer hover:text-[#26272A] dark:hover:text-white" title="Add ToDo" onClick={addNewToDo}>
            <PlusCircleIcon />
          </div>
        </div>
        <button
          className="mt-6 max-sm:mt-4 text-3xl max-sm:text-2xl rounded-xl bg-green-700 dark:bg-green-900 hover:bg-green-900 dark:hover:bg-green-950 disabled:bg-zinc-400 dark:disabled:bg-zinc-800 hover:ring hover:ring-green-500 dark:hover:ring-green-700 disabled:ring-transparent dark:disabled:ring-transparent text-gray-200 disabled:text-zinc-300 dark:disabled:text-zinc-600 p-2 h-[4.5rem] w-56 max-sm:h-16 max-sm:w-44"
          onClick={syncAllToDos}
          disabled={loading}
        >
          {startedSync ? (
            <CircularSpinnerSmall />
          ) : syncInfoShown ? (
            syncInfo === "POST_SUCCESS" ? (
              <div className="flex justify-center items-center">
                <CheckIcon />
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <XMarkIcon />
              </div>
            )
          ) : (
            "Sync Tasks"
          )}
        </button>
        <Link href="/" replace={true}>
          <button className="mt-6 mb-5 max-sm:mt-4 max-sm:mb-3 text-3xl max-sm:text-2xl rounded-xl bg-[#074DA6] dark:bg-[#05336E] hover:bg-[#05346e] dark:hover:bg-[#04234D] hover:ring hover:ring-[#0091ff] dark:hover:ring-[#074DA6] text-gray-200 p-2 h-[4.5rem] w-56 max-sm:h-16 max-sm:w-44">
            {"Go Back"}
          </button>
        </Link>
      </div>
    </div>
  );
}
