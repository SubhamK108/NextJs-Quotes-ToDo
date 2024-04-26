# NextJs Quotes ToDo

> This was initially created for teaching & demonstrating the features of [NextJS](https://nextjs.org/) and [TailwindCSS](https://tailwindcss.com/).

## Features

- ### Quote Of The Day
  - Displays a random quote from eminent personalities.
  - The displayed quote can be replaced with a new random quote by clicking a button.
- ### Things To Do Today (ToDo)
  - A simple ToDo with `Add`, `Delete` & `Check/Uncheck` functions.
  - Initially, the app will populate the page with random ToDos fetched from an API, all of which can then be modified.
  - There is a `Sync Tasks` feature/button which can be used to save all the current ToDos in the browser's local storage, so unless the browser history/data is cleared, the current ToDos will always be available. If the browser history/data is cleared, then the current ToDos will be lost and the app will reset and again populate the page with random ToDos.
  - Additionally, this `Sync Tasks` feature can be extended to save the current ToDos into an actual Database (DB). Currently, it simply mocks a POST API call in addition to saving the current ToDos in the browser's local storage.

> All the APIs used in this app are from the wonderful [DummyJSON](https://dummyjson.com/) project.
