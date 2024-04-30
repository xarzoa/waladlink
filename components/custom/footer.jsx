import { Button } from "../ui/button";
import XCorp from "./icons/xcorp";
import Discord from "./icons/discord";

export default function Footer() {
  return (
    <footer className="py-4 border-t">
      <div className="flex justify-between items-center align-middle ">
        <div className="font-semibold text-sm ml-6">&copy; DuckLabs MMXXIV</div>
        <div className="underline text-gray-500 text-sm mr-6 flex gap-4">
          <Button size="icon" variant="ghost" asChild className="text-white size-7 p-1">
            <a href="https://discord.gg/zeg6yERdaS" target="_blank" rel="noopener noreferrer">
              <Discord/>
            </a>
          </Button>
          <Button size="icon" variant="ghost" asChild className="text-white size-7 p-1">
            <a href="https://x.com/labsduck" target="_blank" rel="noopener noreferrer">
              <XCorp/>
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
