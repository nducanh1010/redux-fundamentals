import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { RootState } from "./redux/store";
import { decrement, increment } from "./redux/counter/counter.slide";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import Header from "./components/header";
import TabsContent from "./components/tabs.content";
import UsersTable from "./components/users.table";

function App() {
  const counter = useAppSelector((state: RootState) => state.count); // giong mapState
  console.log(counter);
  return (
    <>
      <Header />
      <TabsContent />
    </>
  );
}

export default App;
