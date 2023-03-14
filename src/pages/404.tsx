import { Layout } from "@/components";
import Link from "next/link";

const Custom404 = () => {
  return (
    <Layout>
      <div className="my-auto flex flex-col self-center">
        <div className="flex select-none items-center gap-2">
          <h1 className="text-2xl">404</h1>
          <span className="h-full w-[2px] bg-slate-800" />
          <h1>This page could not be found.</h1>
        </div>
        <Link className="my-5 text-xl text-blue-500 hover:underline" href="/">
          &larr; Back to Home
        </Link>
      </div>
    </Layout>
  );
};

export default Custom404;
