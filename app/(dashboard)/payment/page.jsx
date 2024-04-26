"use client";
import { useCallback } from "react";
import { WhopApp } from "@/lib/iframe";

export default function PurchaseComponent() {
  const handleOpenModal = useCallback(async () => {
    origin= "https://localost:3000"
    const result = await WhopApp.inAppPurchase({
      line_item_id: "li_eMMd2YWIGL1a9Oz",
    });
    console.log(result);
  }, []);

  return (
    <div>
      <button onClick={handleOpenModal} className="bg-white text-black p-4">Click me to open checkout</button>
    </div>
  );
}
