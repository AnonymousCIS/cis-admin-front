'use client'

import React, { useState, useCallback, useActionState } from 'react'
import { useSearchParams } from "next/navigation";
import ListForm from "../components/ListForm";

const ListContainer = () => {
  const searchParams = useSearchParams();

  const params = searchParams.get("skey");
  const [form, setForm] = useState({skey: params})
  const [logs, setLogs]  = useState([])

  return <ListForm />;
};

export default React.memo(ListContainer);