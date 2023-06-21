"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default function Card(driver: Driver) {
  const router = useRouter();

  async function overtake(id: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/drivers/${id}/overtake`,
      {
        method: "POST",
      }
    );
    if (!res.ok) throw new Error("Failed to overtake");
    router.refresh();
  }

  return (
    <div
      className="flex flex-col items-center w-72  justify-center  bg-gray-200 rounded-lg text-black m-2 cursor-pointer"
      onClick={() => overtake(driver.id)}
    >
      <div className="w-full pl-4 bg-slate-400 rounded-tl rounded-tr shadow font-mono">
        Place: #{driver.place}
      </div>
      <div className=" font-bold ">
        <span className={`fi fi-${driver.country.toLowerCase()}`}></span>
        <span className="ml-2">
          {driver.firstname} {driver.lastname}, {driver.code}
        </span>
      </div>
      <div>{driver.team}</div>
      <Image
        src={`${process.env.NEXT_PUBLIC_SERVER_URL}${driver.imgUrl}`}
        alt={driver.lastname}
        width={100}
        height={100}
      />
    </div>
  );
}
