import { AiAnalysis } from "@/actions/file-upload";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  await AiAnalysis(
    "https://utfs.io/f/LaeDy0BlU1CwkaqmsHUN6rJBVxm3M5ACgQhfePlwUFcnZSIX"
  );
  return <div>Analyze</div>;
};

export default page;
