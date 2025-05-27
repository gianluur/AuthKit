"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FcCancel } from "react-icons/fc";
import HashLoader from "react-spinners/HashLoader";

interface StatusCardProps {
  status: "loading" | "success" | "error";
  message: string;
}

export default function StatusCard({ status, message }: StatusCardProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle className="flex flex-col justify-center items-center gap-3">
            {status === "loading" && (
              <div className="flex flex-col justify-center items-center gap-8 p-3">
                <HashLoader color="#3521af" size={50} />
                <h1 className="text-center text-2xl font-semibold">{message}</h1>
              </div>
            )}

            {status === "error" && (
              <div className="flex flex-col justify-center items-center gap-8 p-3">
                <FcCancel className="text-red-500 text-9xl" />
                <h1 className="text-center text-2xl font-semibold">{message}</h1>
              </div>
            )}

            {status === "success" && (
              <div className="flex flex-col justify-center items-center gap-8 p-3">
                <IoIosCheckmarkCircle className="text-green-500 text-9xl" />
                <h1 className="text-center text-2xl font-semibold">{message}</h1>
              </div>
            )}
          </CardTitle>
        </CardHeader>
      </Card>
    </main>
  );
}