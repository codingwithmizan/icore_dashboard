import { useState, useCallback } from "react";

export const useCommon = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return {
    open,
    setOpen,
    loading,
    setLoading,
    ready,
    setReady,
    submitting,
    setSubmitting,
    toggleOpen,
  };
};
