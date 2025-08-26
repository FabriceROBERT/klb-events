import react from "react";

export default function Navbar() {
  return (
    <nav className="w-full h-16 bg-gray-800 flex justify-between items-center px-10">
      <div className="text-white font-bold">Klb Events</div>
      <div>
        <ul className="flex gap-x-5 text-white font-bold">
          <li>Qui nous sommes ?</li>
          <li>Formules</li>
          <li>Portfolio</li>
        </ul>
      </div>
    </nav>
  );
}
