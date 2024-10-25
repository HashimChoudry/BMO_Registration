import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <section className="w-full flex items-center justify-center">
      <div>
        <Image alt="MBO Logo" src="/MBO_Clear.png" width={400} height={200} />
      </div>
      <div>
        <h2>
          Join <span className="">50+</span> Muslim Businesses In Building Long
          Lasting Connections
        </h2>
      </div>
    </section>
  );
};

export default Header;
