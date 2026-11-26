"use client";
import { useSyncExternalStore } from "react";

// Push ne pajisje eshte opsional. Njoftimet brenda aplikacionit punojne gjithmone.
function mbeshtetPush() {
  const simulo = new URLSearchParams(window.location.search).has("pa_push"); // per proven 3
  return !simulo && "Notification" in window && "serviceWorker" in navigator;
}

export default function PushStatusi() {
  const ka = useSyncExternalStore(() => () => {}, mbeshtetPush, () => true);
  return (
    <p className="shenim">
      {ka
        ? "Push në pajisje nuk është aktivizuar (opsional). Njoftimet shfaqen këtu, brenda aplikacionit."
        : "Ky shfletues nuk mbështet push. Njoftimet shfaqen këtu, brenda aplikacionit."}
    </p>
  );
}
