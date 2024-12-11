'use client';
import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store/Store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef(store);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
