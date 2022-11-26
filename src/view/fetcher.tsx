import { write } from "../firebase";
import { useState } from "react";
import Base from "../components/base";
import { Button } from "@mui/material";
import { HeaderText } from "../components/Typography";
import { writeAllTemplatesToFirebase } from "../handlers";

const Fetcher = () => {
  return (
    <Base title="Fetcher">
      <HeaderText text={status} />
      <Button variant="contained" onClick={() => writeAllTemplatesToFirebase()}>
        Fetch
      </Button>
    </Base>
  );
};
export default Fetcher;
