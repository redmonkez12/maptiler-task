"use client";

import NextLink from "next/link";
import { Link } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface Props {
  id: string;
}

export function EditLink({ id }: Props) {
  return (
    <Link component={NextLink} href={`/entities/${id}`} sx={{ color: "customBlack.main" }}>
      <EditIcon className="cursor-pointer" />
    </Link>
  );
}
