import { useState, useEffect } from "react";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
function NProgress() {
  nprogress.configure({
    showSpinner: false,
  });
  useState(nprogress.start());
  useEffect(() => {
    return () => nprogress.done();
  });
  return <></>;
}

export default NProgress;
