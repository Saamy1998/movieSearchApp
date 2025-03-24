import React from "react";

const Header = ({ onTitleClick, onFavoritesToggle }) => {
  return (
    <header className="bg-black text-white py-4 px-10 flex justify-between items-center">
      {/* Left-aligned Title */}
      <button
        onClick={onTitleClick}
        className="text-2xl font-bold hover:text-gray-400 transition"
      >
        🎬 AA Movie Search Hunt
      </button>

      {/* Right-aligned Favorites Button */}
      <button
        onClick={onFavoritesToggle}
        className="px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-600"
      >
        ⭐ Favorites
      </button>
    </header>
  );
};

export default Header;
