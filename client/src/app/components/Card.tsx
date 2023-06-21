"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

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
      <div className="w-full pl-4 bg-slate-400 rounded-tl rounded-tr">
        Place: #{driver.place}
      </div>
      <div>
        {driver.firstname} {driver.lastname}, {driver.code}
      </div>

      <div>Team: {driver.team}</div>
      <Image
        src={`${process.env.NEXT_PUBLIC_SERVER_URL}${driver.imgUrl}`}
        alt={driver.lastname}
        width={100}
        height={100}
      />
    </div>
  );
}
