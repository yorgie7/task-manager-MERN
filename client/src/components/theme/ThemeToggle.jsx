// ThemeToggle.jsx
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState(
        () => localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggle = () =>
        setTheme((t) => (t === "dark" ? "light" : "dark"));

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggle}
            className="bg-gray-200 hover:bg-gray-300 text-black dark:bg-gray-700 
            dark:hover:bg-gray-600 dark:text-white
             px-3 py-1.5 gap-2 rounded-sm"

        >
            <span>
                {theme === "dark" ? (
                    <Moon className="h-5 w-5" />
                ) : (
                    <Sun className="h-5 w-5" />
                )}
            </span> { }
            {/* {theme.toLocaleUpperCase()} */}
        </Button>
    );
}
