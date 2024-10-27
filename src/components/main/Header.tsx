import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <section className="flex flex-col gap-10 items-center ">
      <div>
        <Image alt="MBO Logo" src="/MBO_Clear.png" width={400} height={300} />
      </div>
      <div className="">
        <h2 className="text-5xl ">
           Join <span className="text-mboTurq-500 font-bold">50+</span> Muslim Businesses In Building Lasting
          Connections
        </h2>
      </div>
    </section>
  );
};

export default Header;
