import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Languages className="h-5 w-5" />
                    <span className="sr-only">Toggle language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => setLanguage("en")}
                    className={language === "en" ? "bg-accent" : ""}
                >
                    🇬🇧 English
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setLanguage("ja")}
                    className={language === "ja" ? "bg-accent" : ""}
                >
                    🇯🇵 日本語
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

