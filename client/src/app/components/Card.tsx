"use client";

import React from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { Reorder, useMotionValue } from "framer-motion";
import Image from "next/image";

export default function Card({ driver }: { driver: Driver }) {
  const y = useMotionValue(0);

  return (
    <Reorder.Item value={driver} id={driver.lastname} style={{ y }}>
      <div className="flex flex-col items-center w-72  justify-center  bg-gray-200 rounded-lg text-black m-4 cursor-pointer">
        <div className="w-full pl-4 bg-slate-400 rounded-tl rounded-tr shadow  text-white text-lg">
          #{driver.place}
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
          width={80}
          height={80}
          className=" pointer-events-none"
        />
      </div>
    </Reorder.Item>
  );
}
