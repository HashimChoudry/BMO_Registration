import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <section className="flex flex-col gap-10 items-center ">
      <div>
        <Image alt="MBO Logo" src="/MBO_Clear.png" width={400} height={300} />
      </div>
      <div>
        <h2 className="md:text-lg lg:text-xl xl:text-2xl">
          Join <span className="text-mboTurq-500">50+</span> Muslim Businesses In Building Lasting
          Connections
        </h2>
      </div>
    </section>
  );
};

export default Header;
