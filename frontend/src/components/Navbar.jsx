import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl px-4 py-3">

        {/* Top Row */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            ThinkBoard
          </h1>

          {/* Right Buttons */}
          <div className="flex items-center gap-4">

            {/* Create Button */}
            <Link
              to="/create"
              className="btn btn-active btn-primary flex items-center gap-2"
            >
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
