import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@/components/ThemeProvider";

// Hide Lovable branding button if it exists
const hideLovableButton = () => {
  // Check for buttons/links containing "Lovable" or "Edit with"
  const checkAndHide = () => {
    const allButtons = document.querySelectorAll("button, a");
    allButtons.forEach((element) => {
      const text = element.textContent || "";
      const ariaLabel = element.getAttribute("aria-label") || "";
      const href = element.getAttribute("href") || "";

      if (
        text.includes("Lovable") ||
        text.includes("lovable") ||
        text.includes("Edit with") ||
        ariaLabel.includes("Lovable") ||
        ariaLabel.includes("lovable") ||
        href.includes("lovable")
      ) {
        (element as HTMLElement).style.display = "none";
        (element as HTMLElement).style.visibility = "hidden";
        (element as HTMLElement).style.opacity = "0";
        (element as HTMLElement).style.pointerEvents = "none";
      }
    });
  };

  // Run immediately and then periodically to catch dynamically injected elements
  checkAndHide();
  setTimeout(checkAndHide, 100);
  setTimeout(checkAndHide, 500);
  setTimeout(checkAndHide, 1000);

  // Use MutationObserver to catch elements added after page load
  const observer = new MutationObserver(checkAndHide);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

// Run on page load
if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", hideLovableButton);
  hideLovableButton();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <App />
    </ThemeProvider>
  </StrictMode>
);
