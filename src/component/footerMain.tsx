import React, { useContext, useEffect, useMemo, useState } from "react";
import { GameContext } from "../context/GameContext";
//import { myConstants} from "../config/config";
import { levelMax } from "../constants/leveldata";
import Upgrade from '../assets/icons/upgrade.png'
import Boost from '../assets/icons/boost.png'
import Click from '../assets/icons/clicks.png'
import Home from '../assets/icons/home.png'
import Logout from '../assets/icons/logout.png'
import Task from '../assets/icons/task.png'

interface GlobalContextProps {
  fCount: number;
  level: number;
  F$rate: number;
 // levelupRate: number;
  myConstants: {
    Growth_rate_per_level: number;
    Max_Level: number;
  };
  setfCount: React.Dispatch<React.SetStateAction<number>>;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  setF$rate: React.Dispatch<React.SetStateAction<number>>;
  currentView: string;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}

const FooterMain: React.FC = () => {

  const {
    fCount,
    level,
    F$rate,
   // levelupRate,
    myConstants,
    currentView,
    setfCount,
    setLevel,
    setF$rate,
    setCurrentView,
  } = useContext(GameContext) as GlobalContextProps;
  const { handleLogout, setUserId } = useContext(GameContext)!;
  

  const updatelevel = () => {
    if (fCount > levelMax[level - 1]) {
      setfCount(fCount-levelMax[level-1]);
      setLevel(level + 1);
      const rate = F$rate  + (myConstants.Growth_rate_per_level * level);
   
      setF$rate(rate);
    } else {
      alert("Not enough F$ to upgrade ;-)");
      
    }
  };




  const isMaxLevel = level >= myConstants.Max_Level;

  const logout = () => {

    localStorage.removeItem("userId"); 
    handleLogout();

  }


  return (
    <div className="text-white font-roadrage w-full "> {/*max-w-[400px]*/}
      <div
        className="flex justify-evenly text-xs  py-4 gap-1 overflow-x-none bg-darkwine rounded-xl"
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {currentView !== "MainSection" && (
          <button
            className="px-2 rounded-lg text-xs"
            onClick={() => setCurrentView("MainSection")}
            style={{
              textShadow: "0 0 1px black"
            }}
          >
            <img src={Home} alt="Home Icon" className="w-10 h-10 object-contain" />
            Home
          </button>
        )}
        {currentView == "MainSection" && (
        <button
          className="px-2 rounded-lg text-xs"
          onClick={updatelevel}
          style={{
            textShadow: "0 0 1px black"
          }}
          disabled={isMaxLevel}
        >
          <img src={Upgrade} alt="Upgrade Icon" className="w-10 h-10 object-contain" />
          Upgrade
        </button>)}
        <button
          className="px-2 rounded-lg text-xs"
          onClick={() => setCurrentView("BoostPage")}
          style={{
            textShadow: "0 0 1px black"
          }}
        >
          <img src={Boost} alt="Boost Icon" className="w-10 h-10 object-contain" />
          Boost
        </button>
        <button
          className="px-2 rounded-lg text-xs"
          onClick={() => setCurrentView("PlayToWinPage")}
          style={{
            textShadow: "0 0 1px black"
          }}
        >
          <img src={Click} alt="Click Icon" className="w-10 h-10 object-contain" />
          Win
        </button>
        <button
          className="px-2 rounded-lg text-xs"
          onClick={() => setCurrentView("TaskPage")}
          style={{
            textShadow: "0 0 1px black"
          }}
        >
          <img src={Task} alt="Task Icon" className="w-10 h-10 object-contain" />
          Tasks
        </button>
        <button
          className="px-2 rounded-lg text-xs"
          onClick={() => logout()}
          style={{
            textShadow: "0 0 1px black"
          }}
        >
          <img src={Logout} alt="Logout Icon" className="w-10 h-10 object-contain" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default FooterMain;

function LevelUpCost(baseCost: number, levelUpRate: number, level: number): number {
  return baseCost * levelUpRate * (level + 1);
}
