// this is a joke don't worry about it
import React, { useEffect, useRef, useState } from "react";

const SubwaySurfers = () => {
  return (
    <div
      className={"absolute h-screen w-screen opacity-20 pointer-events-none"}
    >
      <iframe
        className="w-full h-full"
        title="Youtube player"
        sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
        src={`https://youtube.com/embed/i0M4ARe9v0Y?autoplay=1&controls=0&showinfo=0&autohide=1&mute=1&loop=1&playlist=i0M4ARe9v0Y&modestbranding=1&iv_load_policy=3&fs=0&rel=0`}
      ></iframe>
    </div>
  );
};

export default SubwaySurfers;
