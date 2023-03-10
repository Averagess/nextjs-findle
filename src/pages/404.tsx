import Layout from "@/components/Layout";
import Link from "next/link";

const Custom404 = () => {
  return (
    <Layout>
      <div className="my-auto flex flex-col self-center">
        <div className="flex gap-2 items-center select-none">
          <h1 className="text-2xl">404</h1>
          <span className="h-full w-[2px] bg-slate-800" />
          <h1>This page could not be found.</h1>
        </div>
        <Link className="text-blue-500 text-xl hover:underline my-5" href="/">&larr; Back to Home</Link>
      </div>
    </Layout>
  );
};

export default Custom404;