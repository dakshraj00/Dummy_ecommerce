import { useState } from "react";

export function useToast() {
  const [toastData, setToastData] = useState(null);

  const toast = (msg, type = "success") => {
    setToastData({ msg, type });
    setTimeout(() => setToastData(null), 3000);
  };

  return { toastData, toast };
}